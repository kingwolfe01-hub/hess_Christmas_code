/* =========================================================================
   🎄 3D 麥塊聖誕冒險教室 (Minecraft Christmas 3D) - 國際文化模組 (culture.js)
   - 階段 3：World Culture 7 國聖誕文化與台灣比較專區
   - 7 國文化探索寬幅大看板 (#cultureCompareBoard)
   - 外國傳統由來與台灣在地生活對照
   - 國際文化搶答挑戰 (無洩題發音、純單字選項)
   ========================================================================= */

function openCultureCompareBoard(wordId, autoSpeakRate = null) {
  state.focusedWordId = wordId;
  const item = getWordObj(wordId);
  const assets = new Proxy({}, { get: (_, k) => getAsset(k) });

  document.getElementById("voxelZoomBox")?.classList.add("hidden");
  const board = document.getElementById("cultureCompareBoard");
  if (!board) return;

  document.getElementById("cultureBoardFlag").textContent = item.culture.flag;
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
      ? "py-3 px-3 rounded-xl font-black text-xs sm:text-base mc-btn flex items-center justify-center gap-1.5 bg-amber-400 text-red-950 ring-2 ring-yellow-200"
      : "py-3 px-3 rounded-xl font-black text-xs sm:text-base mc-btn flex items-center justify-center gap-1.5 bg-[#38261a] text-amber-200 hover:bg-[#4e3626]";
  }
  if (quizBtn) {
    quizBtn.className = !isExplore
      ? "py-3 px-3 rounded-xl font-black text-xs sm:text-base mc-btn flex items-center justify-center gap-1.5 bg-amber-400 text-red-950 ring-2 ring-yellow-200"
      : "py-3 px-3 rounded-xl font-black text-xs sm:text-base mc-btn flex items-center justify-center gap-1.5 bg-[#38261a] text-amber-200 hover:bg-[#4e3626]";
  }

  const zone = document.getElementById("cultureInteractiveZone");
  zone.innerHTML = "";
  const assets = new Proxy({}, { get: (_, k) => getAsset(k) });

  if (isExplore) {
    document.getElementById("promptStepBadge").textContent = "🌍 World Culture · 7 國聖誕習俗與台灣在地比較";
    document.getElementById("promptLineA").textContent = "Explore 7 Countries! Compare World Traditions with Taiwan!";
    document.getElementById("promptLineB").classList.add("hidden");
    document.getElementById("promptSubZh").textContent = "點選下方 7 個國家的聖誕方塊，對照「外國傳統由來」與「台灣在地生活差異」！";

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
        <span class="text-xl sm:text-2xl leading-none">${item.culture.flag}</span>
        <img src="${assets[item.thumbKey] || ""}" alt="${item.word}" class="w-11 h-11 sm:w-13 sm:h-13 rounded-xl object-cover border-2 ${active ? "border-red-950" : "border-amber-300/70"} shadow" />
        <span class="text-xs sm:text-sm font-black leading-none truncate w-full text-center">${item.culture.country.split(" ")[0]}</span>
        <span class="text-[11px] font-bold ${active ? "text-red-900" : "text-sky-300"} truncate w-full text-center">${item.word}</span>
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
    document.getElementById("cultureCompareBoard")?.classList.add("hidden");
    const remainingIdx = LESSON_CONFIG.words.findIndex(w => !state.unlockedIds.has(w.id));
    if (remainingIdx === -1) {
      state.unlockedIds.clear();
      state.gameQueueIdx = 0;
    } else {
      state.gameQueueIdx = remainingIdx;
    }
    const target = LESSON_CONFIG.words[state.gameQueueIdx];

    document.getElementById("promptStepBadge").textContent = `🎯 國際文化搶答 (${state.unlockedIds.size + 1} / 7) · ${target.culture.country}`;
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
      const btn = document.createElement("button");
      btn.className = "h-[115px] sm:h-[125px] rounded-2xl bg-[#38261a] hover:bg-[#4e3626] border-4 border-amber-300/80 px-3 py-2 flex items-center justify-center gap-3 mc-btn shadow-xl";
      btn.innerHTML = `
        <img src="${assets[choice.thumbKey] || ""}" alt="${choice.word}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-amber-300 shrink-0" />
        <div class="text-left min-w-0">
          <div class="text-xl sm:text-3xl font-black text-white leading-tight my-0.5 truncate">${choice.word}</div>
          <div class="text-xs sm:text-sm font-bold text-amber-300 truncate">${choice.emoji} ${choice.zh}</div>
        </div>
      `;
      btn.addEventListener("click", () => {
        if (choice.id === target.id) {
          handleQuizSuccess(target, "culture");
        } else {
          playSfx("oops");
          btn.classList.add("opacity-45", "border-rose-400");
          speakText("Try again!", LESSON_CONFIG.speechRateSlow);
          showToast(`再想一下喔！提示：${target.culture.country} · ${target.zh}`, "🌍", false);
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
