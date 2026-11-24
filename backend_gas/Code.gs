/**
 * 🎄 聖誕節大冒險 - Google Apps Script 統計後端 (Code.gs)
 * -------------------------------------------------------------------------
 * 部署步驟：
 * 1. 開啟一份新的 Google 試算表，點選上方選單「擴充功能」>「Apps Script」
 * 2. 將本檔案內容完整貼上並儲存 (Ctrl+S)
 * 3. (選用) 修改下方 VIEWER_KEY 作為獨立檢視頁 stats-viewer.html 的存取密碼
 * 4. 點選右上角「部署」>「新增部署」> 類型選「網頁應用程式」
 *    - 執行身分：我
 *    - 誰可以存取：所有人
 * 5. 複製產生的「網頁應用程式網址」，貼入 js/config.js 的 analytics.endpoint
 */

const SHEET_RAW = "raw_events";
const VIEWER_KEY = "xmas2026"; // 若要開放免密碼讀取可設為 ""

function getOrCreateRawSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_RAW);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_RAW);
    const headers = [
      "server_time",
      "client_time",
      "session_id",
      "unit_id",
      "area_param",
      "school_param",
      "ip_country",
      "ip_city",
      "device_type",
      "screen_res",
      "is_touch",
      "stage",
      "event_name",
      "target_id",
      "is_correct",
      "detail_json"
    ];
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    initDashboardSheets(ss);
  }
  return sheet;
}

function initDashboardSheets(ss) {
  // 01_總覽儀表板（大方向）
  if (!ss.getSheetByName("01_總覽儀表板")) {
    const s1 = ss.insertSheet("01_總覽儀表板");
    s1.getRange("A1:B1").setValues([["指標項目（大方向總覽）", "數值"]]);
    s1.getRange("A2:B6").setValues([
      ["總事件紀錄筆數", `=COUNTA(${SHEET_RAW}!A2:A)`],
      ["總開啟次數 (Sessions)", `=COUNTIF(${SHEET_RAW}!M2:M, "app_session_start")`],
      ["7物件全解鎖過關次數", `=COUNTIF(${SHEET_RAW}!M2:M, "unit_all_complete")`],
      ["主要使用裝置 (平板/大屏比例)", `=COUNTIF(${SHEET_RAW}!I2:I, "tablet") & " 平板 / " & COUNTIF(${SHEET_RAW}!I2:I, "desktop_large") & " 桌機大屏"`],
      ["慢速語音 (0.75x) 點擊次數", `=COUNTIFS(${SHEET_RAW}!M2:M, "audio_play", ${SHEET_RAW}!P2:P, "*slow*")`]
    ]);
    s1.getRange("D1").setValue("縣市分佈 (IP估算)");
    s1.getRange("D2").setFormula(`=QUERY(${SHEET_RAW}!A2:P, "SELECT H, COUNT(C) WHERE M='app_session_start' AND H<>'' GROUP BY H ORDER BY COUNT(C) DESC LABEL H '縣市', COUNT(C) '開啟次數'", 0)`);
    s1.getRange("G1").setValue("推廣區域參數 (?area=)");
    s1.getRange("G2").setFormula(`=QUERY(${SHEET_RAW}!A2:P, "SELECT E, COUNT(C) WHERE M='app_session_start' AND E<>'' GROUP BY E ORDER BY COUNT(C) DESC LABEL E '區域代碼', COUNT(C) '開啟次數'", 0)`);
  }

  // 02_關卡漏斗
  if (!ss.getSheetByName("02_關卡漏斗")) {
    const s2 = ss.insertSheet("02_關卡漏斗");
    s2.getRange("A1").setValue("4大關卡進入次數統計");
    s2.getRange("A2").setFormula(`=QUERY(${SHEET_RAW}!A2:P, "SELECT N, COUNT(C) WHERE M='stage_enter' GROUP BY N ORDER BY COUNT(C) DESC LABEL N '目標關卡', COUNT(C) '進入次數'", 0)`);
    s2.getRange("D1").setValue("單元說明視窗點擊次數");
    s2.getRange("D2").setFormula(`=QUERY(${SHEET_RAW}!A2:P, "SELECT L, COUNT(C) WHERE M='help_open' GROUP BY L ORDER BY COUNT(C) DESC LABEL L '關卡', COUNT(C) '開啟說明次數'", 0)`);
  }

  // 03_教學細節
  if (!ss.getSheetByName("03_教學細節")) {
    const s3 = ss.insertSheet("03_教學細節");
    s3.getRange("A1").setValue("單字拼字清空重試次數");
    s3.getRange("A2").setFormula(`=QUERY(${SHEET_RAW}!A2:P, "SELECT N, COUNT(C) WHERE M='spell_clear' GROUP BY N ORDER BY COUNT(C) DESC LABEL N '單字ID', COUNT(C) '清空次數'", 0)`);
    s3.getRange("D1").setValue("測驗答題正確與錯誤統計");
    s3.getRange("D2").setFormula(`=QUERY(${SHEET_RAW}!A2:P, "SELECT N, O, COUNT(C) WHERE M='quiz_attempt' GROUP BY N, O ORDER BY COUNT(C) DESC LABEL N '題目目標', O '是否答對', COUNT(C) '次數'", 0)`);
    s3.getRange("H1").setValue("7國文化與5國祝福語點擊");
    s3.getRange("H2").setFormula(`=QUERY(${SHEET_RAW}!A2:P, "SELECT M, N, COUNT(C) WHERE M='culture_explore' OR M='party_greeting' GROUP BY M, N ORDER BY COUNT(C) DESC LABEL M '互動類型', N '項目', COUNT(C) '點擊次數'", 0)`);
  }
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

    const sheet = getOrCreateRawSheet();
    const tz = "Asia/Taipei";
    const nowStr = Utilities.formatDate(new Date(), tz, "yyyy-MM-dd HH:mm:ss");

    const rows = events.map(ev => [
      nowStr,
      ev.client_time || "",
      ev.session_id || "",
      ev.unit_id || "",
      ev.area_param || "",
      ev.school_param || "",
      ev.ip_country || "",
      ev.ip_city || "",
      ev.device_type || "",
      ev.screen_res || "",
      ev.is_touch === true ? "YES" : "NO",
      ev.stage || "",
      ev.event_name || "",
      ev.target_id || "",
      ev.is_correct === true ? "TRUE" : (ev.is_correct === false ? "FALSE" : ""),
      ev.detail ? JSON.stringify(ev.detail) : ""
    ]);

    const startRow = sheet.getLastRow() + 1;
    sheet.getRange(startRow, 1, rows.length, rows[0].length).setValues(rows);

    return ContentService.createTextOutput(JSON.stringify({ ok: true, count: rows.length }))
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

    const sheet = getOrCreateRawSheet();
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      return ContentService.createTextOutput(JSON.stringify({
        ok: true,
        overview: { totalEvents: 0, totalSessions: 0, allComplete: 0, byCity: {}, byArea: {}, byDevice: {}, byHour: {} },
        funnel: { stages: {}, helpOpen: {}, storySteps: {} },
        details: { spellClear: {}, quizStats: {}, audioSpeed: { normal: 0, slow: 0 }, topAudio: {}, cultureExplore: {}, partyGreetings: {}, partyPkCount: 0 }
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const data = sheet.getRange(2, 1, lastRow - 1, 16).getValues();
    const sessions = {};
    const byCity = {};
    const byArea = {};
    const byDevice = {};
    const byHour = {};
    const stages = {};
    const helpOpen = {};
    const storySteps = {};
    const spellClear = {};
    const quizStats = {};
    const audioSpeed = { normal: 0, slow: 0 };
    const topAudio = {};
    const cultureExplore = {};
    const partyGreetings = {};
    let partyPkCount = 0;
    let totalSessions = 0;
    let allComplete = 0;

    data.forEach(r => {
      const serverTime = String(r[0] || "");
      const sessionId = String(r[2] || "");
      const areaParam = String(r[4] || "");
      const schoolParam = String(r[5] || "");
      const ipCity = String(r[7] || "");
      const deviceType = String(r[8] || "");
      const stage = String(r[11] || "");
      const eventName = String(r[12] || "");
      const targetId = String(r[13] || "");
      const isCorrect = String(r[14] || "");
      let detail = {};
      try { if (r[15]) detail = JSON.parse(r[15]); } catch (_) {}

      if (sessionId) sessions[sessionId] = true;

      if (eventName === "app_session_start") {
        totalSessions++;
        const cityLabel = ipCity || "未知縣市";
        byCity[cityLabel] = (byCity[cityLabel] || 0) + 1;
        const areaLabel = schoolParam ? `${areaParam || "未填區"}/${schoolParam}` : (areaParam || "未帶參數");
        byArea[areaLabel] = (byArea[areaLabel] || 0) + 1;
        if (deviceType) byDevice[deviceType] = (byDevice[deviceType] || 0) + 1;
        const hourMatch = serverTime.match(/\s(\d{2}):/);
        if (hourMatch) {
          const hr = hourMatch[1] + ":00";
          byHour[hr] = (byHour[hr] || 0) + 1;
        }
      } else if (eventName === "stage_enter") {
        const toStage = targetId || stage;
        stages[toStage] = (stages[toStage] || 0) + 1;
      } else if (eventName === "unit_all_complete") {
        allComplete++;
      } else if (eventName === "help_open") {
        helpOpen[stage || "unknown"] = (helpOpen[stage || "unknown"] || 0) + 1;
      } else if (eventName === "story_step") {
        storySteps[targetId] = (storySteps[targetId] || 0) + 1;
      } else if (eventName === "spell_clear") {
        spellClear[targetId] = (spellClear[targetId] || 0) + 1;
      } else if (eventName === "quiz_attempt") {
        const key = `${detail.quiz_type || stage}:${targetId}`;
        if (!quizStats[key]) quizStats[key] = { correct: 0, wrong: 0, wrongChoices: {} };
        if (isCorrect === "TRUE") quizStats[key].correct++;
        else if (isCorrect === "FALSE") {
          quizStats[key].wrong++;
          if (detail.chosen) {
            quizStats[key].wrongChoices[detail.chosen] = (quizStats[key].wrongChoices[detail.chosen] || 0) + 1;
          }
        }
      } else if (eventName === "audio_play") {
        if (detail.speed_mode === "slow") audioSpeed.slow++;
        else audioSpeed.normal++;
        if (targetId) topAudio[targetId] = (topAudio[targetId] || 0) + 1;
      } else if (eventName === "culture_explore") {
        cultureExplore[targetId] = (cultureExplore[targetId] || 0) + 1;
      } else if (eventName === "party_greeting") {
        partyGreetings[targetId] = (partyGreetings[targetId] || 0) + 1;
      } else if (eventName === "party_pk_spin") {
        partyPkCount++;
      }
    });

    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      overview: {
        totalEvents: data.length,
        totalSessions: totalSessions || Object.keys(sessions).length,
        allComplete,
        byCity,
        byArea,
        byDevice,
        byHour
      },
      funnel: { stages, helpOpen, storySteps },
      details: { spellClear, quizStats, audioSpeed, topAudio, cultureExplore, partyGreetings, partyPkCount }
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
