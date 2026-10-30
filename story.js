/* =========================================================================
   🎄 3D 麥塊聖誕冒險教室 (Minecraft Christmas 3D) - 故事劇情模組 (story.js)
   - 階段 1：Story 麥塊 8 幕劇情情境塑造
   - 角色 A/B 雙人對白跟讀與發音
   - 每幕專屬 3D 麥塊道具與環境特效 (求救信、冒險背包、傳送門、風雪、馴鹿、壁爐、派對)
   - 故事 Mini-Quiz 互動挑戰
   ========================================================================= */

window.LESSON_CONFIG = window.LESSON_CONFIG || {};

LESSON_CONFIG.storySteps = [
  {
    step: 1,
    sceneType: "image",
    assetKey: "story_taiwan_school",
    badge: "Scene 1 / 8 · 🇹🇼 序曲：台灣冬日校園",
    roleA: "🅰️ Steve: It's cold today in Taiwan!",
    roleB: "🅱️ Alex: Look! An SOS map from Santa!",
    roleASpeak: "steve",
    roleBSpeak: "alex",
    zhHint: "🇹🇼 序曲・從台灣出發：點擊下方「📜 打開求救捲軸」展開冒險！",
    speakA: "It's cold today in Taiwan!",
    speakB: "Look! An S O S map from Santa!",
    actionBtnLabel: "📜 打開求救捲軸",
    actionToast: "📜 收到北歐求救信：暴風雪吹走了 7 個聖誕方塊！請前往聖誕傳送門！",
    actionOverlayTitle: "📜 來自北歐的緊急求救捲軸",
    actionOverlayBody: "「Help! A huge blizzard hit our cabin and blew away all 7 Christmas blocks! Please help me! — Santa Claus 🎅」"
  },
  {
    step: 2,
    sceneType: "image",
    assetKey: "story_prep_backpack",
    badge: "Scene 2 / 8 · 🎒 啟程：冒險背包整備",
    roleA: "🅰️ Steve: We need our backpack and compass!",
    roleB: "🅱️ Alex: We have flint and steel. Let's go!",
    roleASpeak: "steve",
    roleBSpeak: "alex",
    zhHint: "🎒 啟程・裝備檢查：點擊「🎒 檢查冒險背包」收集打火石與指南針！",
    speakA: "We need our backpack and compass!",
    speakB: "We have flint and steel. Let's go!",
    actionBtnLabel: "🎒 檢查冒險背包 (收集裝備)",
    actionToast: "🎒 裝備齊全：打火石 (flint and steel) 與指南針 (compass) 已備妥！",
    actionOverlayTitle: "🎒 冒險者背包物品欄",
    actionOverlayBody: "冒險物資已齊全！出發前往黑曜石傳送門！"
  },
  {
    step: 3,
    sceneType: "image",
    assetKey: "story_christmas_portal",
    badge: "Scene 3 / 8 · 🟣 密室：點亮麥塊傳送門",
    roleA: "🅰️ Steve: Look at the Christmas Portal!",
    roleB: "🅱️ Alex: Light it up with flint and steel! Go!",
    roleASpeak: "steve",
    roleBSpeak: "alex",
    zhHint: "🟣 密室・點亮傳送門：點擊「⚡ 點燃打火石」啟動紫色星芒漩渦！",
    speakA: "Look at the Christmas Portal!",
    speakB: "Light it up with flint and steel! Go!",
    actionBtnLabel: "⚡ 點燃打火石啟動傳送門",
    actionToast: "⚡ 轟隆！紫色傳送門已啟動！準備穿越到北歐雪地！",
    actionOverlayTitle: "🟣 聖誕傳送門已啟動",
    actionOverlayBody: "座標鎖定：北歐瑞典！從溫暖台灣瞬間跨越進入暴風雪森林！"
  },
  {
    step: 4,
    sceneType: "image",
    assetKey: "story_vortex_tunnel",
    badge: "Scene 4 / 8 · 🌀 傳送：穿越時空蟲洞",
    roleA: "🅰️ Steve: We are in the purple vortex!",
    roleB: "🅱️ Alex: Hold on tight! It's getting cold!",
    roleASpeak: "steve",
    roleBSpeak: "alex",
    zhHint: "🌀 傳送・維度躍遷：點擊「🌀 穩定時空蟲洞」穿過蟲洞！",
    speakA: "We are in the purple vortex!",
    speakB: "Hold on tight! It's getting cold!",
    actionBtnLabel: "🌀 穩定時空蟲洞",
    actionToast: "🌀 穿過時空蟲洞！氣溫急降至 -15°C！北歐暴風雪就在眼前！",
    actionOverlayTitle: "🌀 維度躍遷完成",
    actionOverlayBody: "抵達高緯度北歐！眼前是一片銀白冰雪世界！"
  },
  {
    step: 5,
    sceneType: "image",
    assetKey: "story_nordic_blizzard",
    badge: "Scene 5 / 8 · ❄️ 風雪：松林與失蹤方塊",
    roleA: "🅰️ Steve: Brrr! It's freezing outside!",
    roleB: "🅱️ Santa: The blizzard blew my seven blocks away!",
    roleASpeak: "steve",
    roleBSpeak: "santa",
    zhHint: "❄️ 風雪・抵達松林：點擊「❄️ 啟動指南針」掃描雪地裡的 7 個方塊！",
    speakA: "Brrr! It's freezing outside!",
    speakB: "The blizzard blew my seven blocks away!",
    actionBtnLabel: "❄️ 啟動指南針掃描",
    actionToast: "❄️ 暴雪籠罩！指南針偵測到雪地裡有 7 個失落方塊！",
    actionOverlayTitle: "🧭 指南針雷達掃描結果",
    actionOverlayBody: "成功鎖定 7 個失落方塊：松樹、彩帶、彩球、星星、長襪、禮物、聖誕老人！"
  },
  {
    step: 6,
    sceneType: "image",
    assetKey: "story_nordic_blizzard",
    badge: "Scene 6 / 8 · 🦌 馴鹿：尋找避風松林",
    roleA: "🅰️ Steve: Rudolph is cold in the blizzard!",
    roleB: "🅱️ Santa: Look! The pine tree can shelter him!",
    roleASpeak: "steve",
    roleBSpeak: "santa",
    zhHint: "🦌 馴鹿任務：點擊「🦌 拯救馴鹿」回答問題庇護 Rudolph！",
    speakA: "Rudolph is cold in the blizzard!",
    speakB: "Look! The pine tree can shelter him!",
    actionBtnLabel: "🦌 拯救馴鹿・尋找避風松林",
    actionToast: "🦌 請回答常青樹單字以庇護 Rudolph！",
    actionOverlayTitle: "🦌 拯救馴鹿任務",
    actionOverlayBody: "暴風雪很大，需要高大的常青松樹（pine tree）為馴鹿遮蔽寒風！",
    quiz: {
      questionEn: "Which green tree can shelter Rudolph the reindeer?",
      questionZh: "🦌 提問：哪種雪地常青樹可以為馴鹿遮風避雪？",
      options: [
        { text: "🌲 pine tree (松樹)", correct: true, feedback: "答對了！pine tree 可以為馴鹿遮風避雪！" },
        { text: "🌴 palm tree (棕櫚樹)", correct: false, feedback: "棕櫚樹生長在熱帶海灘喔！再試一次！" },
        { text: "🌵 cactus (仙人掌)", correct: false, feedback: "仙人掌生長在沙漠喔！再試一次！" }
      ],
      correctSpeech: "Correct! The pine tree shelters Rudolph!"
    }
  },
  {
    step: 7,
    sceneType: "cabin_dark_to_warm",
    assetKey: "cabin_base",
    badge: "Scene 7 / 8 · 🔥 木屋：點燃溫暖壁爐",
    roleA: "🅰️ Steve: It is dark and cold in the cabin!",
    roleB: "🅱️ Santa: Let's light the fireplace with flint!",
    roleASpeak: "steve",
    roleBSpeak: "santa",
    zhHint: "🔥 木屋・點燃壁爐：點擊「🔥 點燃壁爐暖火」點亮木屋！",
    speakA: "It is dark and cold in the cabin!",
    speakB: "Let's light the fireplace with flint!",
    actionBtnLabel: "🔥 點燃壁爐暖火",
    actionToast: "🔥 壁爐點燃了，整間木屋變得溫暖明亮！",
    actionOverlayTitle: "🔥 壁爐已點亮！",
    actionOverlayBody: "房間暖和了，請回答傳統聖誕長襪懸掛的位置：",
    quiz: {
      questionEn: "Where do children hang their Christmas stockings?",
      questionZh: "🔥 提問：小朋友習慣把聖誕長襪掛在哪裡？",
      options: [
        { text: "🧦 above the fireplace (在壁爐上方)", correct: true, feedback: "答對了！above the fireplace！" },
        { text: "🧦 under the bed (在床底下)", correct: false, feedback: "床底下太黑了喔！再試一次！" },
        { text: "🧦 outside in the snow (在雪地戶外)", correct: false, feedback: "襪子在雪地會結冰喔！再試一次！" }
      ],
      correctSpeech: "Correct! Stockings are above the fireplace!"
    }
  },
  {
    step: 8,
    sceneType: "cabin_crafting_ready",
    assetKey: "cabin_base",
    badge: "Scene 8 / 8 · 🎄 慶典：聖誕大派對",
    roleA: "🅰️ Steve: Look at the tree! It's party time!",
    roleB: "🅱️ Santa: Merry Christmas! Let's celebrate!",
    roleASpeak: "steve",
    roleBSpeak: "santa",
    zhHint: "🎄 慶典・聖誕派對：點擊「🎄 啟動聖誕派對」解鎖所有方塊！",
    speakA: "Look at the tree! It's party time!",
    speakB: "Merry Christmas! Let's celebrate!",
    actionBtnLabel: "🎄 啟動聖誕派對",
    actionToast: "🎄 叮叮噹！7 個失落方塊全部尋回，開始派對！",
    actionOverlayTitle: "🎄 聖誕派對時間！",
    actionOverlayBody: "冒險完成！7 個方塊已回到合成台，準備開始單字拼讀與文化挑戰！"
  }
];

async function speakStoryDialogue(stepObj, rate = null) {
  if (!stepObj) return;
  const actualRate = rate || (typeof LESSON_CONFIG !== "undefined" ? LESSON_CONFIG.speechRateNormal : 0.96);
  const lineA = document.getElementById("promptLineA");
  const lineB = document.getElementById("promptLineB");

  const clearSpotlight = () => {
    lineA?.classList.remove("spotlight-speaker-a", "scale-[1.02]", "opacity-40");
    lineB?.classList.remove("spotlight-speaker-b", "scale-[1.02]", "opacity-40");
  };

  try {
    if (stepObj.speakA) {
      if (lineA && lineB) {
        lineA.classList.add("spotlight-speaker-a", "scale-[1.02]");
        lineB.classList.add("opacity-40");
      }
      await speakText(stepObj.speakA, actualRate, "en-US", stepObj.roleASpeak || "steve");
    }
    clearSpotlight();
    await new Promise(r => setTimeout(r, 280));

    if (stepObj.speakB) {
      if (lineA && lineB) {
        lineB.classList.add("spotlight-speaker-b", "scale-[1.02]");
        lineA.classList.add("opacity-40");
      }
      await speakText(stepObj.speakB, actualRate, "en-US", stepObj.roleBSpeak || "alex");
    }
  } finally {
    clearSpotlight();
  }
}

function renderStoryStage(autoSpeak = false) {
  const stepObj = LESSON_CONFIG.storySteps[state.storyStepIdx];
  const assets = new Proxy({}, { get: (_, k) => getAsset(k) });
  const imgWrapper = document.getElementById("storySceneImgWrapper");
  const imgEl = document.getElementById("storySceneImgEl");
  const svgEl = document.getElementById("fireplaceSvg");
  const fireGlow = document.getElementById("svgFireGlowCircle");
  const unlitCover = document.getElementById("fireplaceUnlitCover");
  const fogEl = document.getElementById("blizzardFogOverlay");
  const modal = document.getElementById("storyActionModal");

  closeAllOverlays();
  if (modal) modal.classList.add("hidden");
  if (imgEl) imgEl.classList.remove("portal-energized", "portal-distortion");
  if (svgEl) svgEl.classList.remove("tree-sparkle-active");

  if (fogEl) {
    if (stepObj.step === 5 || stepObj.step === 6) {
      fogEl.classList.remove("hidden");
    } else {
      fogEl.classList.add("hidden");
    }
  }

  // 🦌 第 6 幕動態體素馴鹿 Rudolph 實體層控制
  const rudolphContainer = document.getElementById("rudolphOverlayContainer");
  const rudolphSprite = document.getElementById("rudolphSpriteBox");
  const rudolphBubble = document.getElementById("rudolphSpeechBubble");
  const rudolphText = document.getElementById("rudolphBubbleText");
  const rudolphIcon = document.getElementById("rudolphBubbleIcon");

  if (rudolphContainer) {
    if (stepObj.step === 6) {
      rudolphContainer.classList.remove("hidden");
      // 重置為在寒風中受凍發抖狀態
      if (rudolphSprite) {
        rudolphSprite.className = "relative flex flex-col items-center reindeer-shivering";
      }
      if (rudolphBubble && rudolphText && rudolphIcon) {
        rudolphBubble.className = "mb-2 px-3 py-1 rounded-xl bg-sky-950/90 border-2 border-sky-300 text-sky-200 font-black text-xs sm:text-sm shadow-xl flex items-center gap-1.5 animate-bounce";
        rudolphIcon.textContent = "❄️";
        rudolphText.textContent = "Brrr! So cold!";
      }
    } else {
      rudolphContainer.classList.add("hidden");
    }
  }

  const hotspotsGroup = document.getElementById("svgHotspotsGroup");
  if (hotspotsGroup) {
    hotspotsGroup.style.display = "none";
    hotspotsGroup.classList.add("hidden");
  }
  document.getElementById("svgPointerArrow")?.classList.add("hidden");

  if (stepObj.sceneType === "image") {
    imgWrapper.classList.remove("hidden");
    svgEl.classList.add("hidden");
    imgEl.src = assets[stepObj.assetKey] || "";
    state.heavySnow = (stepObj.step === 5 || stepObj.step === 6);
    if (unlitCover) unlitCover.style.opacity = "0";

    if (stepObj.step === 4) {
      imgEl.classList.add("portal-distortion");
      const viewport = document.getElementById("sceneViewport");
      if (viewport) {
        viewport.classList.remove("screen-rumble");
        void viewport.offsetWidth; // 強制重繪觸發動畫
        viewport.classList.add("screen-rumble");
      }
    }
  } else if (stepObj.sceneType === "cabin_dark_to_warm") {
    imgWrapper.classList.add("hidden");
    svgEl.classList.remove("hidden");
    state.heavySnow = false;
    if (stepObj.step === 6) {
      svgEl.setAttribute("class", "absolute inset-0 w-full h-full block cabin-frozen-dark");
      if (fireGlow) fireGlow.style.opacity = "0";
      if (unlitCover) unlitCover.style.opacity = "1";
    } else if (stepObj.step === 7) {
      if (state.cabinFireplaceLit) {
        svgEl.setAttribute("class", "absolute inset-0 w-full h-full block cabin-warm-lit");
        if (fireGlow) fireGlow.style.opacity = "1";
        if (unlitCover) unlitCover.style.opacity = "0";
      } else {
        svgEl.setAttribute("class", "absolute inset-0 w-full h-full block cabin-frozen-dark");
        if (fireGlow) fireGlow.style.opacity = "0";
        if (unlitCover) unlitCover.style.opacity = "1";
      }
    }
  } else {
    imgWrapper.classList.add("hidden");
    svgEl.classList.remove("hidden");
    state.heavySnow = false;
    svgEl.setAttribute("class", "absolute inset-0 w-full h-full block cabin-warm-lit");
    if (fireGlow) fireGlow.style.opacity = "1";
    if (unlitCover) unlitCover.style.opacity = "0";
    svgEl.classList.add("tree-sparkle-active");
  }

  document.getElementById("promptStepBadge").textContent = stepObj.badge;
  document.getElementById("promptLineA").textContent = stepObj.roleA;
  document.getElementById("promptLineB").textContent = stepObj.roleB;
  document.getElementById("promptLineB").classList.remove("hidden");
  document.getElementById("promptSubZh").textContent = stepObj.zhHint;

  const dotsRow = document.getElementById("storySceneDotsRow");
  dotsRow.innerHTML = "";
  const sceneShortTitles = ["1. 序曲", "2. 啟程", "3. 密室", "4. 傳送", "5. 風雪", "6. 馴鹿", "7. 木屋", "8. 慶典"];
  LESSON_CONFIG.storySteps.forEach((st, idx) => {
    const btn = document.createElement("button");
    const active = idx === state.storyStepIdx;
    btn.className = `py-1.5 px-1 sm:px-2 rounded-lg font-black text-xs sm:text-sm transition border-2 ${
      active
        ? "bg-amber-400 text-red-950 border-yellow-200 shadow"
        : "bg-[#38261a] text-amber-200 border-[#6e4c34] hover:bg-[#4e3626]"
    }`;
    btn.textContent = sceneShortTitles[idx] || `${idx + 1}. 幕 ${idx + 1}`;
    btn.addEventListener("click", () => {
      state.storyStepIdx = idx;
      renderStoryStage(false);
    });
    dotsRow.appendChild(btn);
  });

  document.getElementById("storyTriggerPropLabel").textContent = stepObj.actionBtnLabel;
  document.getElementById("storyPrevStepBtn").disabled = state.storyStepIdx === 0;
  document.getElementById("storyPrevStepBtn").classList.toggle("opacity-40", state.storyStepIdx === 0);

  const nextText = document.getElementById("storyNextStepText");
  nextText.textContent = state.storyStepIdx === LESSON_CONFIG.storySteps.length - 1 ? "進入單字合成" : "下一幕";

  // 觸發第 1 階段劇情聯動背景音樂 (自動淡入淡出)
  if (typeof playStorySceneBgm === "function") {
    playStorySceneBgm(stepObj.step);
  }

  updateSceneAndStars();
  if (autoSpeak) {
    speakStoryDialogue(stepObj, LESSON_CONFIG.speechRateNormal);
  }
}

function renderStoryQuiz(stepObj) {
  const area = document.getElementById("storyModalQuizArea");
  if (!area || !stepObj.quiz) {
    if (area) area.classList.add("hidden");
    return;
  }
  const q = stepObj.quiz;
  area.classList.remove("hidden");
  area.innerHTML = `
    <div class="story-quiz-card rounded-2xl p-3 sm:p-4 text-left">
      <div class="flex items-center justify-between gap-2 mb-2">
        <span class="px-2.5 py-0.5 rounded-lg bg-amber-400 text-red-950 font-black text-xs sm:text-sm">
          🎓 課堂互動挑戰 (Story Mini-Quiz)
        </span>
        <button id="speakQuizBtn" class="px-2 py-0.5 rounded bg-sky-500/80 hover:bg-sky-400 text-white font-black text-xs">
          🔊 聽題目
        </button>
      </div>
      <div class="font-black text-sm sm:text-base text-amber-200 leading-snug mb-1">${q.questionEn}</div>
      <div class="text-xs sm:text-sm font-bold text-amber-100/90 mb-3">${q.questionZh}</div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2" id="quizOptionsContainer"></div>
      <div id="quizFeedback" class="hidden mt-2.5 p-2 rounded-xl text-xs sm:text-sm font-black"></div>
    </div>
  `;

  document.getElementById("speakQuizBtn").addEventListener("click", () => {
    speakText(q.questionEn, LESSON_CONFIG.speechRateNormal);
  });

  const optContainer = document.getElementById("quizOptionsContainer");
  const fb = document.getElementById("quizFeedback");

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "story-quiz-btn py-2 px-2.5 rounded-xl bg-[#38261a] border-[#8c6649] text-amber-100 font-black text-xs sm:text-sm hover:bg-[#4d3423] text-left";
    btn.textContent = opt.text;
    btn.addEventListener("click", () => {
      if (opt.correct) {
        playSfx("reindeer_happy");
        playSfx("ding");
        triggerBurstParticles();

        // 🦌 觸發馴鹿獲救與走向松樹避風動畫
        if (stepObj.step === 6) {
          const rSprite = document.getElementById("rudolphSpriteBox");
          const rBubble = document.getElementById("rudolphSpeechBubble");
          const rText = document.getElementById("rudolphBubbleText");
          const rIcon = document.getElementById("rudolphBubbleIcon");

          if (rSprite) {
            rSprite.classList.remove("reindeer-shivering");
            rSprite.classList.add("reindeer-sheltered");
          }
          if (rBubble && rText && rIcon) {
            rBubble.className = "mb-2 px-3 py-1.5 rounded-xl bg-amber-400 border-2 border-yellow-200 text-red-950 font-black text-xs sm:text-sm shadow-2xl flex items-center gap-1.5 animate-pulse scale-110";
            rIcon.textContent = "❤️";
            rText.textContent = "Thank you! Safe under Pine Tree!";
          }
          triggerBurstParticles(undefined, undefined, "#facc15");
        }

        state.stars++;
        updateSceneAndStars();
        speakText(q.correctSpeech, LESSON_CONFIG.speechRateNormal);
        btn.className = "story-quiz-btn py-2 px-2.5 rounded-xl bg-lime-600 border-lime-300 text-white font-black text-xs sm:text-sm shadow";
        fb.className = "mt-2.5 p-2 rounded-xl text-xs sm:text-sm font-black bg-lime-900/90 border border-lime-400 text-lime-200 block";
        fb.innerHTML = `🎉 ${opt.feedback} <span class="text-amber-300">(+1 🌟 獲得星數！)</span>`;
        showToast("答對了！+1 🌟 獲得學習星星！", "⭐", true);
      } else {
        playSfx("error");
        btn.className = "story-quiz-btn py-2 px-2.5 rounded-xl bg-red-950/80 border-red-500 text-red-200 font-black text-xs sm:text-sm";
        fb.className = "mt-2.5 p-2 rounded-xl text-xs sm:text-sm font-black bg-red-900/80 border border-red-400 text-amber-200 block";
        fb.textContent = `❌ ${opt.feedback}`;
      }
    });
    optContainer.appendChild(btn);
  });
}

function triggerStorySceneProp() {
  const stepObj = LESSON_CONFIG.storySteps[state.storyStepIdx];
  const modal = document.getElementById("storyActionModal");
  const modalBody = document.getElementById("storyModalBody");
  const imgEl = document.getElementById("storySceneImgEl");
  const svgEl = document.getElementById("fireplaceSvg");
  const fireGlow = document.getElementById("svgFireGlowCircle");
  const unlitCover = document.getElementById("fireplaceUnlitCover");
  const fogEl = document.getElementById("blizzardFogOverlay");

  triggerBurstParticles();

  if (stepObj.step === 1) {
    // 第 1 幕（序曲）：打開北歐求救信
    playSfx("click");
    modalBody.textContent = stepObj.actionOverlayBody;
    renderStoryQuiz(stepObj);
  } else if (stepObj.step === 2) {
    // 第 2 幕（啟程）：冒險背包裝備觸控互動
    playSfx("flint_steel");
    playSfx("ding");
    triggerBurstParticles(undefined, undefined, "#facc15");

    modalBody.innerHTML = `
      <div class="mb-2 text-sm sm:text-base flex items-center justify-between">
        <span>${stepObj.actionOverlayBody}</span>
        <span id="backpackProgressBadge" class="px-2 py-0.5 rounded-full bg-amber-400 text-red-950 font-black text-xs">點擊收集物資</span>
      </div>
      <div id="backpackGrid" class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        <button class="backpack-slot-btn backpack-glow-slot rounded-2xl p-2.5 text-center flex flex-col items-center justify-center mc-btn" data-item="flint">
          <span class="text-3xl">⚡</span>
          <span class="font-black text-amber-300 text-xs sm:text-sm mt-1">打火石</span>
          <span class="text-[11px] text-amber-100/90 font-mono">flint & steel</span>
          <span class="status-badge mt-1 px-1.5 py-0.5 rounded bg-lime-500 text-slate-950 text-[10px] font-black">已就緒 ✨</span>
        </button>
        <button class="backpack-slot-btn backpack-glow-slot rounded-2xl p-2.5 text-center flex flex-col items-center justify-center mc-btn" data-item="compass">
          <span class="text-3xl">🧭</span>
          <span class="font-black text-amber-300 text-xs sm:text-sm mt-1">指南針</span>
          <span class="text-[11px] text-amber-100/90 font-mono">compass</span>
          <span class="status-badge mt-1 px-1.5 py-0.5 rounded bg-lime-500 text-slate-950 text-[10px] font-black">已就緒 ✨</span>
        </button>
        <button class="backpack-slot-btn backpack-glow-slot rounded-2xl p-2.5 text-center flex flex-col items-center justify-center mc-btn" data-item="coat">
          <span class="text-3xl">🧥</span>
          <span class="font-black text-amber-300 text-xs sm:text-sm mt-1">防寒大衣</span>
          <span class="text-[11px] text-amber-100/90 font-mono">winter coat</span>
          <span class="status-badge mt-1 px-1.5 py-0.5 rounded bg-lime-500 text-slate-950 text-[10px] font-black">已就緒 ✨</span>
        </button>
        <button class="backpack-slot-btn backpack-glow-slot rounded-2xl p-2.5 text-center flex flex-col items-center justify-center mc-btn" data-item="apple">
          <span class="text-3xl">🍎</span>
          <span class="font-black text-amber-300 text-xs sm:text-sm mt-1">金蘋果</span>
          <span class="text-[11px] text-amber-100/90 font-mono">golden apple</span>
          <span class="status-badge mt-1 px-1.5 py-0.5 rounded bg-lime-500 text-slate-950 text-[10px] font-black">已就緒 ✨</span>
        </button>
      </div>
    `;

    modalBody.querySelectorAll(".backpack-slot-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        playSfx("ding");
        playSfx("drop");
        triggerBurstParticles(undefined, undefined, "#facc15");
        btn.classList.add("ring-4", "ring-yellow-300", "scale-105");
        setTimeout(() => btn.classList.remove("scale-105"), 200);
      });
    });

    renderStoryQuiz(stepObj);
  } else if (stepObj.step === 3) {
    // 第 3 幕（密室）：點亮黑曜石傳送門
    playSfx("portal_ignite");
    imgEl.classList.add("portal-energized");
    const vp = document.getElementById("sceneViewport");
    if (vp) {
      vp.classList.remove("screen-rumble");
      void vp.offsetWidth;
      vp.classList.add("screen-rumble");
    }
    triggerBurstParticles(undefined, undefined, "#c084fc");
    modalBody.textContent = stepObj.actionOverlayBody;
    renderStoryQuiz(stepObj);
  } else if (stepObj.step === 4) {
    // 第 4 幕（傳送）：時空蟲洞維度躍遷
    playSfx("wormhole_warp");
    imgEl.classList.add("portal-distortion");
    if (typeof triggerPortalVortex === "function") triggerPortalVortex();
    modalBody.textContent = stepObj.actionOverlayBody;
    renderStoryQuiz(stepObj);
  } else if (stepObj.step === 5) {
    // 第 5 幕（風雪）：指南針雷達掃描
    state.heavySnow = true;
    playSfx("radar_ping");
    if (typeof playSfx === "function") playSfx("blizzard_wind");
    if (typeof triggerBlizzardBurst === "function") triggerBlizzardBurst();
    if (fogEl) fogEl.classList.remove("hidden");
    modalBody.textContent = stepObj.actionOverlayBody;
    renderStoryQuiz(stepObj);
  } else if (stepObj.step === 6) {
    // 第 6 幕（馴鹿）：尋找常綠松林庇護
    playSfx("radar_ping");
    playSfx("ding");
    triggerBurstParticles(undefined, undefined, "#38bdf8");
    modalBody.textContent = stepObj.actionOverlayBody;
    renderStoryQuiz(stepObj);
  } else if (stepObj.step === 7) {
    // 第 7 幕（木屋）：打火石點燃溫暖壁爐
    state.cabinFireplaceLit = true;
    svgEl.classList.remove("hidden");
    svgEl.setAttribute("class", "absolute inset-0 w-full h-full block cabin-warm-lit");
    if (fireGlow) fireGlow.style.opacity = "1";
    if (unlitCover) unlitCover.style.opacity = "0";
    playSfx("fireplace_ignite");
    setTimeout(() => playSfx("fire_crackle"), 450);
    playSfx("ding");
    if (typeof triggerFireplaceSparks === "function") triggerFireplaceSparks();
    if (typeof triggerChimneySmoke === "function") triggerChimneySmoke();
    modalBody.textContent = stepObj.actionOverlayBody;
    renderStoryQuiz(stepObj);
  } else if (stepObj.step === 8) {
    // 第 8 幕（慶典大結局）：聖誕大派對 ➔ 僅此幕提供前往合成台傳送門！
    playSfx("fanfare");
    playSfx("party_horn");
    playSfx("anvil_craft");
    if (typeof triggerConfetti === "function") triggerConfetti();
    svgEl.classList.add("tree-sparkle-active");
    LESSON_CONFIG.words.forEach(w => state.unlockedIds.add(w.id));
    updateSceneAndStars();

    modalBody.innerHTML = `
      <div class="text-sm sm:text-lg font-bold text-white leading-relaxed mb-2">${stepObj.actionOverlayBody}</div>
      <button id="warpToCraftingStageBtn" class="w-full mt-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 text-red-950 font-black text-base sm:text-xl shadow-2xl mc-btn flex items-center justify-center gap-2 animate-bounce">
        <span>⚒️ 前往麥塊合成台拼讀方塊</span> <span>▶️</span>
      </button>
    `;

    document.getElementById("warpToCraftingStageBtn")?.addEventListener("click", () => {
      playSfx("portal_hum");
      if (typeof triggerPortalVortex === "function") triggerPortalVortex();
      const modal = document.getElementById("storyActionModal");
      if (modal) modal.classList.add("hidden");
      showToast("穿越傳送門！抵達麥塊合成台！", "⚒️", true);
      setTimeout(() => {
        if (typeof switchStage === "function") {
          switchStage("words");
        }
      }, 450);
    });

    renderStoryQuiz(stepObj);
  }

  document.getElementById("storyModalTitle").textContent = stepObj.actionOverlayTitle;
  modal.classList.remove("hidden");
  showToast(stepObj.actionToast, "✨", true);
}