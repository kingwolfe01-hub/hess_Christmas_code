/* =========================================================================
   🎄 3D 麥塊聖誕冒險教室 (Minecraft Christmas 3D) - 單字與句型模組 (words.js)
   - 階段 2：Words & Craft 升級單字・擬音自然發音 (ttsChunks)・合成台與介系詞
   - 3 倍特寫單字・自然發音・單複數空間句型大看板 (#voxelZoomBox)
   - 麥塊合成台闖關 (Crafting Slots)
   - 空間介系詞三選一挑戰
   - 1 秒防洩題視覺提示卡
   ========================================================================= */

window.LESSON_CONFIG = window.LESSON_CONFIG || {};

LESSON_CONFIG.words = [
  {
    id: "tree",
    order: 1,
    word: "pine tree",
    baseWord: "tree",
    chunks: ["pine", "tree"],
    ttsChunks: ["pine", "tree"],
    distractorChunks: ["palm", "cone", "bell"],
    phonicsNote: "pine + tree ➔ pine tree (常綠松樹)",
    zh: "針葉松樹",
    emoji: "🌲",
    color: "#84cc16",
    prep: "by",
    prepZh: "在…旁邊 (by)",
    grammarTag: "單數問答 (Where is...? / It's...)",
    qaQ: "Where is the pine tree?",
    qaAHtml: "It's <span class='text-yellow-300 underline font-black'>by</span> the fireplace.",
    qaASpeak: "Where is the pine tree? It's by the fireplace.",
    culture: {
      flag: "🇩🇪",
      country: "德國 Germany",
      title: "德國 Germany：現代聖誕樹發源地",
      enSentence: "In Germany, people put trees in the house.",
      foreignFact: "德國是現代聖誕樹發源地，冬天將常綠松樹搬進屋內象徵長青與希望。",
      taiwanCompare: "就像台灣過年時，家裡會擺放開運竹或金桔樹象徵大吉大利！",
      quizQEn: "In Germany 🇩🇪, people put green _____ in the house!",
      quizQZh: "🇩🇪 國際文化挑戰：德國是現代聖誕樹發源地，人們會把哪種樹搬進屋內裝飾？"
    },
    layerKey: "layer_tree",
    thumbKey: "thumb_tree",
    coordHint: "點擊壁爐旁邊的松樹",
    layerRect: { x: 110, y: 135, w: 565, h: 560 },
    hotspotRect: { x: 120, y: 140, w: 545, h: 545 },
    labelPos: { x: 155, y: 475 },
    arrowPos: { x: 380, y: 415 }
  },
  {
    id: "ribbon",
    order: 2,
    word: "ribbon",
    baseWord: "ribbon",
    chunks: ["rib", "bon"],
    ttsChunks: ["rib", "bon"],
    distractorChunks: ["rob", "bin", "ton"],
    phonicsNote: "rib-bon ➔ ribbon (裝飾絲帶)",
    zh: "裝飾絲帶",
    emoji: "🎀",
    color: "#f43f5e",
    prep: "around",
    prepZh: "圍繞在…周圍 (around)",
    grammarTag: "單數問答 (Where is...? / It's...)",
    qaQ: "Where is the ribbon?",
    qaAHtml: "It's <span class='text-yellow-300 underline font-black'>around</span> the pine tree.",
    qaASpeak: "Where is the ribbon? It's around the pine tree.",
    culture: {
      flag: "🇫🇷",
      country: "法國 France",
      title: "法國 France：優雅節慶緞帶",
      enSentence: "In France, ribbons tie holiday joy together.",
      foreignFact: "法國擁有悠久緞帶工藝，聖誕節用精緻絲帶包裝禮物，象徵把家人心意繫在一起。",
      taiwanCompare: "就像台灣過年時，我們會在盆栽與賀禮繫上吉祥紅色金蔥緞帶！",
      quizQEn: "In France 🇫🇷, people tie colorful _____ on gifts!",
      quizQZh: "🇫🇷 國際文化挑戰：法國人喜歡用什麼漂亮的裝飾把禮物與松樹繫在一起？"
    },
    layerKey: "layer_ribbon",
    thumbKey: "thumb_ribbon",
    coordHint: "點擊松樹上的絲帶",
    layerRect: { x: 110, y: 135, w: 565, h: 560 },
    hotspotRect: { x: 230, y: 205, w: 330, h: 105 },
    labelPos: { x: 450, y: 225 },
    arrowPos: { x: 395, y: 195 }
  },
  {
    id: "ball",
    order: 3,
    word: "ornament",
    baseWord: "ornament",
    chunks: ["or", "na", "ment"],
    ttsChunks: ["or", "na", "ment"],
    distractorChunks: ["er", "ba", "tion"],
    phonicsNote: "or-na-ment ➔ ornament (裝飾彩球)",
    zh: "裝飾彩球",
    emoji: "🔮",
    color: "#ec4899",
    prep: "on",
    prepZh: "在…上面 (on)",
    grammarTag: "複數問答 (Where are...? / They're...)",
    qaQ: "Where are the ornaments?",
    qaAHtml: "They're <span class='text-yellow-300 underline font-black'>on</span> the tree.",
    qaASpeak: "Where are the ornaments? They're on the tree.",
    culture: {
      flag: "🇲🇽",
      country: "墨西哥 Mexico",
      title: "墨西哥 Mexico：手工彩色吊飾",
      enSentence: "In Mexico, bright ornaments bring joy.",
      foreignFact: "墨西哥聖誕節會懸掛五彩手工吹製玻璃飾品與裝滿糖果的星形皮納塔。",
      taiwanCompare: "就像台灣元宵節時孩子們提著色彩繽紛的花燈與生肖提燈！",
      quizQEn: "In Mexico 🇲🇽, colorful _____ are hung for Christmas!",
      quizQZh: "🇲🇽 國際文化挑戰：墨西哥慶典會懸掛色彩繽紛的什麼物品來帶來歡樂？"
    },
    layerKey: "layer_ball",
    thumbKey: "thumb_ball",
    coordHint: "點擊樹上的彩球吊飾",
    layerRect: { x: 180, y: 168, w: 430, h: 400 },
    hotspotRect: { x: 225, y: 318, w: 345, h: 105 },
    labelPos: { x: 185, y: 340 },
    arrowPos: { x: 410, y: 308 }
  },
  {
    id: "star",
    order: 4,
    word: "star",
    baseWord: "star",
    chunks: ["st", "ar"],
    ttsChunks: ["st", "ar"],
    distractorChunks: ["sp", "or", "er"],
    phonicsNote: "st-ar ➔ star (樹頂金星)",
    zh: "樹頂星星",
    emoji: "⭐",
    color: "#eab308",
    prep: "on top of",
    prepZh: "在…頂端 (on top of)",
    grammarTag: "單數問答 (Where is...? / It's...)",
    qaQ: "Where is the star?",
    qaAHtml: "It's <span class='text-yellow-300 underline font-black'>on top of</span> the tree.",
    qaASpeak: "Where is the star? It's on top of the tree.",
    culture: {
      flag: "🇵🇭",
      country: "菲律賓 Philippines",
      title: "菲律賓 Philippines：星芒燈籠 Parol",
      enSentence: "In the Philippines, star lanterns light the street.",
      foreignFact: "菲律賓家家戶戶會在窗前掛上五角發光星芒燈籠 Parol，象徵引領希望之星。",
      taiwanCompare: "就像台灣元宵節大街小巷掛起美麗燈籠一樣熱鬧！",
      quizQEn: "In the Philippines 🇵🇭, the bright _____ lantern is called a Parol!",
      quizQZh: "🇵🇭 國際文化挑戰：菲律賓傳統的 Parol 是什麼形狀的希望燈籠？"
    },
    layerKey: "layer_star",
    thumbKey: "thumb_star",
    coordHint: "點擊松樹最頂端的黃金星星",
    layerRect: { x: 305, y: 48, w: 175, h: 170 },
    hotspotRect: { x: 310, y: 55, w: 165, h: 160 },
    labelPos: { x: 395, y: 25 },
    arrowPos: { x: 395, y: 40 }
  },
  {
    id: "stocking",
    order: 5,
    word: "stocking",
    baseWord: "stocking",
    chunks: ["stock", "ing"],
    ttsChunks: ["stock", "ing"],
    distractorChunks: ["stick", "ang", "ong"],
    phonicsNote: "stock-ing ➔ stocking (聖誕長襪)",
    zh: "聖誕長襪",
    emoji: "🧦",
    color: "#ef4444",
    prep: "above",
    prepZh: "在…上方 (above)",
    grammarTag: "單數問答 (Where is...? / It's...)",
    qaQ: "Where is the stocking?",
    qaAHtml: "It's <span class='text-yellow-300 underline font-black'>above</span> the fireplace.",
    qaASpeak: "Where is the stocking? It's above the fireplace.",
    culture: {
      flag: "🇬🇧",
      country: "英國 United Kingdom (UK)",
      title: "英國 United Kingdom (UK)：壁爐長襪傳說",
      enSentence: "In the UK, children hang stockings by the fire.",
      foreignFact: "英國孩子傳統上把長襪掛在壁爐烘乾等待禮物，底部常放一顆象徵黃金的橘子。",
      taiwanCompare: "台灣多數家庭沒有壁爐，小朋友通常把聖誕襪掛在床頭或書桌旁等待驚喜！",
      quizQEn: "In the United Kingdom (UK) 🇬🇧, children hang a _____ by the fire for gifts!",
      quizQZh: "🇬🇧 國際文化挑戰：英國 United Kingdom (UK) 小朋友傳統上會把什麼掛在壁爐旁裝禮物？"
    },
    layerKey: "layer_stocking",
    thumbKey: "thumb_stocking",
    coordHint: "點擊壁爐上方的紅色長襪",
    layerRect: { x: 740, y: 252, w: 418, h: 246 },
    hotspotRect: { x: 750, y: 255, w: 390, h: 230 },
    labelPos: { x: 830, y: 205 },
    arrowPos: { x: 945, y: 240 }
  },
  {
    id: "gift",
    order: 6,
    word: "present",
    baseWord: "gift / present",
    chunks: ["pre", "sent"],
    ttsChunks: ["pre", "sent"],
    distractorChunks: ["pro", "ment", "ting"],
    phonicsNote: "pre-sent ➔ present (聖誕禮物)",
    zh: "聖誕禮物",
    emoji: "🎁",
    color: "#a855f7",
    prep: "under",
    prepZh: "在…下方 (under)",
    grammarTag: "複數問答 (Where are...? / They're...)",
    qaQ: "Where are the presents?",
    qaAHtml: "They're <span class='text-yellow-300 underline font-black'>under</span> the tree.",
    qaASpeak: "Where are the presents? They're under the tree.",
    culture: {
      flag: "🇺🇸",
      country: "美國 United States (USA)",
      title: "美國 United States (USA)：聖誕樹下的驚喜禮物",
      enSentence: "In the USA, presents wait under the tree.",
      foreignFact: "美國家庭習慣將包裝好的禮物堆在聖誕樹下，等到 25 日早晨全家一起開心拆開。",
      taiwanCompare: "台灣學校在聖誕節最受歡迎的活動是全班一起玩『聖誕交換禮物』！",
      quizQEn: "In the United States (USA) 🇺🇸, families put colorful _____ under the tree!",
      quizQZh: "🇺🇸 國際文化挑戰：美國 United States (USA) 家庭習慣將什麼禮品堆在聖誕樹下？"
    },
    layerKey: "layer_gift",
    thumbKey: "thumb_gift",
    coordHint: "點擊松樹底下的禮物盒",
    layerRect: { x: 65, y: 535, w: 630, h: 215 },
    hotspotRect: { x: 85, y: 560, w: 590, h: 185 },
    labelPos: { x: 260, y: 690 },
    arrowPos: { x: 380, y: 545 }
  },
  {
    id: "santa",
    order: 7,
    word: "Santa Claus",
    baseWord: "Santa",
    chunks: ["Santa", "Claus"],
    ttsChunks: ["Santa", "Claus"],
    distractorChunks: ["Sandy", "Cross", "Cloud"],
    phonicsNote: "Santa + Claus ➔ Santa Claus (聖誕老人)",
    zh: "聖誕老公公",
    emoji: "🎅",
    color: "#dc2626",
    prep: "in",
    prepZh: "在…裡面 (in the room)",
    grammarTag: "單數問答 (Where is...? / He's...)",
    qaQ: "Where is Santa Claus?",
    qaAHtml: "He is <span class='text-yellow-300 underline font-black'>in</span> the room.",
    qaASpeak: "Where is Santa Claus? He is in the room.",
    culture: {
      flag: "🇦🇺",
      country: "澳洲 Australia",
      title: "澳洲 Australia：衝浪聖誕老人",
      enSentence: "In Australia, Santa surfs at the sunny beach.",
      foreignFact: "南半球 12 月是炎熱夏天，澳洲聖誕老人會換上短褲到海灘衝浪送禮物！",
      taiwanCompare: "台灣 12 月是涼爽冬天需要穿薄外套；澳洲卻是在海邊衝浪吃冰淇淋！",
      quizQEn: "In Australia 🇦🇺, Santa wears shorts and surfs at the _____!",
      quizQZh: "🇦🇺 國際文化挑戰：南半球 12 月是夏天，澳洲聖誕老人常在什麼地方衝浪？"
    },
    layerKey: "layer_santa",
    thumbKey: "thumb_santa",
    coordHint: "點擊木屋中央的聖誕老人",
    layerRect: { x: 1055, y: 335, w: 300, h: 425 },
    hotspotRect: { x: 1070, y: 345, w: 275, h: 410 },
    labelPos: { x: 1060, y: 292 },
    arrowPos: { x: 1205, y: 330 }
  }
];

function getWordObj(id) {
  return LESSON_CONFIG.words.find(w => w.id === id) || LESSON_CONFIG.words[0];
}

function triggerFlashHint(target) {
  if (!target) return;
  playSfx("click");
  const hintBox = document.getElementById("flashHintBox");
  const hintImg = document.getElementById("flashHintImg");
  const hintTitle = document.getElementById("flashHintTitle");
  const assets = new Proxy({}, { get: (_, k) => getAsset(k) });

  hintImg.src = assets[target.thumbKey] || "";
  hintTitle.textContent = `${target.emoji} 目標：${target.zh}`;

  hintBox.classList.remove("hidden");
  hintBox.classList.add("flash-hint-active");

  const layerEl = document.getElementById(`voxel-layer-${target.id}`);
  if (layerEl) {
    layerEl.classList.add("voxel-hint-highlight");
  }

  setTimeout(() => {
    hintBox.classList.add("hidden");
    hintBox.classList.remove("flash-hint-active");
    if (layerEl) {
      layerEl.classList.remove("voxel-hint-highlight");
    }
  }, 1000);
}

function openVoxelZoomBox(wordId, autoSpeakRate = null) {
  state.focusedWordId = wordId;
  const item = getWordObj(wordId);
  const assets = new Proxy({}, { get: (_, k) => getAsset(k) });

  document.getElementById("cultureCompareBoard")?.classList.add("hidden");
  const zoomBox = document.getElementById("voxelZoomBox");
  document.getElementById("zoomGrammarBadge").textContent = `📍 ${item.grammarTag}`;
  document.getElementById("zoomBoxImg").src = assets[item.thumbKey] || "";
  document.getElementById("zoomWordZh").textContent = `${item.emoji} ${item.zh}`;
  document.getElementById("zoomAltWordBadge").textContent = item.baseWord;

  const colors = ["text-yellow-300", "text-lime-300", "text-sky-300", "text-pink-300"];
  document.getElementById("zoomGiantWord").innerHTML = item.chunks
    .map((ch, idx) => `<span class="${colors[idx % colors.length]}">${ch}</span>`)
    .join("");

  const chunksRow = document.getElementById("zoomChunksRow");
  chunksRow.innerHTML = "";
  item.chunks.forEach((ch, idx) => {
    const ttsSound = (item.ttsChunks && item.ttsChunks[idx]) ? item.ttsChunks[idx] : ch;
    const btn = document.createElement("button");
    btn.className = "px-2.5 py-1 rounded-lg bg-black/80 hover:bg-amber-400 hover:text-red-950 border-2 border-amber-300 font-black text-base sm:text-lg text-white transition mc-btn";
    btn.textContent = ch;
    btn.title = "點擊聽自然發音";
    btn.addEventListener("click", () => {
      playSfx("click");
      speakText(ttsSound, LESSON_CONFIG.speechRateSlow);
    });
    chunksRow.appendChild(btn);
  });

  document.getElementById("zoomPhonicsNote").textContent = item.phonicsNote;
  document.getElementById("zoomPrepBadge").textContent = `介系詞：${item.prepZh}`;
  document.getElementById("zoomQaQuestion").textContent = `Q: ${item.qaQ}`;
  document.getElementById("zoomQaAnswer").innerHTML = `A: ${item.qaAHtml}`;

  zoomBox.classList.remove("hidden");
  updateSceneAndStars();

  if (autoSpeakRate !== null) {
    speakText(item.word, autoSpeakRate);
  }
}

function renderWordsStage(autoSpeak = false) {
  document.getElementById("storySceneImgWrapper")?.classList.add("hidden");
  document.getElementById("fireplaceSvg")?.classList.remove("hidden");
  document.getElementById("cultureCompareBoard")?.classList.add("hidden");

  const subBtns = [
    { id: "wordsSubModeLearnBtn", mode: "learn" },
    { id: "wordsSubModeSpellBtn", mode: "spell" },
    { id: "wordsSubModePrepBtn", mode: "prep" }
  ];
  subBtns.forEach(b => {
    const el = document.getElementById(b.id);
    if (!el) return;
    const active = state.wordsSubMode === b.mode;
    el.className = active
      ? "py-2 px-2.5 rounded-xl font-black text-xs sm:text-sm mc-btn flex items-center justify-between bg-amber-400 text-red-950 ring-2 ring-yellow-200"
      : "py-2 px-2.5 rounded-xl font-black text-xs sm:text-sm mc-btn flex items-center justify-between bg-[#38261a] text-amber-200 hover:bg-[#4e3626]";
  });

  const zone = document.getElementById("wordsInteractiveZone");
  zone.innerHTML = "";
  const assets = new Proxy({}, { get: (_, k) => getAsset(k) });

  if (state.wordsSubMode === "learn") {
    document.getElementById("promptStepBadge").textContent = "🔤 Words & Grammar · 升級單字、音節拆解與單複數空間句型";
    document.getElementById("promptLineA").textContent = "Click a block! Practice Phonics & 'Where is / Where are...?'";
    document.getElementById("promptLineB").classList.add("hidden");
    document.getElementById("promptSubZh").textContent = "點選下方 7 張圖卡，帶全班練習自然發音音節拆解，以及單數 (It's) 與複數 (They're) 的空間介系詞問答！";

    const grid = document.createElement("div");
    grid.className = "w-full grid grid-cols-7 gap-1.5 sm:gap-2.5";
    LESSON_CONFIG.words.forEach(item => {
      const active = state.focusedWordId === item.id;
      const btn = document.createElement("button");
      btn.className = `h-[118px] sm:h-[128px] rounded-2xl p-1.5 flex flex-col items-center justify-between transition mc-btn relative ${
        active
          ? "bg-amber-400 text-red-950 ring-4 ring-yellow-200 scale-[1.03]"
          : "bg-[#38261a] hover:bg-[#4e3626] text-white"
      }`;
      btn.innerHTML = `
        <span class="absolute top-1 left-1.5 text-xs sm:text-sm bg-black/70 px-1 rounded">${item.emoji}</span>
        <span class="absolute top-1 right-1.5 text-[10px] sm:text-xs font-black px-1.5 py-0.2 rounded ${active ? "bg-red-950 text-amber-200" : "bg-emerald-900 text-lime-200"}">${item.prep}</span>
        <img src="${assets[item.thumbKey] || ""}" alt="${item.word}" class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border-2 ${active ? "border-red-950" : "border-amber-300/70"} shadow mt-3" />
        <span class="text-xs sm:text-base font-black leading-none tracking-tight truncate w-full text-center">${item.word}</span>
        <span class="text-[10px] sm:text-xs font-bold ${active ? "text-red-900" : "text-amber-200"} truncate w-full text-center">${item.zh.split(" ")[0]}</span>
      `;
      btn.addEventListener("click", () => {
        state.focusedWordId = item.id;
        renderWordsStage(false);
        openVoxelZoomBox(item.id, null);
      });
      grid.appendChild(btn);
    });
    zone.appendChild(grid);
    openVoxelZoomBox(state.focusedWordId, autoSpeak ? LESSON_CONFIG.speechRateNormal : null);
    return;
  }

  document.getElementById("voxelZoomBox")?.classList.add("hidden");
  const remainingIdx = LESSON_CONFIG.words.findIndex(w => !state.unlockedIds.has(w.id));
  if (remainingIdx === -1) {
    state.unlockedIds.clear();
    state.gameQueueIdx = 0;
  } else {
    state.gameQueueIdx = remainingIdx;
  }
  const target = LESSON_CONFIG.words[state.gameQueueIdx];

  if (state.wordsSubMode === "spell") {
    state.craftedChunks = [];
    document.getElementById("promptStepBadge").textContent = `🔤 麥塊合成台拼字挑戰 (${state.unlockedIds.size + 1} / 7)`;
    const slotCount = target.chunks.length;
    const slotGuide = target.chunks.map((_, i) => `【方塊 ${i + 1}】`).join(" + ");
    document.getElementById("promptLineA").textContent = `👂 Listen & Craft: ${target.emoji} "${target.zh}"  [ ${slotGuide} ]`;
    document.getElementById("promptLineB").classList.add("hidden");
    document.getElementById("promptSubZh").textContent = `請聽發音，將下方「${slotCount} 個音節磚」依序合成單字！（若拼錯，系統會保留正確方塊，僅退回放錯的方塊）`;

    const wrapper = document.createElement("div");
    wrapper.className = "w-full flex items-center justify-between gap-3 sm:gap-4 bg-black/55 p-3 rounded-2xl border-3 border-amber-400/60";

    const slotsArea = document.createElement("div");
    slotsArea.className = "flex items-center gap-3 shrink-0";
    slotsArea.innerHTML = `
      <button id="spellListenTargetBtn" class="relative w-18 h-18 sm:w-22 sm:h-22 rounded-2xl border-4 border-amber-300 overflow-hidden shadow-xl shrink-0 group transition hover:scale-105" title="點擊重聽單字發音">
        <img src="${assets[target.thumbKey] || ""}" alt="${target.zh}" class="w-full h-full object-cover" />
        <span class="absolute inset-0 bg-black/35 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition">🔊</span>
      </button>
      <div>
        <div class="text-xs sm:text-sm font-black text-amber-300 mb-1 flex items-center gap-1.5">
          <span>⚒️ 麥塊合成槽</span>
          <span class="text-[11px] text-amber-200/80 font-bold">（點擊已填入格子可退回）</span>
        </div>
        <div id="craftingSlotsRow" class="flex items-center gap-2"></div>
      </div>
    `;

    const poolArea = document.createElement("div");
    poolArea.id = "craftingPoolRow";
    poolArea.className = "flex-1 flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap";

    const btnCol = document.createElement("div");
    btnCol.className = "flex flex-col gap-2 shrink-0";

    const hintBtn = document.createElement("button");
    hintBtn.id = "spellHintBtn";
    hintBtn.className = "h-[42px] sm:h-[46px] px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm mc-btn flex items-center justify-center gap-1.5 shadow-lg";
    hintBtn.innerHTML = "💡 視覺提示";
    hintBtn.title = "在 3D 木屋閃示目標物件 1 秒鐘 (不洩漏英文拼字)";
    hintBtn.addEventListener("click", () => triggerFlashHint(target));

    const clearBtn = document.createElement("button");
    clearBtn.className = "h-[42px] sm:h-[46px] px-3.5 rounded-xl bg-rose-900/85 hover:bg-rose-800 text-rose-100 font-black text-xs sm:text-sm mc-btn flex items-center justify-center gap-1.5";
    clearBtn.innerHTML = "🔄 清空";
    clearBtn.addEventListener("click", () => renderWordsStage(false));

    btnCol.appendChild(hintBtn);
    btnCol.appendChild(clearBtn);

    wrapper.appendChild(slotsArea);
    wrapper.appendChild(poolArea);
    wrapper.appendChild(btnCol);
    zone.appendChild(wrapper);

    document.getElementById("spellListenTargetBtn").addEventListener("click", () => {
      speakText(target.word, LESSON_CONFIG.speechRateSlow);
    });

    const rawPool = [
      ...target.chunks.map((ch, idx) => ({
        text: ch,
        tts: (target.ttsChunks && target.ttsChunks[idx]) ? target.ttsChunks[idx] : ch
      })),
      ...target.distractorChunks.slice(0, 2).map(ch => ({ text: ch, tts: ch }))
    ];
    const shift = (state.gameQueueIdx + 1) % rawPool.length;
    const shuffledPool = rawPool.slice(shift).concat(rawPool.slice(0, shift));
    const poolButtons = [];

    function refreshCraftingSlotsUI(validationStates = null) {
      const slotsRow = document.getElementById("craftingSlotsRow");
      if (!slotsRow) return;
      slotsRow.innerHTML = "";

      target.chunks.forEach((correctChunk, slotIdx) => {
        const entry = state.craftedChunks[slotIdx];
        const slotBtn = document.createElement("button");
        
        let colorClasses = "mc-slot-dark text-amber-200/40 cursor-default border-3 border-[#6e4c34]";
        if (entry) {
          if (validationStates && validationStates[slotIdx] === true) {
            colorClasses = "bg-emerald-600 text-white border-4 border-lime-300 shadow-[0_0_15px_rgba(74,222,128,0.8)]";
          } else if (validationStates && validationStates[slotIdx] === false) {
            colorClasses = "bg-rose-600 text-white border-4 border-red-300 shadow-[0_0_15px_rgba(244,63,94,0.8)]";
          } else {
            colorClasses = "bg-amber-400 hover:bg-amber-300 text-red-950 border-4 border-yellow-200 shadow cursor-pointer";
          }
        }

        slotBtn.className = `px-3 h-16 sm:h-20 min-w-[76px] sm:min-w-[92px] rounded-2xl flex flex-col items-center justify-center font-black text-xl sm:text-3xl transition-all ${colorClasses}`;
        
        if (entry) {
          slotBtn.innerHTML = `
            <span>${entry.text}</span>
            <span class="text-[10px] text-red-950/70 font-bold">✕ 退回</span>
          `;
          slotBtn.title = "點擊退回這個音節方塊";
          slotBtn.addEventListener("click", () => {
            playSfx("click");
            const removed = state.craftedChunks.splice(slotIdx, 1)[0];
            if (removed && poolButtons[removed.poolIndex]) {
              poolButtons[removed.poolIndex].disabled = false;
              poolButtons[removed.poolIndex].classList.remove("opacity-30", "pointer-events-none");
            }
            refreshCraftingSlotsUI();
          });
        } else {
          slotBtn.innerHTML = `<span class="opacity-30 text-2xl">?</span>`;
        }
        slotsRow.appendChild(slotBtn);
      });
    }

    shuffledPool.forEach((chunkObj, poolIdx) => {
      const cBtn = document.createElement("button");
      cBtn.className = "h-16 sm:h-20 px-5 sm:px-6 rounded-2xl bg-[#38261a] hover:bg-[#4e3626] border-4 border-amber-300 text-white font-black text-2xl sm:text-3xl mc-btn shadow-lg transition active:scale-95";
      cBtn.textContent = chunkObj.text;
      poolButtons.push(cBtn);

      cBtn.addEventListener("click", () => {
        if (state.craftedChunks.length >= target.chunks.length) return;
        playSfx("click");
        speakText(chunkObj.tts, LESSON_CONFIG.speechRateSlow);

        state.craftedChunks.push({ text: chunkObj.text, poolIndex: poolIdx });
        cBtn.disabled = true;
        cBtn.classList.add("opacity-30", "pointer-events-none");
        refreshCraftingSlotsUI();

        if (state.craftedChunks.length === target.chunks.length) {
          const validationStates = state.craftedChunks.map((item, i) => item.text === target.chunks[i]);
          const isAllCorrect = validationStates.every(v => v === true);

          refreshCraftingSlotsUI(validationStates);

          if (isAllCorrect) {
            handleQuizSuccess(target, "words");
          } else {
            playSfx("oops");
            speakText(`Listen: ${target.word}. Try again!`, LESSON_CONFIG.speechRateSlow);
            showToast(`部分方塊放錯囉！已為您保留正確的綠燈方塊，請補齊放錯的方塊！`, "💡", false);

            setTimeout(() => {
              for (let i = state.craftedChunks.length - 1; i >= 0; i--) {
                if (validationStates[i] === false) {
                  const wrongItem = state.craftedChunks.splice(i, 1)[0];
                  if (wrongItem && poolButtons[wrongItem.poolIndex]) {
                    poolButtons[wrongItem.poolIndex].disabled = false;
                    poolButtons[wrongItem.poolIndex].classList.remove("opacity-30", "pointer-events-none");
                  }
                }
              }
              refreshCraftingSlotsUI();
            }, 850);
          }
        }
      });
      poolArea.appendChild(cBtn);
    });

    refreshCraftingSlotsUI();
    updateSceneAndStars();
    if (autoSpeak) speakText(target.word, LESSON_CONFIG.speechRateNormal);
  } else if (state.wordsSubMode === "prep") {
    document.getElementById("promptStepBadge").textContent = `📍 空間位置問答挑戰 (${state.unlockedIds.size + 1} / 7)`;
    document.getElementById("promptLineA").textContent = `${target.qaQ}`;
    document.getElementById("promptLineB").classList.remove("hidden");
    document.getElementById("promptLineB").innerHTML = target.qaAHtml.replace(/<span[^>]*>[^<]+<\/span>/, "<span class='text-yellow-300 underline font-black px-2 bg-black/40 rounded'>[ ? ]</span>");
    document.getElementById("promptSubZh").textContent = `觀察 3D 木屋畫面：「${target.zh} (${target.word})」在哪裡？請選擇正確的空間介系詞！`;

    const ALL_PREPOSITIONS = [
      { prep: "by", icon: "◀️", zh: "在…旁邊 (by)" },
      { prep: "around", icon: "🔄", zh: "圍繞在…周圍 (around)" },
      { prep: "on", icon: "🔼", zh: "在…上面 (on)" },
      { prep: "at the top of", icon: "⭐", zh: "在…頂端 (at the top of)" },
      { prep: "above", icon: "⬆️", zh: "在…正上方 (above)" },
      { prep: "under", icon: "🔽", zh: "在…下方 (under)" },
      { prep: "in front of", icon: "🧍", zh: "在…正前方 (in front of)" }
    ];

    const correctPrepObj = ALL_PREPOSITIONS.find(p => p.prep === target.prep) || {
      prep: target.prep,
      icon: "📍",
      zh: target.prepZh || target.prep
    };

    const distractors = ALL_PREPOSITIONS.filter(p => p.prep !== target.prep);
    const shuffledDistractors = [...distractors].sort(() => Math.random() - 0.5).slice(0, 2);
    const prepOptions = [correctPrepObj, ...shuffledDistractors].sort(() => Math.random() - 0.5);

    const grid = document.createElement("div");
    grid.className = "w-full grid grid-cols-3 gap-3 sm:gap-4";
    prepOptions.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "h-[115px] sm:h-[125px] rounded-2xl bg-[#38261a] hover:bg-[#4e3626] border-4 border-lime-300/80 px-2 sm:px-4 py-2 flex items-center justify-center gap-2 sm:gap-3 mc-btn shadow-xl transition-all";
      btn.innerHTML = `
        <span class="text-3xl sm:text-5xl flex-shrink-0">${opt.icon}</span>
        <div class="text-left overflow-hidden">
          <div class="text-xl sm:text-3xl lg:text-4xl font-black text-yellow-300 leading-tight truncate">${opt.prep}</div>
          <div class="text-xs sm:text-sm font-bold text-white mt-1 line-clamp-1">${opt.zh}</div>
        </div>
      `;
      btn.addEventListener("click", () => {
        if (opt.prep === target.prep) {
          handleQuizSuccess(target, "words");
        } else {
          playSfx("oops");
          btn.classList.add("opacity-45", "border-rose-400");
          speakText(`Try again! ${target.qaQ}`, LESSON_CONFIG.speechRateSlow);
          showToast(`再觀察一下畫面喔！提示：${target.prepZh}`, "👀", false);
        }
      });
      grid.appendChild(btn);
    });
    zone.appendChild(grid);
    updateSceneAndStars();
    if (autoSpeak) speakText(target.qaQ, LESSON_CONFIG.speechRateNormal);
  }
}
