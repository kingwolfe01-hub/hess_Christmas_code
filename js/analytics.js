/* =========================================================================
   📊 統一前端統計埋點模組 (js/analytics.js)
   - 支援「網址參數 (?area= / ?school=)」與「背景 IP 縣市」雙軌地區辨識
   - 事件佇列批次緩衝 + sendBeacon 離頁送出，完全不干擾課堂流暢度
   - 離線或未設定 GAS 網址時自動靜默略過，絕不跳出錯誤影響教學
   ========================================================================= */
(function () {
  "use strict";

  const SESSION_KEY = "xmas_craft_session_id";
  const AREA_KEY = "xmas_craft_area_param";
  const SCHOOL_KEY = "xmas_craft_school_param";
  const GEO_CACHE_KEY = "xmas_craft_ip_geo";

  function getConfig() {
    const cfg = (window.LESSON_CONFIG && window.LESSON_CONFIG.analytics) || {};
    return {
      enabled: cfg.enabled !== false,
      endpoint: (cfg.endpoint || "").trim(),
      unitId: cfg.unitId || "world_christmas_craft",
      ipGeoEnabled: cfg.ipGeoEnabled !== false
    };
  }

  function getOrCreateSessionId() {
    try {
      let sid = sessionStorage.getItem(SESSION_KEY);
      if (!sid) {
        sid = "s_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
        sessionStorage.setItem(SESSION_KEY, sid);
      }
      return sid;
    } catch (_) {
      return "s_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
    }
  }

  function resolveUrlParams() {
    let area = "";
    let school = "";
    try {
      const sp = new URLSearchParams(window.location.search);
      const urlArea = sp.get("area") || sp.get("city") || "";
      const urlSchool = sp.get("school") || "";
      if (urlArea) sessionStorage.setItem(AREA_KEY, urlArea.trim());
      if (urlSchool) sessionStorage.setItem(SCHOOL_KEY, urlSchool.trim());
      area = sessionStorage.getItem(AREA_KEY) || "";
      school = sessionStorage.getItem(SCHOOL_KEY) || "";
    } catch (_) {}
    return { area, school };
  }

  function detectDeviceType() {
    const w = window.innerWidth || screen.width || 0;
    const isTouch = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);
    if (w <= 640) return { deviceType: "mobile", isTouch };
    if (isTouch && w <= 1366) return { deviceType: "tablet", isTouch };
    return { deviceType: "desktop_large", isTouch };
  }

  function formatLocalTime(d) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  const sessionId = getOrCreateSessionId();
  const urlMeta = resolveUrlParams();
  const devMeta = detectDeviceType();
  let geoMeta = { country: "", city: "" };
  let stageEnterTs = Date.now();
  let queue = [];
  let flushTimer = null;

  async function resolveIpGeo() {
    const cfg = getConfig();
    if (!cfg.ipGeoEnabled) return;
    try {
      const cached = sessionStorage.getItem(GEO_CACHE_KEY);
      if (cached) {
        geoMeta = JSON.parse(cached);
        return;
      }
    } catch (_) {}

    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), 2000) : null;
    try {
      const res = await fetch("https://ipapi.co/json/", {
        signal: controller ? controller.signal : undefined
      });
      if (res.ok) {
        const data = await res.json();
        if (data && (data.city || data.region)) {
          geoMeta = {
            country: data.country_name || data.country || "",
            city: data.city || data.region || ""
          };
        }
      }
      if (!geoMeta.city) {
        const res2 = await fetch("https://ipwho.is/", {
          signal: controller ? controller.signal : undefined
        });
        if (res2.ok) {
          const d2 = await res2.json();
          if (d2 && d2.success !== false) {
            geoMeta = {
              country: d2.country || "",
              city: d2.city || d2.region || ""
            };
          }
        }
      }
      if (geoMeta.city) {
        try { sessionStorage.setItem(GEO_CACHE_KEY, JSON.stringify(geoMeta)); } catch (_) {}
      }
    } catch (_) {
      // 靜默容錯，不阻斷教學
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  function flush(useBeacon = false) {
    const cfg = getConfig();
    if (!cfg.enabled || !cfg.endpoint || queue.length === 0) {
      if (!cfg.endpoint) queue = []; // 未設定後端網址時清空佇列，避免記憶體累積
      return;
    }

    const batch = queue.splice(0, queue.length);
    const bodyStr = JSON.stringify({ events: batch });

    try {
      if (useBeacon && navigator.sendBeacon) {
        const blob = new Blob([bodyStr], { type: "text/plain;charset=utf-8" });
        navigator.sendBeacon(cfg.endpoint, blob);
        return;
      }
      fetch(cfg.endpoint, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: bodyStr
      }).catch(() => {});
    } catch (_) {}
  }

  function scheduleFlush() {
    if (flushTimer) return;
    flushTimer = setTimeout(() => {
      flushTimer = null;
      flush(false);
    }, 5000);
  }

  function track(eventName, opts = {}) {
    const cfg = getConfig();
    if (!cfg.enabled) return;

    const currentStage = opts.stage || (window.state && window.state.stage) || "";
    const ev = {
      client_time: formatLocalTime(new Date()),
      session_id: sessionId,
      unit_id: cfg.unitId,
      area_param: urlMeta.area,
      school_param: urlMeta.school,
      ip_country: geoMeta.country,
      ip_city: geoMeta.city,
      device_type: devMeta.deviceType,
      screen_res: `${window.innerWidth}x${window.innerHeight}`,
      is_touch: devMeta.isTouch,
      stage: currentStage,
      event_name: eventName,
      target_id: opts.target_id || "",
      is_correct: typeof opts.is_correct === "boolean" ? opts.is_correct : null,
      detail: opts.detail || null
    };

    queue.push(ev);
    if (queue.length >= 8) {
      if (flushTimer) {
        clearTimeout(flushTimer);
        flushTimer = null;
      }
      flush(false);
    } else {
      scheduleFlush();
    }
  }

  function trackStageTransition(fromStage, toStage) {
    const now = Date.now();
    const durationSec = Math.max(0, Math.round((now - stageEnterTs) / 1000));
    stageEnterTs = now;
    track("stage_enter", {
      stage: fromStage || toStage,
      target_id: toStage,
      detail: { from_stage: fromStage, to_stage: toStage, duration_sec: durationSec }
    });
  }

  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush(true);
  });
  window.addEventListener("pagehide", () => flush(true));

  window.addEventListener("DOMContentLoaded", async () => {
    await resolveIpGeo();
    track("app_session_start", {
      stage: "home",
      detail: {
        screen_w: window.innerWidth,
        screen_h: window.innerHeight,
        ua_mobile: /Mobi|Android|iPad|iPhone/i.test(navigator.userAgent || "")
      }
    });
  });

  window.Analytics = {
    track,
    trackStageTransition,
    flush
  };
})();
