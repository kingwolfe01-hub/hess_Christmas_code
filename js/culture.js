/* =========================================================================
   🎄 3D 麥塊聖誕冒險教室 (Minecraft Christmas 3D) - 國際文化模組 (culture.js)
   - 階段 3：World Culture 7 國聖誕文化與台灣比較專區
   - 7 國文化探索放大版大看板 (#cultureCompareBoard)
   - 國際文化搶答挑戰 (含過關結算畫面與音檔同步)
   ========================================================================= */

function openCultureCompareBoard(wordId, autoSpeakRate = null) {
  state.focusedWordId = wordId;
  const item = getWordObj(wordId);
  const assets = new Proxy({}, { get: (_, k) => getAsset(k) });

  document.getElementById("voxelZoomBox")?.classList.add("hidden");
  const board = document.getElementById("cultureCompareBoard");
  if (!board) return;
  board.style.removeProperty("left");
  board.style.removeProperty("top");
  board.style.removeProperty("right");
  board.style.removeProperty("bottom");
  board.style.removeProperty("transform");

  document.getElementById("cultureBoardTitle").textContent = item.culture.title;
  document.getElementById("cultureBoardThumb").src = assets[item.thumbKey] || "";
  document.getElementById("cultureBoardEnSentence").textContent = `"${item.culture.enSentence}"`;
  document.getElementById("cultureBoardForeignText").textContent = item.culture.foreignFact;
  document.getElementById("cultureBoardTaiwanText").textContent = item.culture.taiwanCompare;

  board.classList.remove("hidden");
  updateSceneAndStars();

  if (autoSpeakRate !== null) {
    speakText(item.culture.enSentence, autoSpeakRate);
  }
}

function renderCultureStage(autoSpeak = false) {
  document.getElementById("storySceneImgWrapper")?.classList.add("hidden");
  document.getElementById("fireplaceSvg")?.classList.remove("hidden");
  document.getElementById("voxelZoomBox")?.classList.add("hidden");

  const isExplore = state.cultureSubMode === "explore";
  const exploreBtn = document.getElementById("cultureSubModeExploreBtn");
  const quizBtn = document.getElementById("cultureSubModeQuizBtn");

  if (exploreBtn) {
    exploreBtn.className = isExplore
      ? "h-[44px] px-3 rounded-xl font-black text-xs sm:text-base mc-btn flex items-center justify-center gap-1.5 bg-amber-400 text-red-950 ring-2 ring-yellow-200"
      : "h-[44px] px-3 rounded-xl font-black text-xs sm:text-base mc-btn flex items-center justify-center gap-1.5 bg-[#38261a] text-amber-200 hover:bg-[#4e3626]";
  }
  if (quizBtn) {
    quizBtn.className = !isExplore
      ? "h-[44px] px-3 rounded-xl font-black text-xs sm:text-base mc-btn flex items-center justify-center gap-1.5 bg-amber-400 text-red-950 ring-2 ring-yellow-200"
      : "h-[44px] px-3 rounded-xl font-black text-xs sm:text-base mc-btn flex items-center justify-center gap-1.5 bg-[#38261a] text-amber-200 hover:bg-[#4e3626]";
  }

  const zone = document.getElementById("cultureInteractiveZone");
  zone.innerHTML = "";
  const assets = new Proxy({}, { get: (_, k) => getAsset(k) });

  const nametagBox = document.getElementById("promptNametagBox");
  const stepBadge = document.getElementById("promptStepBadge");
  const slowBtn = document.getElementById("bannerSpeakSlowBtn");
  const speakBtn = document.getElementById("bannerSpeakBtn");

  if (isExplore) {
    // 依紅線標記：刪除左側標籤與右側重複的「慢速」「朗讀」按鈕
    nametagBox?.classList.add("hidden");
    stepBadge?.classList.remove("hidden");
    slowBtn?.classList.add("hidden");
    speakBtn?.classList.add("hidden");

    stepBadge.textContent = "🌍 World Culture · 7 國聖誕習俗與台灣在地比較";
    document.getElementById("promptLineA").textContent = "Explore 7 Countries! Compare World Traditions with Taiwan!";
    document.getElementById("promptLineB").classList.add("hidden");
    document.getElementById("promptSubZh").textContent = "點選下方 7 個國家的聖誕方塊，對照「外國傳統」與「台灣在地生活差異」！";
    if (typeof window.setRpgSpeaker === "function") window.setRpgSpeaker("", "🌍", null, false);

    const grid = document.createElement("div");
    grid.className = "w-full grid grid-cols-7 gap-1.5 sm:gap-2.5";
    LESSON_CONFIG.words.forEach(item => {
      const active = state.focusedWordId === item.id;
      const btn = document.createElement("button");
      btn.className = `h-[124px] sm:h-[134px] rounded-2xl p-2 flex flex-col items-center justify-between transition mc-btn relative ${
        active
          ? "bg-amber-400 text-red-950 ring-4 ring-yellow-200 scale-[1.03]"
          : "bg-[#38261a] hover:bg-[#4e3626] text-white"
      }`;
      btn.innerHTML = `
        <img src="${assets[item.thumbKey] || ""}" alt="${item.word}" class="w-13 h-13 sm:w-15 sm:h-15 rounded-xl object-cover border-2 ${active ? "border-red-950" : "border-amber-300/70"} shadow mt-1" />
        <span class="text-sm sm:text-base font-black leading-none truncate w-full text-center">${item.culture.country.split(" ")[0]}</span>
        <span class="text-[11px] sm:text-xs font-bold ${active ? "text-red-900" : "text-sky-300"} truncate w-full text-center">${item.word}</span>
      `;
      btn.addEventListener("click", () => {
        state.focusedWordId = item.id;
        renderCultureStage(false);
        openCultureCompareBoard(item.id, LESSON_CONFIG.speechRateNormal);
      });
      grid.appendChild(btn);
    });
    zone.appendChild(grid);
    openCultureCompareBoard(state.focusedWordId, autoSpeak ? LESSON_CONFIG.speechRateNormal : null);
  } else {
    // 國際文化搶答挑戰：刪除左側 Steve & Alex 標籤，保留題號與朗讀按鈕
    nametagBox?.classList.add("hidden");
    stepBadge?.classList.remove("hidden");
    slowBtn?.classList.remove("hidden");
    speakBtn?.classList.remove("hidden");

    document.getElementById("cultureCompareBoard")?.classList.add("hidden");
    if (state.cultureQueueIdx === undefined || state.cultureQueueIdx >= LESSON_CONFIG.words.length) {
      state.cultureQueueIdx = 0;
    }
    state.gameQueueIdx = state.cultureQueueIdx;
    const target = LESSON_CONFIG.words[state.cultureQueueIdx];
    state.focusedWordId = target.id;
    if (typeof window.setRpgSpeaker === "function") window.setRpgSpeaker("", "🎯", assets[target.thumbKey], false);

    stepBadge.textContent = `🎯 國際文化搶答 (${state.cultureQueueIdx + 1} / 7) · ${target.culture.country}`;
    document.getElementById("promptLineA").textContent = target.culture.quizQEn;
    document.getElementById("promptLineB").classList.add("hidden");
    document.getElementById("promptSubZh").textContent = target.culture.quizQZh;

    const distractors = LESSON_CONFIG.words.filter(w => w.id !== target.id);
    const shift = (state.gameQueueIdx * 2 + 1) % distractors.length;
    const choices = [
      target,
      distractors[shift % distractors.length],
      distractors[(shift + 2) % distractors.length]
    ];
    const rot = (state.gameQueueIdx + 1) % choices.length;
    const rotated = choices.slice(rot).concat(choices.slice(0, rot));

    const grid = document.createElement("div");
    grid.className = "w-full grid grid-cols-3 gap-3 sm:gap-4";
    rotated.forEach(choice => {
      const displayWord = choice.culture.quizOptionWord || choice.word;
      const btn = document.createElement("button");
      btn.className = "h-[120px] sm:h-[130px] rounded-2xl bg-[#38261a] hover:bg-[#4e3626] border-4 border-amber-300/80 px-3 py-2 flex items-center justify-center gap-3 mc-btn shadow-xl";
      btn.innerHTML = `
        <img src="${assets[choice.thumbKey] || ""}" alt="${displayWord}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-amber-300 shrink-0" />
        <div class="text-left min-w-0">
          <div class="text-xl sm:text-2xl font-black text-white leading-tight my-0.5 truncate">${displayWord}</div>
          <div class="text-xs sm:text-sm font-bold text-amber-300 truncate">${choice.emoji} ${choice.zh}</div>
        </div>
      `;
      btn.addEventListener("click", () => {
        if (state.isAdvancingQuiz) return;
        if (choice.id === target.id) {
          handleQuizSuccess(target, "culture");
        } else {
          playSfx("oops");
          btn.classList.add("opacity-45", "border-rose-400");
          speakText("Try again!", LESSON_CONFIG.speechRateSlow);
          showToast(`再想一下喔！提示：${target.culture.country}`, "🌍", false);
        }
      });
      grid.appendChild(btn);
    });
    zone.appendChild(grid);
    updateSceneAndStars();
    if (autoSpeak && target.culture && target.culture.quizQEn) {
      speakText(target.culture.quizQEn, LESSON_CONFIG.speechRateNormal);
    }
  }
}

window.renderCultureStageCompleteButton = function() {
  const zone = document.getElementById("cultureInteractiveZone");
  if (!zone) return;
  zone.innerHTML = `
    <div class="w-full flex flex-col items-center justify-center p-4 sm:p-5 bg-black/80 rounded-2xl border-4 border-lime-400 text-center gap-2.5 animate-fade-in max-w-xl mx-auto shadow-2xl my-1">
      <div class="text-xl sm:text-2xl font-black text-amber-300">🎉 太棒了！【國際聖誕文化】已全數完成！</div>
      <div class="text-xs sm:text-sm text-white/90">7 個國家的聖誕文化挑戰已全部過關！</div>
      <div class="flex items-center gap-3 mt-1 flex-wrap justify-center">
        <button id="btnCultureCompleteBackHome" class="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 border-2 border-yellow-200 text-slate-950 font-black text-sm sm:text-base mc-btn shadow-xl flex items-center justify-center gap-1.5 transition hover:scale-105 active:scale-95" title="返回主畫面選擇其他單元">
          <span>🏠</span> <span>返回主畫面</span>
        </button>
        <button id="btnCultureCompleteNextStage" class="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 border-2 border-lime-300 text-white font-black text-sm sm:text-base mc-btn shadow-xl flex items-center justify-center gap-1.5 animate-bounce" title="前往下一單元：五國祝福與大PK">
          <span>🎉</span> <span>完成學習·下一關</span> <span>▶</span>
        </button>
      </div>
    </div>
  `;
  document.getElementById("btnCultureCompleteBackHome")?.addEventListener("click", () => {
    if (typeof playSfx === "function") playSfx("click");
    if (typeof returnToHomeScreen === "function") returnToHomeScreen();
  });
  document.getElementById("btnCultureCompleteNextStage")?.addEventListener("click", () => {
    if (typeof playSfx === "function") playSfx("portal");
    if (typeof switchStage === "function") switchStage("party");
  });
};
