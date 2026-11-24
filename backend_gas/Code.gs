/**
 * 🎄 聖誕節大冒險 - Google Apps Script 統計後端 (Code.gs · 無 raw_events 純累計版)
 * -------------------------------------------------------------------------
 * 架構特點：
 * - 不寫入龐大的 raw_events 明細列，試算表永遠保持精簡（數百列以內），絕不爆格、不逾時。
 * - 只維護兩張累計表：
 *   1. sum_daily_area：按「日期 × 縣市 × 區域/學校 × 裝置」累計開啟次數與完課數（大方向）
 *   2. sum_metrics：累計時段、關卡進入、說明點擊、拼字清空、測驗對錯與誤選、語音與文化熱度（細節）
 *
 * 更新部署提醒：
 * 若你先前已貼過舊版 Code.gs，覆蓋貼上本檔案並儲存後，請點右上角
 * 「部署」>「管理部署作業」> 點選鉛筆編輯 > 版本選「建立新版本」>「部署」，
 * 這樣原本的 /exec 網址不變，就會立刻套用新版！
 */

const SHEET_DAILY = "sum_daily_area";
const SHEET_METRICS = "sum_metrics";
const VIEWER_KEY = "xmas2026"; // 若要開放免密碼讀取可設為 ""

function getOrCreateSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const rawText = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const payload = JSON.parse(rawText);
    const events = Array.isArray(payload.events) ? payload.events : [payload];

    if (events.length === 0) {
      return ContentService.createTextOutput(JSON.stringify({ ok: true, count: 0 }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const dailySheet = getOrCreateSheet(ss, SHEET_DAILY, [
      "date", "city", "area", "school", "device", "sessions", "all_complete", "events"
    ]);
    const metricSheet = getOrCreateSheet(ss, SHEET_METRICS, [
      "category", "metric_key", "count"
    ]);

    const tz = "Asia/Taipei";
    const now = new Date();
    const todayStr = Utilities.formatDate(now, tz, "yyyy-MM-dd");
    const hourStr = Utilities.formatDate(now, tz, "HH") + ":00";

    // 在記憶體中彙總本批事件
    const dailyDelta = {}; // key: date|city|area|school|device -> { sessions, all_complete, events }
    const metricDelta = {}; // key: category|metric_key -> count

    function addDaily(ev, sInc, cInc, eInc) {
      const city = ev.ip_city || "未知縣市";
      const area = ev.area_param || "未帶參數";
      const school = ev.school_param || "";
      const device = ev.device_type || "unknown";
      const k = [todayStr, city, area, school, device].join("|");
      if (!dailyDelta[k]) dailyDelta[k] = { date: todayStr, city, area, school, device, sessions: 0, all_complete: 0, events: 0 };
      dailyDelta[k].sessions += sInc;
      dailyDelta[k].all_complete += cInc;
      dailyDelta[k].events += eInc;
    }

    function addMetric(cat, mKey, inc) {
      if (!mKey) return;
      const k = `${cat}|${mKey}`;
      metricDelta[k] = (metricDelta[k] || 0) + (inc || 1);
    }

    events.forEach(ev => {
      const eventName = ev.event_name || "";
      const stage = ev.stage || "";
      const targetId = ev.target_id || "";
      const detail = ev.detail || {};

      if (eventName === "app_session_start") {
        addDaily(ev, 1, 0, 1);
        addMetric("hour", hourStr, 1);
      } else if (eventName === "unit_all_complete") {
        addDaily(ev, 0, 1, 1);
      } else {
        addDaily(ev, 0, 0, 1);
      }

      if (eventName === "stage_enter") {
        addMetric("stage", targetId || stage, 1);
      } else if (eventName === "help_open") {
        addMetric("help", stage || "unknown", 1);
      } else if (eventName === "story_step") {
        addMetric("story_step", targetId, 1);
      } else if (eventName === "spell_clear") {
        addMetric("spell_clear", targetId, 1);
      } else if (eventName === "quiz_attempt") {
        const qKey = `${detail.quiz_type || stage}:${targetId}`;
        if (ev.is_correct === true) {
          addMetric("quiz_correct", qKey, 1);
        } else if (ev.is_correct === false) {
          addMetric("quiz_wrong", qKey, 1);
          if (detail.chosen) {
            addMetric("wrong_choice", `${qKey}||${detail.chosen}`, 1);
          }
        }
      } else if (eventName === "audio_play") {
        addMetric("audio_speed", detail.speed_mode === "slow" ? "slow" : "normal", 1);
      } else if (eventName === "culture_explore") {
        addMetric("culture", targetId, 1);
      } else if (eventName === "party_greeting") {
        addMetric("greeting", targetId, 1);
      } else if (eventName === "party_pk_spin") {
        addMetric("party_pk", "spin", 1);
      }
    });

    // 批次合併寫入 sum_daily_area
    const dLast = dailySheet.getLastRow();
    const dValues = dLast >= 2 ? dailySheet.getRange(2, 1, dLast - 1, 8).getValues() : [];
    const dIndex = {};
    dValues.forEach((r, idx) => {
      const k = [r[0] instanceof Date ? Utilities.formatDate(r[0], tz, "yyyy-MM-dd") : String(r[0]), String(r[1]), String(r[2]), String(r[3]), String(r[4])].join("|");
      dIndex[k] = idx;
    });
    const dAppend = [];
    Object.keys(dailyDelta).forEach(k => {
      const item = dailyDelta[k];
      if (dIndex[k] !== undefined) {
        const row = dValues[dIndex[k]];
        row[5] = Number(row[5] || 0) + item.sessions;
        row[6] = Number(row[6] || 0) + item.all_complete;
        row[7] = Number(row[7] || 0) + item.events;
      } else {
        dAppend.push([item.date, item.city, item.area, item.school, item.device, item.sessions, item.all_complete, item.events]);
      }
    });
    if (dValues.length > 0) {
      dailySheet.getRange(2, 1, dValues.length, 8).setValues(dValues);
    }
    if (dAppend.length > 0) {
      dailySheet.getRange(dailySheet.getLastRow() + 1, 1, dAppend.length, 8).setValues(dAppend);
    }

    // 批次合併寫入 sum_metrics
    const mLast = metricSheet.getLastRow();
    const mValues = mLast >= 2 ? metricSheet.getRange(2, 1, mLast - 1, 3).getValues() : [];
    const mIndex = {};
    mValues.forEach((r, idx) => {
      mIndex[`${r[0]}|${r[1]}`] = idx;
    });
    const mAppend = [];
    Object.keys(metricDelta).forEach(k => {
      const sepIdx = k.indexOf("|");
      const cat = k.slice(0, sepIdx);
      const mKey = k.slice(sepIdx + 1);
      const inc = metricDelta[k];
      if (mIndex[k] !== undefined) {
        mValues[mIndex[k]][2] = Number(mValues[mIndex[k]][2] || 0) + inc;
      } else {
        mAppend.push([cat, mKey, inc]);
      }
    });
    if (mValues.length > 0) {
      metricSheet.getRange(2, 1, mValues.length, 3).setValues(mValues);
    }
    if (mAppend.length > 0) {
      metricSheet.getRange(metricSheet.getLastRow() + 1, 1, mAppend.length, 3).setValues(mAppend);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true, count: events.length }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    const params = (e && e.parameter) || {};
    if (VIEWER_KEY && params.key !== VIEWER_KEY) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Invalid viewer key" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const dailySheet = ss.getSheetByName(SHEET_DAILY);
    const metricSheet = ss.getSheetByName(SHEET_METRICS);

    let totalSessions = 0;
    let totalEvents = 0;
    let allComplete = 0;
    const byCity = {};
    const byArea = {};
    const byDevice = {};

    if (dailySheet && dailySheet.getLastRow() >= 2) {
      const dRows = dailySheet.getRange(2, 1, dailySheet.getLastRow() - 1, 8).getValues();
      dRows.forEach(r => {
        const city = String(r[1] || "未知縣市");
        const area = String(r[2] || "未帶參數");
        const school = String(r[3] || "");
        const device = String(r[4] || "");
        const sess = Number(r[5] || 0);
        const comp = Number(r[6] || 0);
        const evs = Number(r[7] || 0);

        totalSessions += sess;
        allComplete += comp;
        totalEvents += evs;

        if (sess > 0) {
          byCity[city] = (byCity[city] || 0) + sess;
          const areaLabel = school ? `${area}/${school}` : area;
          byArea[areaLabel] = (byArea[areaLabel] || 0) + sess;
          if (device) byDevice[device] = (byDevice[device] || 0) + sess;
        }
      });
    }

    const byHour = {};
    const stages = {};
    const helpOpen = {};
    const storySteps = {};
    const spellClear = {};
    const quizStats = {};
    const audioSpeed = { normal: 0, slow: 0 };
    const cultureExplore = {};
    const partyGreetings = {};
    let partyPkCount = 0;

    if (metricSheet && metricSheet.getLastRow() >= 2) {
      const mRows = metricSheet.getRange(2, 1, metricSheet.getLastRow() - 1, 3).getValues();
      mRows.forEach(r => {
        const cat = String(r[0] || "");
        const key = String(r[1] || "");
        const cnt = Number(r[2] || 0);

        if (cat === "hour") byHour[key] = cnt;
        else if (cat === "stage") stages[key] = cnt;
        else if (cat === "help") helpOpen[key] = cnt;
        else if (cat === "story_step") storySteps[key] = cnt;
        else if (cat === "spell_clear") spellClear[key] = cnt;
        else if (cat === "audio_speed") {
          if (key === "slow") audioSpeed.slow += cnt;
          else audioSpeed.normal += cnt;
        } else if (cat === "culture") cultureExplore[key] = cnt;
        else if (cat === "greeting") partyGreetings[key] = cnt;
        else if (cat === "party_pk") partyPkCount += cnt;
        else if (cat === "quiz_correct") {
          if (!quizStats[key]) quizStats[key] = { correct: 0, wrong: 0, wrongChoices: {} };
          quizStats[key].correct += cnt;
        } else if (cat === "quiz_wrong") {
          if (!quizStats[key]) quizStats[key] = { correct: 0, wrong: 0, wrongChoices: {} };
          quizStats[key].wrong += cnt;
        } else if (cat === "wrong_choice") {
          const parts = key.split("||");
          const qKey = parts[0];
          const chosen = parts[1] || "";
          if (!quizStats[qKey]) quizStats[qKey] = { correct: 0, wrong: 0, wrongChoices: {} };
          if (chosen) quizStats[qKey].wrongChoices[chosen] = (quizStats[qKey].wrongChoices[chosen] || 0) + cnt;
        }
      });
    }

    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      overview: { totalEvents, totalSessions, allComplete, byCity, byArea, byDevice, byHour },
      funnel: { stages, helpOpen, storySteps },
      details: { spellClear, quizStats, audioSpeed, cultureExplore, partyGreetings, partyPkCount }
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
