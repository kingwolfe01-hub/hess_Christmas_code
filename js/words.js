/* =========================================================================
   🎄 3D 麥塊聖誕冒險教室 (Minecraft Christmas 3D) - 單字與句型模組 (words.js)
   - 階段 2：Words & Craft 升級單字・自然發音・合成台與介系詞
   - 特寫單字・自然發音・單複數空間句型大看板 (#voxelZoomBox)
   - 麥塊合成台闖關 (Crafting Slots)
   - 空間介系詞三選一挑戰
   ========================================================================= */

window.LESSON_CONFIG = window.LESSON_CONFIG || {};

LESSON_CONFIG.words = [
  {
    id: "tree",
    order: 1,
    word: "Christmas tree",
    baseWord: "tree",
    chunks: ["Christ", "mas", "tree"],
    wordBreakAfterChunk: [1],
    ttsChunks: ["Christ", "mas", "tree"],
    distractorChunks: ["palm", "cone", "bell"],
    phonicsNote: "Christ + mas + tree ➔ Christmas tree (聖誕樹)",
    zh: "聖誕樹",
    emoji: "🌲",
    color: "#84cc16",
    prep: "by",
    prepZh: "在…旁邊 (by)",
    grammarTag: "單數問答 (Where is...? / It's...)",
    qaQ: "Where is the Christmas tree?",
    qaAHtml: "It's <span class='text-yellow-300 underline font-black'>by</span> the fireplace.",
    qaASpeak: "Where is the Christmas tree? It's by the fireplace.",
    culture: {
      flag: "",
      country: "德國 Germany",
      title: "德國：聖誕樹的故鄉",
      enSentence: "In Germany, people put trees in the house.",
      foreignFact: "德國是現代聖誕樹傳統的重要發展地之一。早期人們會在家中擺放常綠樹木，後來逐漸發展成裝飾聖誕樹的習俗，成為聖誕節的重要象徵。",
      taiwanCompare: "台灣在地比較：就像台灣過年時，家裡會擺放開運竹或金桔樹象徵大吉大利！",
      quizQEn: "What do people in Germany put in the house?",
      quizQZh: "國際文化挑戰：德國是聖誕樹的發源地，人們會把哪種樹搬進屋內裝飾？",
      quizOptionWord: "Christmas trees"
    },
    layerKey: "layer_tree",
    thumbKey: "thumb_tree",
    coordHint: "點擊壁爐旁邊的聖誕樹",
    layerRect: { x: 110, y: 135, w: 565, h: 560 },
    hotspotRect: { x: 120, y: 135, w: 535, h: 560 },
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
    qaAHtml: "It's <span class='text-yellow-300 underline font-black'>around</span> the Christmas tree.",
    qaASpeak: "Where is the ribbon? It's around the Christmas tree.",
    culture: {
      flag: "",
      country: "瑞典 Sweden",
      title: "瑞典：紅緞帶聖誕山羊",
      enSentence: "In Sweden, people decorate straw Christmas goats with red ribbons.",
      foreignFact: "瑞典有一種傳統的聖誕裝飾叫做「聖誕山羊」（Yule Goat），通常以稻草編製，並繫上紅色緞帶作為裝飾，是瑞典很有特色的聖誕象徵。",
      taiwanCompare: "台灣在地比較：就像台灣過年時，常會使用紅色春聯、紅燈籠等裝飾，增添喜氣與節慶氣氛！",
      quizQEn: "What do people in Sweden tie on straw Christmas goats?",
      quizQZh: "國際文化挑戰：瑞典傳統的「聖誕山羊」（Yule Goat）通常會繫上什麼紅色裝飾？"
    },
    layerKey: "layer_ribbon",
    thumbKey: "thumb_ribbon",
    coordHint: "點擊聖誕樹上的絲帶",
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
    prep: "in",
    prepZh: "在…裡面 (in)",
    grammarTag: "複數問答 (Where are...? / They're...)",
    qaQ: "Where are the ornaments?",
    qaAHtml: "They're <span class='text-yellow-300 underline font-black'>in</span> the tree.",
    qaASpeak: "Where are the ornaments? They're in the tree.",
    culture: {
      flag: "",
      country: "捷克 Czechia",
      title: "捷克：閃亮玻璃珠裝飾",
      enSentence: "In Czechia, people make shiny glass ornaments.",
      foreignFact: "捷克北部有一種特別的聖誕裝飾工藝。工匠會將玻璃製作成一顆顆小珠子，再串接起來，做成星星、雪花等漂亮的聖誕裝飾品，讓聖誕樹閃閃發亮！",
      taiwanCompare: "台灣在地比較：就像台灣元宵節時孩子們提著色彩繽紛的花燈與生肖提燈！",
      quizQEn: "What do people in Czechia make out of glass for Christmas trees?",
      quizQZh: "國際文化挑戰：捷克工匠會用玻璃製作什麼漂亮的聖誕裝飾品，讓聖誕樹閃閃發亮？"
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
    chunks: ["star"],
    ttsChunks: ["star"],
    distractorChunks: ["sp", "or", "er"],
    phonicsNote: "star ➔ star (樹頂星星)",
    zh: "樹頂星星",
    emoji: "⭐",
    color: "#eab308",
    prep: "on the top of",
    prepZh: "在…頂端 (on the top of)",
    grammarTag: "單數問答 (Where is...? / It's...)",
    qaQ: "Where is the star?",
    qaAHtml: "It's <span class='text-yellow-300 underline font-black'>on the top of</span> the tree.",
    qaASpeak: "Where is the star? It's on the top of the tree.",
    culture: {
      flag: "",
      country: "菲律賓 Philippines",
      title: "菲律賓：星芒燈籠 Parol",
      enSentence: "In the Philippines, star lanterns light the street.",
      foreignFact: "菲律賓家家戶戶會在窗前掛上五角發光星芒燈籠 Parol，象徵引領希望之星。",
      taiwanCompare: "台灣在地比較：就像台灣元宵節大街小巷掛起美麗燈籠一樣熱鬧！",
      quizQEn: "What shape is the lantern in the Philippines?",
      quizQZh: "國際文化挑戰：菲律賓傳統的 Parol 是什麼形狀的希望燈籠？"
    },
    layerKey: "layer_star",
    thumbKey: "thumb_star",
    coordHint: "點擊聖誕樹最頂端的黃金星星",
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
    grammarTag: "複數問答 (Where are...? / They're...)",
    qaQ: "Where are the stockings?",
    qaAHtml: "They're <span class='text-yellow-300 underline font-black'>above</span> the fireplace.",
    qaASpeak: "Where are the stockings? They're above the fireplace.",
    culture: {
      flag: "",
      country: "英國 United Kingdom",
      title: "英國：壁爐長襪傳說",
      enSentence: "In the UK, kids hang stockings on Christmas Eve.",
      foreignFact: "在英國，許多小朋友會在聖誕節前掛起聖誕長襪，期待聖誕老人放入糖果、小玩具和小禮物。有些家庭也會在襪子的底部放一顆橘子，這個習俗流傳著與聖尼古拉斯送金幣的故事有關。",
      taiwanCompare: "台灣在地比較：在台灣農曆新年時，長輩常會準備紅包送給小朋友，裡面裝著壓歲錢，代表新年的祝福，也象徵平安與好運。",
      quizQEn: "What do kids in the UK hang on Christmas Eve?",
      quizQZh: "國際文化挑戰：在英國，小朋友會在聖誕節前掛起什麼來期待糖果與小禮物？"
    },
    layerKey: "layer_stocking",
    thumbKey: "thumb_stocking",
    coordHint: "點擊壁爐上方的聖誕長襪",
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
    chunks: ["pres", "ent"],
    ttsChunks: ["pres", "ent"],
    distractorChunks: ["pro", "ment", "ting"],
    phonicsNote: "pres-ent ➔ present (聖誕禮物)",
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
      flag: "",
      country: "芬蘭 Finland",
      title: "芬蘭：聖誕老人村的禮物",
      enSentence: "In Finland, Santa prepares presents for kids.",
      foreignFact: "芬蘭有一座著名的聖誕老人村，人們可以去拜訪聖誕老人並寄出卡片，許多小朋友也相信全世界的聖誕禮物都是從這裡準備並送出的！",
      taiwanCompare: "台灣在地比較：台灣學校在聖誕節最受歡迎的活動是全班一起玩『聖誕交換禮物』！",
      quizQEn: "What does Santa prepare for kids in Finland?",
      quizQZh: "國際文化挑戰：在芬蘭聖誕老人村，聖誕老人會為小朋友準備什麼？"
    },
    layerKey: "layer_gift",
    thumbKey: "thumb_gift",
    coordHint: "點擊聖誕樹底下的禮物盒",
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
    wordBreakAfterChunk: [0],
    ttsChunks: ["Santa", "Claus"],
    distractorChunks: ["Sandy", "Cross", "Cloud"],
    phonicsNote: "Santa-Claus ➔ Santa Claus (聖誕老人)",
    zh: "聖誕老人",
    emoji: "🎅",
    color: "#dc2626",
    prep: "in",
    prepZh: "在…裡面 (in)",
    grammarTag: "單數問答 (Where is...? / He's...)",
    qaQ: "Where is Santa Claus?",
    qaAHtml: "He is <span class='text-yellow-300 underline font-black'>in</span> the room.",
    qaASpeak: "Where is Santa Claus? He is in the room.",
    culture: {
      flag: "",
      country: "澳洲 Australia",
      title: "澳洲：衝浪聖誕老人",
      enSentence: "In Australia, you may see Santa Claus at the beach.",
      foreignFact: "澳洲位於南半球，12 月正值夏天。有些地方會出現穿著夏日服裝的聖誕老人，甚至在海灘舉辦聖誕活動，展現與冬季聖誕節不同的面貌！",
      taiwanCompare: "台灣在地比較：台灣 12 月是冬天，出門常需要穿外套；澳洲卻是炎熱的夏天，大家甚至能在海邊衝浪、吃冰淇淋過聖誕節！",
      quizQEn: "Who may you see at the beach in Australia in December?",
      quizQZh: "國際文化挑戰：澳洲 12 月正值夏天，大家可能會在海邊看到誰？"
    },
    layerKey: "layer_santa",
    thumbKey: "thumb_santa",
    coordHint: "點擊木屋右側的聖誕老人",
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
  const hsEl = document.getElementById(`scene-hs-${target.id}`);
  if (layerEl) {
    layerEl.classList.add("voxel-unlocked", "voxel-glow-gold", "voxel-max-bright");
  }
  if (hsEl) {
    hsEl.classList.add("is-focused", "is-active-target");
  }

  setTimeout(() => {
    hintBox.classList.add("hidden");
    hintBox.classList.remove("flash-hint-active");
    if (layerEl) {
      layerEl.classList.remove("voxel-glow-gold", "voxel-max-bright");
      updateSceneAndStars();
    }
    if (hsEl && state.stage === "words" && state.wordsSubMode === "spell") {
      hsEl.classList.remove("is-focused", "is-active-target");
    }
  }, 1000);
}

function openVoxelZoomBox(wordId, autoSpeakRate = null) {
  state.focusedWordId = wordId;
  const item = getWordObj(wordId);
  const assets = new Proxy({}, { get: (_, k) => getAsset(k) });

  document.getElementById("cultureCompareBoard")?.classList.add("hidden");
  const zoomBox = document.getElementById("voxelZoomBox");
  if (zoomBox) {
    zoomBox.style.removeProperty("left");
    zoomBox.style.removeProperty("top");
    zoomBox.style.removeProperty("right");
    zoomBox.style.removeProperty("bottom");
    zoomBox.style.removeProperty("transform");
  }
  document.getElementById("zoomGrammarBadge").textContent = `📍 ${item.grammarTag}`;
  document.getElementById("zoomBoxImg").src = assets[item.thumbKey] || "";
  document.getElementById("zoomWordZh").textContent = `${item.emoji} ${item.zh}`;

  const colors = ["text-yellow-300", "text-lime-300", "text-sky-300", "text-pink-300"];
  const breaks = item.wordBreakAfterChunk || [];
  document.getElementById("zoomGiantWord").innerHTML = item.chunks
    .map((ch, idx) => `<span class="${colors[idx % colors.length]}">${ch}</span>${breaks.includes(idx) ? " " : ""}`)
    .join("");

  const chunksRow = document.getElementById("zoomChunksRow");
  chunksRow.innerHTML = "";
  item.chunks.forEach((ch) => {
    const chip = document.createElement("span");
    chip.className = "px-3.5 py-1 rounded-xl bg-black/80 border-2 border-amber-300 font-black text-base sm:text-xl text-yellow-300 shadow-md select-none cursor-default";
    chip.textContent = ch;
    chunksRow.appendChild(chip);
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
      ? "h-[32px] sm:h-[35px] px-2.5 rounded-xl font-black text-xs sm:text-sm mc-btn flex items-center justify-between bg-amber-400 text-red-950 ring-2 ring-yellow-200"
      : "h-[32px] sm:h-[35px] px-2.5 rounded-xl font-black text-xs sm:text-sm mc-btn flex items-center justify-between bg-[#38261a] text-amber-200 hover:bg-[#4e3626]";
  });

  const zone = document.getElementById("wordsInteractiveZone");
  zone.innerHTML = "";
  const assets = new Proxy({}, { get: (_, k) => getAsset(k) });

  const nametagBox = document.getElementById("promptNametagBox");
  const stepBadge = document.getElementById("promptStepBadge");
  const slowBtn = document.getElementById("bannerSpeakSlowBtn");
  const speakBtn = document.getElementById("bannerSpeakBtn");

  if (state.wordsSubMode === "learn") {
    nametagBox?.classList.remove("hidden");
    stepBadge?.classList.add("hidden");
    slowBtn?.classList.add("hidden");
    speakBtn?.classList.add("hidden");

    document.getElementById("promptLineA").textContent = "Click a block! Practice Phonics & 'Where is / Where are...?'";
    document.getElementById("promptLineB").classList.add("hidden");
    document.getElementById("promptSubZh").textContent = "點選下方 7 張圖卡，帶全班練習自然發音音節拆解，以及單數 (It's) 與複數 (They're) 的空間介系詞問答！";
    if (typeof window.setRpgSpeaker === "function") window.setRpgSpeaker("Words & Grammar 🔤", "🔍", null, false);

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
        <span class="text-[10px] sm:text-xs font-bold ${active ? "text-red-900" : "text-amber-200"} truncate w-full text-center">${item.zh}</span>
      `;
      btn.addEventListener("click", () => {
        state.focusedWordId = item.id;
        renderWordsStage(false);
        openVoxelZoomBox(item.id, LESSON_CONFIG.speechRateNormal);
      });
      grid.appendChild(btn);
    });
    zone.appendChild(grid);
    openVoxelZoomBox(state.focusedWordId, autoSpeak ? LESSON_CONFIG.speechRateNormal : null);
    return;
  }

  document.getElementById("voxelZoomBox")?.classList.add("hidden");
  let target;
  if (state.wordsSubMode === "prep") {
    if (state.prepQueueIdx === undefined || state.prepQueueIdx >= LESSON_CONFIG.words.length) {
      state.prepQueueIdx = 0;
    }
    state.gameQueueIdx = state.prepQueueIdx;
    target = LESSON_CONFIG.words[state.prepQueueIdx];
    state.focusedWordId = target.id;
  } else if (state.wordsSubMode === "spell") {
    if (state.spellQueueIdx === undefined || state.spellQueueIdx >= LESSON_CONFIG.words.length) {
      state.spellQueueIdx = 0;
    }
    state.gameQueueIdx = state.spellQueueIdx;
    target = LESSON_CONFIG.words[state.spellQueueIdx];
    state.focusedWordId = target.id;
  } else {
    target = getWordObj(state.focusedWordId) || LESSON_CONFIG.words[0];
  }

  if (state.wordsSubMode === "spell") {
    nametagBox?.classList.add("hidden");
    stepBadge?.classList.remove("hidden");
    slowBtn?.classList.add("hidden");
    speakBtn?.classList.add("hidden");

    state.craftedChunks = new Array(target.chunks.length).fill(null);
    let isSpellChecking = false;
    stepBadge.textContent = `🔤 麥塊合成台拼字挑戰 (${(state.spellQueueIdx || 0) + 1} / 7)`;
    const slotCount = target.chunks.length;
    const slotGuide = target.chunks.map((_, i) => `【方塊 ${i + 1}】`).join(" + ");
    document.getElementById("promptLineA").textContent = `👂 Listen & Craft: ${target.emoji} "${target.zh}"  [ ${slotGuide} ]`;
    document.getElementById("promptLineB").classList.add("hidden");
    document.getElementById("promptSubZh").textContent = `請聽發音，將下方「${slotCount} 個音節磚」依序放入合成槽！`;
    if (typeof window.setRpgSpeaker === "function") window.setRpgSpeaker("", "⚒️", assets[target.thumbKey], false);

    const wrapper = document.createElement("div");
    wrapper.className = "w-full flex items-center justify-between gap-2.5 sm:gap-3.5 bg-black/60 px-3 py-1.5 rounded-2xl border-2 border-amber-400/60";

    const slotsArea = document.createElement("div");
    slotsArea.className = "flex items-center gap-2.5 shrink-0";
    slotsArea.innerHTML = `
      <button id="spellListenTargetBtn" class="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-3 border-amber-300 overflow-hidden shadow-xl shrink-0 group transition hover:scale-105" title="點擊重聽單字發音">
        <img src="${assets[target.thumbKey] || ""}" alt="${target.zh}" class="w-full h-full object-cover" />
        <span class="absolute inset-0 bg-black/35 flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition">🔊</span>
      </button>
      <div>
        <div class="text-xs font-black text-amber-300 mb-0.5">⚒️ 麥塊合成槽 (依序點選填入)：</div>
        <div id="craftingSlotsRow" class="flex items-center gap-1.5 sm:gap-2"></div>
      </div>
    `;
    wrapper.appendChild(slotsArea);

    const poolArea = document.createElement("div");
    poolArea.id = "craftingPoolRow";
    poolArea.className = "flex-1 flex items-center justify-center gap-1.5 sm:gap-2 flex-nowrap";

    const btnCol = document.createElement("div");
    btnCol.className = "flex flex-col gap-1.5 shrink-0";

    const hintBtn = document.createElement("button");
    hintBtn.id = "spellHintBtn";
    hintBtn.className = "h-[32px] sm:h-[36px] px-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs mc-btn flex items-center justify-center gap-1 shadow-md";
    hintBtn.innerHTML = "💡 視覺提示";
    hintBtn.title = "在 3D 木屋閃示目標物件 1 秒鐘";
    hintBtn.addEventListener("click", () => triggerFlashHint(target));

    const clearBtn = document.createElement("button");
    clearBtn.className = "h-[32px] sm:h-[36px] px-2.5 rounded-lg bg-rose-900/85 hover:bg-rose-800 text-rose-100 font-black text-xs mc-btn flex items-center justify-center gap-1";
    clearBtn.innerHTML = "🔄 清空";
    clearBtn.addEventListener("click", () => {
      if (state.isAdvancingQuiz || isSpellChecking) return;
      playSfx("click");
      if (window.Analytics && target) window.Analytics.track("spell_clear", { stage: "words", target_id: target.id });
      for (let i = 0; i < state.craftedChunks.length; i++) {
        const entry = state.craftedChunks[i];
        if (entry && !entry.locked) {
          state.craftedChunks[i] = null;
          if (poolButtons[entry.poolIndex]) {
            poolButtons[entry.poolIndex].disabled = false;
            poolButtons[entry.poolIndex].classList.remove("opacity-30", "pointer-events-none");
          }
        }
      }
      refreshCraftingSlotsUI();
    });

    btnCol.appendChild(hintBtn);
    btnCol.appendChild(clearBtn);

    wrapper.appendChild(poolArea);
    wrapper.appendChild(btnCol);
    zone.appendChild(wrapper);

    document.getElementById("spellListenTargetBtn")?.addEventListener("click", () => {
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
          if (entry.locked || (validationStates && validationStates[slotIdx] === true)) {
            colorClasses = "bg-emerald-600 text-white border-4 border-lime-300 shadow-[0_0_15px_rgba(74,222,128,0.8)] cursor-default";
          } else if (validationStates && validationStates[slotIdx] === false) {
            colorClasses = "bg-rose-600 text-white border-4 border-red-300 shadow-[0_0_15px_rgba(244,63,94,0.8)]";
          } else {
            colorClasses = "bg-amber-400 hover:bg-amber-300 text-red-950 border-4 border-yellow-200 shadow cursor-pointer";
          }
        }

        slotBtn.className = `px-2 h-[56px] sm:h-[64px] min-w-[58px] sm:min-w-[70px] rounded-xl flex flex-col items-center justify-center font-black text-base sm:text-xl transition-all ${colorClasses}`;
        
        if (entry) {
          if (entry.locked) {
            slotBtn.innerHTML = `
              <span>${entry.text}</span>
              <span class="text-[10px] text-lime-200 font-bold">✓ 正確</span>
            `;
            slotBtn.title = "位置正確，已為您保留在格子中";
          } else {
            slotBtn.innerHTML = `
              <span>${entry.text}</span>
              <span class="text-[10px] text-red-950/70 font-bold">✕ 退回</span>
            `;
            slotBtn.title = "點擊退回這個音節方塊";
            slotBtn.addEventListener("click", () => {
              if (state.isAdvancingQuiz || isSpellChecking) return;
              playSfx("click");
              state.craftedChunks[slotIdx] = null;
              if (poolButtons[entry.poolIndex]) {
                poolButtons[entry.poolIndex].disabled = false;
                poolButtons[entry.poolIndex].classList.remove("opacity-30", "pointer-events-none");
              }
              refreshCraftingSlotsUI();
            });
          }
        } else {
          slotBtn.innerHTML = `<span class="opacity-30 text-2xl">?</span>`;
        }
        slotsRow.appendChild(slotBtn);
      });
    }

    shuffledPool.forEach((chunkObj, poolIdx) => {
      const cBtn = document.createElement("button");
      cBtn.className = "h-[56px] sm:h-[64px] px-3.5 sm:px-4.5 rounded-xl bg-[#38261a] hover:bg-[#4e3626] border-3 border-amber-300 text-white font-black text-lg sm:text-2xl mc-btn shadow-md transition active:scale-95 shrink-0 whitespace-nowrap";
      cBtn.textContent = chunkObj.text;
      poolButtons.push(cBtn);

      cBtn.addEventListener("click", () => {
        if (state.isAdvancingQuiz || isSpellChecking) return;
        const firstEmptySlotIdx = state.craftedChunks.findIndex(x => x === null);
        if (firstEmptySlotIdx === -1) return;

        playSfx("drop");
        state.craftedChunks[firstEmptySlotIdx] = { text: chunkObj.text, poolIndex: poolIdx, locked: false };
        cBtn.disabled = true;
        cBtn.classList.add("opacity-30", "pointer-events-none");
        refreshCraftingSlotsUI();

        const isAllFilled = state.craftedChunks.every(x => x !== null);
        if (isAllFilled) {
          const validationStates = state.craftedChunks.map((item, i) => item && item.text === target.chunks[i]);
          const isAllCorrect = validationStates.every(v => v === true);

          if (window.Analytics) window.Analytics.track("quiz_attempt", { stage: "words", target_id: target.id, is_correct: !!isAllCorrect, detail: { quiz_type: "spell" } });
          if (isAllCorrect) {
            state.craftedChunks.forEach(item => { if (item) item.locked = true; });
            refreshCraftingSlotsUI(validationStates);
            handleQuizSuccess(target, "words");
          } else {
            isSpellChecking = true;
            const checkToken = state.quizSessionToken;
            refreshCraftingSlotsUI(validationStates);
            playSfx("oops");
            showToast("答錯囉！請再作答一次！", "💡", false);

            setTimeout(() => {
              isSpellChecking = false;
              if (checkToken !== state.quizSessionToken || state.stage !== "words" || state.wordsSubMode !== "spell") return;
              for (let i = 0; i < target.chunks.length; i++) {
                if (validationStates[i] === true) {
                  if (state.craftedChunks[i]) state.craftedChunks[i].locked = true;
                } else {
                  const wrongItem = state.craftedChunks[i];
                  state.craftedChunks[i] = null;
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
    if (autoSpeak) {
      const speakToken = state.quizSessionToken;
      setTimeout(() => {
        if (speakToken === state.quizSessionToken && state.stage === "words" && state.wordsSubMode === "spell") {
          speakText(target.word, LESSON_CONFIG.speechRateNormal);
        }
      }, 250);
    }
  } else if (state.wordsSubMode === "prep") {
    nametagBox?.classList.add("hidden");
    stepBadge?.classList.remove("hidden");
    slowBtn?.classList.remove("hidden");
    speakBtn?.classList.remove("hidden");

    stepBadge.textContent = `📍 空間位置問答挑戰 (${(state.prepQueueIdx || 0) + 1} / 7)`;
    document.getElementById("promptLineA").textContent = `${target.qaQ}`;
    document.getElementById("promptLineB").classList.remove("hidden");
    document.getElementById("promptLineB").innerHTML = target.qaAHtml.replace(/<span[^>]*>[^<]+<\/span>/, "<span class='text-yellow-300 underline font-black px-2 bg-black/40 rounded'>[ ? ]</span>");
    document.getElementById("promptSubZh").textContent = `觀察 3D 木屋畫面：「${target.zh} (${target.word})」在哪裡？請選擇正確的空間介系詞！`;
    if (typeof window.setRpgSpeaker === "function") window.setRpgSpeaker("", "📍", assets[target.thumbKey], false);

    const ALL_PREPOSITIONS = [
      { prep: "by", icon: "◀️", zh: "在…旁邊 (by)" },
      { prep: "around", icon: "🔄", zh: "圍繞在…周圍 (around)" },
      { prep: "on", icon: "🔼", zh: "在…上面 (on)" },
      { prep: "on the top of", icon: "⭐", zh: "在…頂端 (on the top of)" },
      { prep: "above", icon: "⬆️", zh: "在…上方 (above)" },
      { prep: "under", icon: "🔽", zh: "在…下方 (under)" },
      { prep: "in", icon: "📍", zh: "在…裡面 (in)" },
      { prep: "in front of", icon: "🧍", zh: "在…正前方 (in front of)" }
    ];

    const correctPrepObj = ALL_PREPOSITIONS.find(p => p.prep === target.prep) || {
      prep: target.prep,
      icon: "📍",
      zh: target.prepZh || target.prep
    };

    const conflictMap = {
      "on": ["on the top of"],
      "on the top of": ["on"],
      "above": ["on"],
      "in": ["in front of", "on"],
      "in front of": ["in"]
    };
    const excludedPreps = conflictMap[target.prep] || [];
    const distractors = ALL_PREPOSITIONS.filter(p => p.prep !== target.prep && !excludedPreps.includes(p.prep));
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
        if (state.isAdvancingQuiz) return;
        if (window.Analytics) window.Analytics.track("quiz_attempt", { stage: "words", target_id: target.id, is_correct: opt.prep === target.prep, detail: { quiz_type: "prep", chosen: opt.prep } });
        if (opt.prep === target.prep) {
          handleQuizSuccess(target, "words");
        } else {
          playSfx("oops");
          btn.classList.add("opacity-45", "border-rose-400");
          speakText(`Try again! ${target.qaQ}`, LESSON_CONFIG.speechRateSlow);
          showToast(`再觀察一下黃色箭頭指的位置喔！(${target.zh})`, "👀", false);
        }
      });
      grid.appendChild(btn);
    });
    zone.appendChild(grid);
    updateSceneAndStars();
    if (autoSpeak) {
      const speakToken = state.quizSessionToken;
      setTimeout(() => {
        if (speakToken === state.quizSessionToken && state.stage === "words" && state.wordsSubMode === "prep") {
          speakText(target.qaQ, LESSON_CONFIG.speechRateNormal);
        }
      }, 250);
    }
  }
}


window.renderSpellStageCompleteButton = function() {
  const zone = document.getElementById("wordsInteractiveZone");
  if (!zone) return;
  zone.innerHTML = `
    <div class="w-full flex flex-col items-center justify-center p-3.5 sm:p-4 bg-black/80 rounded-2xl border-4 border-lime-400 text-center gap-2 animate-fade-in max-w-2xl mx-auto shadow-2xl my-1">
      <div class="text-lg sm:text-2xl font-black text-amber-300">🎉 太棒了！【麥塊音節拼字台】7 題全數過關！</div>
      <div class="text-xs sm:text-sm text-white/90">7 個聖誕方塊已全部拼字完成！請選擇下一步：</div>
      <div class="flex items-center gap-2.5 sm:gap-3 mt-1 flex-wrap justify-center">
        <button id="btnSpellCompleteReplay" class="px-4 py-2 rounded-2xl bg-[#38261a] hover:bg-[#4e3626] border-2 border-amber-300 text-amber-200 font-black text-xs sm:text-base mc-btn shadow-xl flex items-center justify-center gap-1.5 transition hover:scale-105 active:scale-95">
          <span>🔄</span> <span>再玩一次</span>
        </button>
        <button id="btnSpellCompleteBackHome" class="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 border-2 border-yellow-200 text-slate-950 font-black text-xs sm:text-base mc-btn shadow-xl flex items-center justify-center gap-1.5 transition hover:scale-105 active:scale-95">
          <span>🏠</span> <span>返回主畫面</span>
        </button>
        <button id="btnSpellCompleteNextPrep" class="px-5 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 border-2 border-lime-300 text-white font-black text-xs sm:text-base mc-btn shadow-xl flex items-center justify-center gap-1.5 animate-bounce">
          <span>📍</span> <span>下一關：空間介系詞問答</span> <span>▶</span>
        </button>
      </div>
    </div>
  `;
  document.getElementById("btnSpellCompleteReplay")?.addEventListener("click", () => {
    if (typeof playSfx === "function") playSfx("click");
    state.spellUnlockedIds.clear();
    state.spellQueueIdx = 0;
    state.gameQueueIdx = 0;
    state.wordsSubMode = "spell";
    renderWordsStage(true);
  });
  document.getElementById("btnSpellCompleteBackHome")?.addEventListener("click", () => {
    if (typeof playSfx === "function") playSfx("click");
    if (typeof returnToHomeScreen === "function") returnToHomeScreen();
  });
  document.getElementById("btnSpellCompleteNextPrep")?.addEventListener("click", () => {
    if (typeof playSfx === "function") playSfx("portal");
    state.spellQueueIdx = 0;
    state.wordsSubMode = "prep";
    state.prepQueueIdx = 0;
    state.gameQueueIdx = 0;
    state.focusedWordId = LESSON_CONFIG.words[0].id;
    renderWordsStage(true);
  });
};

window.renderWordsStageCompleteButton = function() {
  const zone = document.getElementById("wordsInteractiveZone");
  if (!zone) return;
  zone.innerHTML = `
    <div class="w-full flex flex-col items-center justify-center p-4 sm:p-5 bg-black/80 rounded-2xl border-4 border-lime-400 text-center gap-2.5 animate-fade-in max-w-xl mx-auto shadow-2xl my-1">
      <div class="text-xl sm:text-2xl font-black text-amber-300">🎉 太棒了！【單字拼字與句型】已全數完成！</div>
      <div class="text-xs sm:text-sm text-white/90">7 個聖誕方塊已全部成功安放於木屋中！</div>
      <div class="flex items-center gap-3 mt-1 flex-wrap justify-center">
        <button id="btnCompleteLearningBackHome" class="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 border-2 border-yellow-200 text-slate-950 font-black text-sm sm:text-base mc-btn shadow-xl flex items-center justify-center gap-1.5 transition hover:scale-105 active:scale-95" title="返回主畫面選擇其他單元">
          <span>🏠</span> <span>返回主畫面</span>
        </button>
        <button id="btnCompleteLearningNextStage" class="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 border-2 border-lime-300 text-white font-black text-sm sm:text-base mc-btn shadow-xl flex items-center justify-center gap-1.5 animate-bounce" title="前往下一單元：國際聖誕文化">
          <span>🌲</span> <span>完成學習·下一關</span> <span>▶</span>
        </button>
      </div>
    </div>
  `;
  document.getElementById("btnCompleteLearningBackHome")?.addEventListener("click", () => {
    if (typeof playSfx === "function") playSfx("click");
    if (typeof returnToHomeScreen === "function") returnToHomeScreen();
  });
  document.getElementById("btnCompleteLearningNextStage")?.addEventListener("click", () => {
    if (typeof playSfx === "function") playSfx("portal");
    if (typeof switchStage === "function") switchStage("culture");
  });
};