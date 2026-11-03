/* =========================================================================
   🎄 3D 麥塊聖誕冒險教室 (Minecraft Christmas 3D) - 主控調度模組 (app.js)
   - 全域狀態管理 (State)
   - 3D 麥塊木屋 SVG 場景初始化與星星進度列
   - 全景雪花與慶祝粒子畫布 (Canvas)
   - 全螢幕切換與自由拖曳自適應系統
   ========================================================================= */

const state = window.state = {
  stage: "story",
  storyStepIdx: 0,
  cabinFireplaceLit: false,
  focusedWordId: "tree",
  wordsSubMode: "learn",
  cultureSubMode: "explore",
  unlockedIds: new Set(),
  gameQueueIdx: 0,
  craftedChunks: [],
  scoreRed: 0,
  scoreGreen: 0,
  soundOn: true,
  playingMusic: false,
  heavySnow: false
};

function getAsset(key) {
  if (typeof window !== "undefined" && window.VOXEL_MASTER_ASSETS && window.VOXEL_MASTER_ASSETS[key]) {
    return window.VOXEL_MASTER_ASSETS[key];
  }
  if (typeof window !== "undefined" && window.ASSET_MANIFEST && window.ASSET_MANIFEST[key]) {
    return window.ASSET_MANIFEST[key];
  }
  return "";
}

function closeAllOverlays() {
  document.getElementById("voxelZoomBox")?.classList.add("hidden");
  document.getElementById("cultureCompareBoard")?.classList.add("hidden");
  document.getElementById("storyActionModal")?.classList.add("hidden");
  const hintBox = document.getElementById("flashHintBox");
  if (hintBox) {
    hintBox.classList.add("hidden");
    hintBox.classList.remove("flash-hint-active");
  }
}

function initSvgScene() {
  const assets = new Proxy({}, { get: (_, k) => getAsset(k) });
  const baseCabinEl = document.getElementById("svgBaseCabin");
  if (baseCabinEl && assets.cabin_base) {
    baseCabinEl.setAttribute("href", assets.cabin_base);
  }

  const layersGroup = document.getElementById("svgLayersGroup");
  const hotspotsGroup = document.getElementById("svgHotspotsGroup");
  layersGroup.innerHTML = "";
  hotspotsGroup.innerHTML = "";

  LESSON_CONFIG.words.forEach(item => {
    const gLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gLayer.setAttribute("id", `voxel-layer-${item.id}`);
    gLayer.setAttribute("class", "voxel-locked");

    const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
    img.setAttribute("href", assets[item.layerKey] || "");
    img.setAttribute("x", item.layerRect?.x ?? 0);
    img.setAttribute("y", item.layerRect?.y ?? 0);
    img.setAttribute("width", item.layerRect?.w ?? 0);
    img.setAttribute("height", item.layerRect?.h ?? 0);
    img.setAttribute("preserveAspectRatio", "none");
    gLayer.appendChild(img);

    if (item.id === "star") {
      const glow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      glow.setAttribute("cx", "418");
      glow.setAttribute("cy", "102");
      glow.setAttribute("r", "82");
      glow.setAttribute("fill", "url(#starGlowGrad)");
      gLayer.appendChild(glow);
    }
    layersGroup.appendChild(gLayer);

    const gHs = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gHs.setAttribute("id", `scene-hs-${item.id}`);
    gHs.setAttribute("class", "scene-hotspot");
    gHs.setAttribute("data-word-id", item.id);

    const hitRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    hitRect.setAttribute("x", item.hotspotRect?.x ?? 0);
    hitRect.setAttribute("y", item.hotspotRect?.y ?? 0);
    hitRect.setAttribute("width", item.hotspotRect?.w ?? 0);
    hitRect.setAttribute("height", item.hotspotRect?.h ?? 0);
    hitRect.setAttribute("rx", "12");
    hitRect.setAttribute("fill", "transparent");

    const borderRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    borderRect.setAttribute("x", item.hotspotRect?.x ?? 0);
    borderRect.setAttribute("y", item.hotspotRect?.y ?? 0);
    borderRect.setAttribute("width", item.hotspotRect?.w ?? 0);
    borderRect.setAttribute("height", item.hotspotRect?.h ?? 0);
    borderRect.setAttribute("rx", "12");
    borderRect.setAttribute("fill", "none");
    borderRect.setAttribute("stroke", item.color);
    borderRect.setAttribute("stroke-width", "6");
    borderRect.setAttribute("stroke-dasharray", "16 10");
    borderRect.setAttribute("class", "hs-border spotlight-box");

    gHs.appendChild(hitRect);
    gHs.appendChild(borderRect);

    gHs.addEventListener("click", () => {
      const isQuizActive =
        (state.stage === "words" && (state.wordsSubMode === "spell" || state.wordsSubMode === "prep")) ||
        (state.stage === "culture" && state.cultureSubMode === "quiz");

      if (isQuizActive) {
        const currentTarget = LESSON_CONFIG.words[state.gameQueueIdx];
        if (currentTarget && currentTarget.id === item.id) {
          triggerFlashHint(currentTarget);
        }
        return;
      }

      state.focusedWordId = item.id;
      if (state.stage === "culture") {
        openCultureCompareBoard(item.id, null);
      } else {
        openVoxelZoomBox(item.id, null);
      }
    });
    hotspotsGroup.appendChild(gHs);
  });
}

function updateSceneAndStars() {
  const starRow = document.getElementById("starProgressRow");
  if (!starRow) return;
  starRow.innerHTML = "";
  LESSON_CONFIG.words.forEach(item => {
    const unlocked = state.unlockedIds.has(item.id);
    const span = document.createElement("span");
    span.className = `text-sm sm:text-lg transition-transform ${unlocked ? "scale-110" : "opacity-25 grayscale"}`;
    span.textContent = "⭐";
    starRow.appendChild(span);
  });

  const count = state.unlockedIds.size;
  document.getElementById("progressCounterText").textContent = `${count}/7`;
  document.getElementById("teacherUnlockAllText").textContent = count === 7 ? "全部重置" : "一鍵全亮";

  const isQuizActive =
    (state.stage === "words" && (state.wordsSubMode === "spell" || state.wordsSubMode === "prep")) ||
    (state.stage === "culture" && state.cultureSubMode === "quiz");

  LESSON_CONFIG.words.forEach(item => {
    const layerEl = document.getElementById(`voxel-layer-${item.id}`);
    const hsEl = document.getElementById(`scene-hs-${item.id}`);
    if (!layerEl || !hsEl) return;

    const isUnlocked = state.unlockedIds.has(item.id);
    const isCurrentGameTarget = isQuizActive && LESSON_CONFIG.words[state.gameQueueIdx]?.id === item.id;

    const isCultureExplore = (state.stage === "culture" && state.cultureSubMode === "explore");
    const isWordsLearn = (state.stage === "words" && state.wordsSubMode === "learn");
    const isFocusedInExplore = (isCultureExplore || isWordsLearn) && state.focusedWordId === item.id;
    const isParty = (state.stage === "party");

    if (isParty) {
      layerEl.setAttribute("class", "voxel-unlocked");
    } else if (isCultureExplore || isWordsLearn) {
      if (isFocusedInExplore) {
        layerEl.setAttribute("class", "voxel-unlocked");
      } else {
        layerEl.setAttribute("class", "voxel-unlocked voxel-dimmed-bg");
      }
    } else if (isQuizActive) {
      if (isCurrentGameTarget) {
        layerEl.setAttribute("class", isUnlocked ? "voxel-unlocked" : "voxel-preview-ghost");
      } else if (isUnlocked) {
        layerEl.setAttribute("class", "voxel-unlocked voxel-dimmed-bg");
      } else {
        layerEl.setAttribute("class", "voxel-locked");
      }
    } else {
      if (isUnlocked) {
        layerEl.setAttribute("class", "voxel-unlocked");
      } else {
        layerEl.setAttribute("class", "voxel-locked");
      }
    }

    if (isCurrentGameTarget || isFocusedInExplore) {
      hsEl.classList.add("is-focused", "is-active-target");
    } else {
      hsEl.classList.remove("is-focused", "is-active-target");
    }
  });

  const arrowEl = document.getElementById("svgPointerArrow");
  if (state.stage === "story" || isQuizActive) {
    arrowEl?.classList.add("hidden");
  } else {
    const target = getWordObj(state.focusedWordId);
    if (target && target.arrowPos) {
      arrowEl?.setAttribute("transform", `translate(${target.arrowPos.x ?? 0}, ${target.arrowPos.y ?? 0})`);
      arrowEl?.classList.remove("hidden");
    }
  }
}

// 粒子系統 (Snow & Particle Canvas)
const snowParticles = [];
const burstList = [];
let snowCanvasCtx = null;
let snowCanvasEl = null;

function initSnowCanvas() {
  snowCanvasEl = document.getElementById("snowCanvas");
  if (!snowCanvasEl) return;

  const resize = () => {
    const rect = snowCanvasEl.parentElement ? snowCanvasEl.parentElement.getBoundingClientRect() : null;
    snowCanvasEl.width = rect && rect.width ? rect.width : 1280;
    snowCanvasEl.height = rect && rect.height ? rect.height : 720;
  };
  resize();
  window.addEventListener("resize", resize);

  snowCanvasCtx = snowCanvasEl.getContext("2d");

  for (let i = 0; i < 65; i++) {
    snowParticles.push({
      x: Math.random() * 1280,
      y: Math.random() * 720,
      s: Math.floor(Math.random() * 5) + 4,
      vy: Math.random() * 0.95 + 0.4,
      vx: (Math.random() - 0.5) * 0.5,
      phase: Math.random() * Math.PI * 2
    });
  }

  function step() {
    if (!snowCanvasCtx || !snowCanvasEl) return;
    snowCanvasCtx.clearRect(0, 0, snowCanvasEl.width, snowCanvasEl.height);

    const st = window.state || {};
    const isTaiwanSunny = (st.stage === "story" && st.storyStepIdx === 0);
    const count = isTaiwanSunny ? 12 : (st.heavySnow || st.stage === "party" ? snowParticles.length : 26);

    for (let i = 0; i < count; i++) {
      const p = snowParticles[i];
      p.phase += 0.04;
      p.y += p.vy * (st.heavySnow ? 2.5 : 1);
      p.x += p.vx + Math.sin(p.phase) * 0.35;
      if (p.y > snowCanvasEl.height) {
        p.y = -8;
        p.x = Math.random() * snowCanvasEl.width;
      }
      snowCanvasCtx.fillStyle = isTaiwanSunny
        ? "rgba(253, 224, 71, 0.58)"
        : (st.heavySnow ? "rgba(255, 255, 255, 0.92)" : "rgba(255, 255, 255, 0.65)");
      snowCanvasCtx.fillRect(p.x, p.y, p.s, p.s);
    }

    for (let i = burstList.length - 1; i >= 0; i--) {
      const b = burstList[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy += 0.15;
      b.life -= 0.035;
      if (b.life <= 0) {
        burstList.splice(i, 1);
        continue;
      }
      snowCanvasCtx.fillStyle = b.color;
      snowCanvasCtx.globalAlpha = Math.max(0, b.life);
      snowCanvasCtx.fillRect(b.x, b.y, b.size, b.size);
      snowCanvasCtx.globalAlpha = 1.0;
    }

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function triggerBurstParticles(originX, originY, baseColor = "#facc15") {
  const canvas = snowCanvasEl || document.getElementById("snowCanvas");
  if (!canvas) return;

  const cx = originX !== undefined ? originX : canvas.width * 0.5;
  const cy = originY !== undefined ? originY : canvas.height * 0.5;

  const colors = [baseColor, "#38bdf8", "#4ade80", "#ffffff", "#f43f5e"];
  for (let i = 0; i < 35; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5.5 + 2.0;
    burstList.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2.5,
      size: Math.floor(Math.random() * 6) + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1.0
    });
  }
}

function triggerConfetti() {
  playSfx("fanfare");
  playSfx("party_horn");
  const canvas = snowCanvasEl || document.getElementById("snowCanvas");
  if (!canvas) return;

  const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#facc15"];
  for (let i = 0; i < 90; i++) {
    burstList.push({
      x: Math.random() * canvas.width,
      y: canvas.height * 0.2 + Math.random() * 50,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * -6 - 2,
      size: Math.floor(Math.random() * 8) + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1.5
    });
  }
}

function triggerPortalVortex() {
  const canvas = snowCanvasEl || document.getElementById("snowCanvas");
  if (!canvas) return;
  const cx = canvas.width * 0.5;
  const cy = canvas.height * 0.5;
  const colors = ["#a855f7", "#c084fc", "#e879f9", "#38bdf8", "#818cf8", "#ffffff"];
  for (let i = 0; i < 75; i++) {
    const angle = (i / 75) * Math.PI * 2 + Math.random() * 0.2;
    const speed = Math.random() * 4.2 + 2.5;
    burstList.push({
      x: cx + Math.cos(angle) * (20 + Math.random() * 35),
      y: cy + Math.sin(angle) * (20 + Math.random() * 35),
      vx: -Math.sin(angle) * speed + (Math.random() - 0.5),
      vy: Math.cos(angle) * speed + (Math.random() - 0.5),
      size: Math.floor(Math.random() * 7) + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1.3
    });
  }
}

function triggerBlizzardBurst() {
  const canvas = snowCanvasEl || document.getElementById("snowCanvas");
  if (!canvas) return;
  const colors = ["#ffffff", "#f0f9ff", "#e0f2fe", "#bae6fd", "#7dd3fc"];
  for (let i = 0; i < 110; i++) {
    burstList.push({
      x: canvas.width + Math.random() * 120,
      y: Math.random() * canvas.height,
      vx: -(Math.random() * 14 + 8),
      vy: Math.random() * 3.5 + 1.2,
      size: Math.floor(Math.random() * 6) + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1.4
    });
  }
}

function triggerFireplaceSparks() {
  const canvas = snowCanvasEl || document.getElementById("snowCanvas");
  if (!canvas) return;
  const fx = canvas.width * 0.725;
  const fy = canvas.height * 0.73;
  const colors = ["#f97316", "#ef4444", "#fde047", "#fbbf24", "#ea580c"];
  for (let i = 0; i < 55; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
    const speed = Math.random() * 5.2 + 2.2;
    burstList.push({
      x: fx + (Math.random() - 0.5) * 40,
      y: fy + (Math.random() - 0.5) * 20,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 1.5,
      vy: Math.sin(angle) * speed,
      size: Math.floor(Math.random() * 5) + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1.15
    });
  }
}

function triggerChimneySmoke() {
  const canvas = snowCanvasEl || document.getElementById("snowCanvas");
  if (!canvas) return;
  const cx = canvas.width * 0.725;
  const cy = canvas.height * 0.28;
  const colors = ["rgba(203, 213, 225, 0.75)", "rgba(148, 163, 184, 0.65)", "rgba(241, 245, 249, 0.8)"];
  for (let i = 0; i < 35; i++) {
    burstList.push({
      x: cx + (Math.random() - 0.5) * 25,
      y: cy + (Math.random() - 0.5) * 15,
      vx: (Math.random() - 0.2) * 1.6,
      vy: -(Math.random() * 2.8 + 1.2),
      size: Math.floor(Math.random() * 10) + 7,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1.5
    });
  }
}

function showToast(text, emoji, isSuccess) {
  const toast = document.getElementById("gameToastBanner");
  if (!toast) return;
  document.getElementById("gameToastEmoji").textContent = emoji;
  document.getElementById("gameToastText").textContent = text;
  toast.className = `absolute bottom-3 left-1/2 -translate-x-1/2 z-30 px-6 py-2.5 rounded-2xl border-4 font-black text-base sm:text-2xl shadow-2xl flex items-center gap-3 ${
    isSuccess ? "bg-emerald-900/95 border-lime-300 text-lime-100" : "bg-rose-900/95 border-rose-300 text-rose-100"
  }`;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 1850);
}

function handleQuizSuccess(target, sourceStage) {
  state.unlockedIds.add(target.id);
  playSfx("anvil_craft");
  setTimeout(() => playSfx("fanfare"), 160);
  setTimeout(() => playSfx("ding"), 340);
  triggerBurstParticles();

  const layerEl = document.getElementById(`voxel-layer-${target.id}`);
  if (layerEl) {
    layerEl.classList.add("voxel-hint-highlight");
    setTimeout(() => layerEl.classList.remove("voxel-hint-highlight"), 1400);
  }

  if (sourceStage === "culture") {
    (async () => {
      await speakText("Awesome!", LESSON_CONFIG.speechRateNormal);
      await new Promise(r => setTimeout(r, 380));
      await speakText(target.culture.enSentence, LESSON_CONFIG.speechRateNormal);
    })();
  } else {
    (async () => {
      await speakText("Great job!", LESSON_CONFIG.speechRateNormal);
      await new Promise(r => setTimeout(r, 380));
      await speakText(target.word, LESSON_CONFIG.speechRateNormal);
    })();
  }

  showToast(`合成成功！${target.culture.flag} ${target.word} (${target.zh}) 已放進木屋！`, "🌟", true);

  setTimeout(() => {
    if (state.unlockedIds.size === LESSON_CONFIG.words.length) {
      playSfx("fanfare");
      if (sourceStage === "words") {
        switchStage("culture");
      } else {
        switchStage("party");
      }
    } else {
      if (sourceStage === "culture") {
        renderCultureStage(false);
      } else {
        renderWordsStage(false);
      }
    }
  }, 1600);
}

// 全域 RPG 說話者與頭像切換器
window.setRpgSpeaker = function(speakerName, icon = "💬", imgUrl = null, isSpeaking = false) {
  const nameEl = document.getElementById("promptNametagText");
  const iconEl = document.getElementById("promptNametagIcon");
  const avatarBox = document.getElementById("promptAvatarBox");
  const avatarImg = document.getElementById("promptAvatarImg");
  const avatarEmoji = document.getElementById("promptAvatarEmoji");

  if (nameEl) nameEl.textContent = speakerName || "System";
  if (iconEl) iconEl.textContent = icon || "💬";

  if (avatarBox) {
    if (isSpeaking) {
      avatarBox.classList.add("is-speaking");
    } else {
      avatarBox.classList.remove("is-speaking");
    }
  }

  if (avatarImg && avatarEmoji) {
    if (imgUrl) {
      avatarImg.src = imgUrl;
      avatarImg.classList.remove("hidden");
      avatarEmoji.classList.add("hidden");
    } else {
      avatarImg.classList.add("hidden");
      avatarEmoji.classList.remove("hidden");
      avatarEmoji.textContent = icon || "👦";
    }
  }
};

function switchStage(newStage) {
  state.stage = newStage;
  const revealBtn = document.getElementById("bannerRevealAnswerBtn");
  if (revealBtn) revealBtn.classList.add("hidden");
  currentPkAnswerRevealer = null;

  const topPrompt = document.getElementById("topPromptBanner");
  if (topPrompt) {
    topPrompt.style.removeProperty("left");
    topPrompt.style.removeProperty("top");
    topPrompt.style.removeProperty("right");
    topPrompt.style.removeProperty("bottom");
    topPrompt.style.removeProperty("margin");
    topPrompt.style.removeProperty("margin-left");
    topPrompt.style.removeProperty("margin-right");
    topPrompt.style.removeProperty("transform");
    if (newStage === "story") {
      topPrompt.classList.add("rpg-bottom-docked");
      topPrompt.classList.remove("rpg-top-floating");
    } else {
      topPrompt.classList.remove("rpg-bottom-docked");
      topPrompt.classList.add("rpg-top-floating");
    }
  }

  if (newStage !== "party" && fireworkShowInterval) {
    clearInterval(fireworkShowInterval);
    fireworkShowInterval = null;
    const snowBtn = document.getElementById("partySnowBurstBtn");
    if (snowBtn) {
      snowBtn.querySelector("span:first-child").textContent = "❄️ 暴風雪";
      snowBtn.querySelector("span:last-child").textContent = "慶祝煙火";
    }
  }

  closeAllOverlays();
  document.getElementById("topPromptBanner")?.classList.remove("hidden");
  document.getElementById("reopenPromptBannerBtn")?.classList.add("hidden");

  const svgEl = document.getElementById("fireplaceSvg");
  const imgWrapper = document.getElementById("storySceneImgWrapper");
  if (newStage !== "story") {
    imgWrapper?.classList.add("hidden");
    svgEl?.classList.remove("hidden");
  }
  if (svgEl) {
    svgEl.setAttribute("class", `absolute inset-0 w-full h-full block cabin-warm-lit`);
  }
  const fireGlow = document.getElementById("svgFireGlowCircle");
  if (fireGlow) fireGlow.style.opacity = "1";
  const unlitCover = document.getElementById("fireplaceUnlitCover");
  if (unlitCover) unlitCover.style.opacity = "0";

  document.getElementById("bottomDeckStory")?.classList.toggle("hidden", newStage !== "story");
  document.getElementById("bottomDeckWords")?.classList.toggle("hidden", newStage !== "words");
  document.getElementById("bottomDeckCulture")?.classList.toggle("hidden", newStage !== "culture");
  document.getElementById("bottomDeckParty")?.classList.toggle("hidden", newStage !== "party");

  const unitBadge = document.getElementById("currentUnitBadge");
  if (unitBadge) {
    const badges = {
      story: "📖 麥塊極地繪本",
      words: "🔤 單字拼字與句型",
      culture: "🌍 國際聖誕文化",
      party: "🎉 五國祝福與大PK"
    };
    unitBadge.textContent = badges[newStage] || "課堂單元";
  }

  document.querySelectorAll(".stage-nav-btn").forEach(btn => {
    const isCurrent = btn.getAttribute("data-stage") === newStage;
    btn.className = isCurrent
      ? "stage-nav-btn rounded-xl font-black text-xs sm:text-base flex items-center justify-center gap-1.5 transition bg-amber-400 text-red-950 shadow-md scale-[1.02]"
      : "stage-nav-btn rounded-xl font-black text-xs sm:text-base flex items-center justify-center gap-1.5 transition bg-[#38261a] text-amber-200 hover:bg-[#4d3423]";
  });

  const hotspotsGroup = document.getElementById("svgHotspotsGroup");
  if (newStage === "story") {
    if (hotspotsGroup) {
      hotspotsGroup.style.display = "none";
      hotspotsGroup.classList.add("hidden");
    }
    renderStoryStage(false);
  } else if (newStage === "words") {
    if (hotspotsGroup) {
      hotspotsGroup.style.display = "";
      hotspotsGroup.classList.remove("hidden");
    }
    state.heavySnow = false;
    renderWordsStage(false);
  } else if (newStage === "culture") {
    if (hotspotsGroup) {
      hotspotsGroup.style.display = "";
      hotspotsGroup.classList.remove("hidden");
    }
    state.heavySnow = false;
    renderCultureStage(false);
  } else if (newStage === "party") {
    if (hotspotsGroup) {
      hotspotsGroup.style.display = "none";
      hotspotsGroup.classList.add("hidden");
    }
    document.getElementById("storySceneImgWrapper")?.classList.add("hidden");
    LESSON_CONFIG.words.forEach(w => state.unlockedIds.add(w.id));
    document.getElementById("promptStepBadge").textContent = "🎉 Party · 世界聖誕祝福與雙隊 PK 總決賽";
    document.getElementById("promptLineA").textContent = "Merry Christmas Around the World! 🌎🎄";
    document.getElementById("promptLineB").classList.add("hidden");
    document.getElementById("promptSubZh").textContent = "點選下方 5 國祝福語體驗發音，或點擊「🎲 隨機抽題 PK」進行紅石隊 vs. 綠寶石隊總決賽！";
    triggerBurstParticles();
    updateSceneAndStars();
  }
}

// 方案 A 自由拖曳系統
function makeDraggable(panel, handle = null, container = null) {
  if (!panel) return;
  const dragHandle = handle || panel;
  const parentContainer = container || panel.parentElement || document.querySelector("main") || document.body;

  let isDragging = false;
  let startPointerX = 0;
  let startPointerY = 0;
  let startLeft = 0;
  let startTop = 0;

  dragHandle.classList.add("drag-handle");
  panel.classList.add("draggable-panel");

  const onPointerDown = (e) => {
    if (e.target.closest("button") || e.target.closest("input") || e.target.closest("select") || e.target.closest("a")) {
      return;
    }

    isDragging = true;
    panel.classList.add("is-dragging");
    try {
      dragHandle.setPointerCapture(e.pointerId);
    } catch (_) {}

    const panelRect = panel.getBoundingClientRect();
    const containerRect = parentContainer.getBoundingClientRect();

    startPointerX = e.clientX;
    startPointerY = e.clientY;
    startLeft = panelRect.left - containerRect.left;
    startTop = panelRect.top - containerRect.top;

    panel.style.setProperty("transform", "none", "important");
    panel.style.removeProperty("margin-left");
    panel.style.removeProperty("margin-right");
    panel.style.removeProperty("margin");
    panel.style.setProperty("left", `${startLeft}px`, "important");
    panel.style.setProperty("top", `${startTop}px`, "important");
    panel.style.setProperty("right", "auto", "important");
    panel.style.setProperty("bottom", "auto", "important");

    e.preventDefault();
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startPointerX;
    const dy = e.clientY - startPointerY;

    let newLeft = startLeft + dx;
    let newTop = startTop + dy;

    const containerRect = parentContainer.getBoundingClientRect();
    const panelWidth = panel.offsetWidth;
    const panelHeight = panel.offsetHeight;

    const minLeft = 4;
    const maxLeft = Math.max(minLeft, containerRect.width - panelWidth - 8);
    const minTop = 8;
    const maxTop = Math.max(minTop, containerRect.height - panelHeight - 8);

    newLeft = Math.min(Math.max(minLeft, newLeft), maxLeft);
    newTop = Math.min(Math.max(minTop, newTop), maxTop);

    panel.style.setProperty("left", `${newLeft}px`, "important");
    panel.style.setProperty("top", `${newTop}px`, "important");
  };

  const onPointerUp = (e) => {
    if (!isDragging) return;
    isDragging = false;
    panel.classList.remove("is-dragging");
    try {
      dragHandle.releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  dragHandle.addEventListener("pointerdown", onPointerDown);
  dragHandle.addEventListener("pointermove", onPointerMove);
  dragHandle.addEventListener("pointerup", onPointerUp);
  dragHandle.addEventListener("pointercancel", onPointerUp);

  window.addEventListener("pointermove", (e) => {
    if (isDragging) onPointerMove(e);
  });
  window.addEventListener("pointerup", (e) => {
    if (isDragging) onPointerUp(e);
  });

  dragHandle.addEventListener("dblclick", () => {
    panel.style.removeProperty("left");
    panel.style.removeProperty("top");
    panel.style.removeProperty("right");
    panel.style.removeProperty("bottom");
    panel.style.removeProperty("margin");
    playSfx("click");
  });
}

// 全螢幕切換控制引擎
function toggleFullScreen() {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFS = docEl.requestFullscreen || docEl.webkitRequestFullScreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen;
  const exitFS = doc.exitFullscreen || doc.webkitExitFullscreen || doc.mozCancelFullScreen || doc.msExitFullscreen;
  const currentFS = doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement;

  if (!currentFS) {
    if (requestFS) {
      requestFS.call(docEl).catch(err => {
        console.warn("全螢幕請求受限:", err);
        showToast("全螢幕請求受限，可按 F11 切換", "⚠️", false);
      });
    }
  } else {
    if (exitFS) {
      exitFS.call(doc).catch(err => console.warn(err));
    }
  }
}

function updateFullscreenUI() {
  const doc = window.document;
  const isFs = !!(doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement);
  const icon = document.getElementById("fullscreenIcon");
  const text = document.getElementById("fullscreenText");
  const btn = document.getElementById("fullscreenToggleBtn");
  if (icon && text) {
    if (isFs) {
      icon.textContent = "🗗";
      text.textContent = "視窗";
      btn?.classList.replace("border-sky-400/60", "border-amber-400/80");
    } else {
      icon.textContent = "⛶";
      text.textContent = "全螢幕";
      btn?.classList.replace("border-amber-400/80", "border-sky-400/60");
    }
  }
}

["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"].forEach(evt => {
  document.addEventListener(evt, updateFullscreenUI);
});

// DOM 初始化與事件綁定
window.addEventListener("DOMContentLoaded", () => {
  // 監聽 Pad / 手機旋轉與視窗變化
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 200);
  });

  const unlockAudio = () => {
    if (typeof ensureAudioCtx === "function") ensureAudioCtx();
    document.removeEventListener("pointerdown", unlockAudio);
    document.removeEventListener("keydown", unlockAudio);
  };
  document.addEventListener("pointerdown", unlockAudio, { passive: true });
  document.addEventListener("keydown", unlockAudio, { passive: true });

  initSvgScene();
  initSnowCanvas();
  renderPartyGreetings();
  switchStage("story");

  // 首頁四大模組點選與回首頁導航
  window.enterLessonFromHome = function(stageName) {
    if (typeof playSfx === "function") playSfx("portal");
    const home = document.getElementById("homeScreenView");
    if (home) home.classList.add("hidden");
    switchStage(stageName);
    if (stageName === "story") {
      state.storyStepIdx = 0;
      renderStoryStage(false);
    }
  };

  window.returnToHomeScreen = function() {
    if (typeof playSfx === "function") playSfx("click");
    if (typeof stopCurrentSpeech === "function") stopCurrentSpeech();
    const home = document.getElementById("homeScreenView");
    if (home) home.classList.remove("hidden");
    closeAllOverlays();
    if (fireworkShowInterval) {
      clearInterval(fireworkShowInterval);
      fireworkShowInterval = null;
    }
  };

  document.getElementById("btnHomeStory")?.addEventListener("click", () => enterLessonFromHome("story"));
  document.getElementById("btnHomeWords")?.addEventListener("click", () => enterLessonFromHome("words"));
  document.getElementById("btnHomeCulture")?.addEventListener("click", () => enterLessonFromHome("culture"));
  document.getElementById("btnHomeParty")?.addEventListener("click", () => enterLessonFromHome("party"));
  document.getElementById("cardHomeStory")?.addEventListener("click", () => enterLessonFromHome("story"));
  document.getElementById("cardHomeWords")?.addEventListener("click", () => enterLessonFromHome("words"));
  document.getElementById("cardHomeCulture")?.addEventListener("click", () => enterLessonFromHome("culture"));
  document.getElementById("cardHomeParty")?.addEventListener("click", () => enterLessonFromHome("party"));

  document.getElementById("backToHomeBtn")?.addEventListener("click", returnToHomeScreen);

  document.getElementById("homeSoundToggleBtn")?.addEventListener("click", () => {
    if (typeof isBgmMuted === "function" && typeof toggleBgmAudio === "function") {
      toggleBgmAudio();
      const icon = document.getElementById("homeSoundIcon");
      if (icon) icon.textContent = isBgmMuted() ? "🔇" : "🔊";
    }
  });

  document.getElementById("homeFullscreenBtn")?.addEventListener("click", toggleFullScreen);

  document.querySelectorAll(".stage-nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      switchStage(btn.getAttribute("data-stage"));
    });
  });

  document.getElementById("addRedScoreBtn")?.addEventListener("click", () => {
    state.scoreRed++;
    document.getElementById("scoreRedText").textContent = state.scoreRed;
    playSfx("ding");
    triggerBurstParticles();
  });
  document.getElementById("addGreenScoreBtn")?.addEventListener("click", () => {
    state.scoreGreen++;
    document.getElementById("scoreGreenText").textContent = state.scoreGreen;
    playSfx("ding");
    triggerBurstParticles();
  });

  function speakBannerCurrent(rate) {
    if (state.stage === "story") {
      const st = LESSON_CONFIG.storySteps[state.storyStepIdx];
      speakStoryDialogue(st, rate);
    } else if (state.stage === "words") {
      if (state.wordsSubMode === "learn") {
        const cur = getWordObj(state.focusedWordId);
        speakText(cur.qaASpeak, rate);
      } else {
        const target = LESSON_CONFIG.words[state.gameQueueIdx];
        if (!target) return;
        speakText(state.wordsSubMode === "prep" ? target.qaQ : target.word, rate);
      }
    } else if (state.stage === "culture") {
      if (state.cultureSubMode === "quiz") {
        const target = LESSON_CONFIG.words[state.gameQueueIdx];
        if (target && target.culture && target.culture.quizQEn) {
          speakText(target.culture.quizQEn, rate);
        }
      } else {
        const item = getWordObj(state.focusedWordId);
        if (item) speakText(item.culture.enSentence, rate);
      }
    } else {
      const lineAEl = document.getElementById("promptLineA");
      const lineAText = lineAEl ? lineAEl.textContent.trim() : "";
      if (lineAText) {
        speakText(lineAText, rate);
      } else {
        speakText("Merry Christmas!", rate);
      }
    }
  }

  document.getElementById("bannerSpeakSlowBtn")?.addEventListener("click", () => speakBannerCurrent(LESSON_CONFIG.speechRateSlow));
  document.getElementById("bannerSpeakBtn")?.addEventListener("click", () => speakBannerCurrent(LESSON_CONFIG.speechRateNormal));

  document.getElementById("bannerRevealAnswerBtn")?.addEventListener("click", () => {
    if (typeof currentPkAnswerRevealer === "function") {
      playSfx("ding");
      triggerBurstParticles();
      currentPkAnswerRevealer();
      currentPkAnswerRevealer = null;
      const btn = document.getElementById("bannerRevealAnswerBtn");
      if (btn) {
        btn.textContent = "✅ 已揭曉答案";
        btn.disabled = true;
      }
    }
  });

  document.getElementById("storyPrevStepBtn")?.addEventListener("click", () => {
    if (state.storyStepIdx > 0) {
      state.storyStepIdx--;
      renderStoryStage(false);
    }
  });
  document.getElementById("storyNextStepBtn")?.addEventListener("click", () => {
    if (state.storyStepIdx < LESSON_CONFIG.storySteps.length - 1) {
      state.storyStepIdx++;
      renderStoryStage(false);
    } else {
      // 依據教學建議：麥塊劇情結尾按鈕改為「回首頁」，讓教師可再次選擇教學模式
      returnToHomeScreen();
    }
  });
  document.getElementById("storySpeakABtn")?.addEventListener("click", () => {
    const st = LESSON_CONFIG.storySteps[state.storyStepIdx];
    speakText(st.speakA, LESSON_CONFIG.speechRateNormal, "en-US", st.roleASpeak || "steve");
  });
  document.getElementById("storySpeakBBtn")?.addEventListener("click", () => {
    const st = LESSON_CONFIG.storySteps[state.storyStepIdx];
    speakText(st.speakB, LESSON_CONFIG.speechRateNormal, "en-US", st.roleBSpeak || "alex");
  });
  document.getElementById("storyTriggerPropBtn")?.addEventListener("click", triggerStorySceneProp);
  document.getElementById("closeStoryModalBtn")?.addEventListener("click", () => {
    document.getElementById("storyActionModal")?.classList.add("hidden");
  });

  document.getElementById("wordsSubModeLearnBtn")?.addEventListener("click", () => {
    state.wordsSubMode = "learn";
    renderWordsStage(false);
  });
  document.getElementById("wordsSubModeSpellBtn")?.addEventListener("click", () => {
    state.wordsSubMode = "spell";
    closeAllOverlays();
    renderWordsStage(false);
  });
  document.getElementById("wordsSubModePrepBtn")?.addEventListener("click", () => {
    state.wordsSubMode = "prep";
    closeAllOverlays();
    renderWordsStage(false);
  });

  const mainContainerEl = document.querySelector("main") || document.body;
  const topPromptEl = document.getElementById("topPromptBanner");
  const topPromptHeaderEl = document.getElementById("promptBannerHeader");
  if (topPromptEl) makeDraggable(topPromptEl, topPromptHeaderEl || topPromptEl, mainContainerEl);

  const zoomBoxEl = document.getElementById("voxelZoomBox");
  const zoomBoxHeaderEl = document.getElementById("zoomBoxHeader");
  if (zoomBoxEl) makeDraggable(zoomBoxEl, zoomBoxHeaderEl || zoomBoxEl, mainContainerEl);

  const cultureBoardEl = document.getElementById("cultureCompareBoard");
  const cultureBoardHeaderEl = document.getElementById("cultureBoardHeader");
  if (cultureBoardEl) makeDraggable(cultureBoardEl, cultureBoardHeaderEl || cultureBoardEl, mainContainerEl);

  window.addEventListener("resize", () => {
    const mRect = mainContainerEl.getBoundingClientRect();
    [topPromptEl, zoomBoxEl, cultureBoardEl].forEach(panel => {
      if (!panel || panel.classList.contains("hidden")) return;
      const curLeft = parseFloat(panel.style.left);
      const curTop = parseFloat(panel.style.top);
      if (!isNaN(curLeft)) {
        const maxL = Math.max(8, mRect.width - panel.offsetWidth - 8);
        if (curLeft > maxL) panel.style.left = `${maxL}px`;
        if (curLeft < 8) panel.style.left = "8px";
      }
      if (!isNaN(curTop)) {
        const maxT = Math.max(8, mRect.height - panel.offsetHeight - 8);
        if (curTop > maxT) panel.style.top = `${maxT}px`;
        if (curTop < 8) panel.style.top = "8px";
      }
    });
  });

  document.getElementById("closePromptBannerBtn")?.addEventListener("click", () => {
    document.getElementById("topPromptBanner")?.classList.add("hidden");
    document.getElementById("reopenPromptBannerBtn")?.classList.remove("hidden");
    playSfx("click");
  });
  document.getElementById("reopenPromptBannerBtn")?.addEventListener("click", () => {
    document.getElementById("topPromptBanner")?.classList.remove("hidden");
    document.getElementById("reopenPromptBannerBtn")?.classList.add("hidden");
    playSfx("click");
  });
  document.getElementById("closeZoomBoxBtn")?.addEventListener("click", () => {
    document.getElementById("voxelZoomBox")?.classList.add("hidden");
    playSfx("click");
  });
  document.getElementById("closeCultureBoardBtn")?.addEventListener("click", () => {
    document.getElementById("cultureCompareBoard")?.classList.add("hidden");
    playSfx("click");
  });

  window.addEventListener("contextmenu", (e) => {
    const isAnyOpen =
      document.getElementById("voxelZoomBox")?.offsetParent !== null ||
      document.getElementById("cultureCompareBoard")?.offsetParent !== null ||
      document.getElementById("storyActionModal")?.offsetParent !== null ||
      document.getElementById("flashHintBox")?.offsetParent !== null;

    if (isAnyOpen) {
      e.preventDefault();
      closeAllOverlays();
      playSfx("click");
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllOverlays();
    } else if ((e.key === "t" || e.key === "T") && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
      const banner = document.getElementById("topPromptBanner");
      const reopenBtn = document.getElementById("reopenPromptBannerBtn");
      if (banner && reopenBtn) {
        if (banner.classList.contains("hidden")) {
          banner.classList.remove("hidden");
          reopenBtn.classList.add("hidden");
        } else {
          banner.classList.add("hidden");
          reopenBtn.classList.remove("hidden");
        }
        playSfx("click");
      }
    } else if ((e.key === "f" || e.key === "F") && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
      toggleFullScreen();
    }
  });

  document.getElementById("zoomSlowWordBtn")?.addEventListener("click", () => {
    const item = getWordObj(state.focusedWordId);
    if (item) speakText(item.word, LESSON_CONFIG.speechRateSlow);
  });
  document.getElementById("zoomNormalWordBtn")?.addEventListener("click", () => {
    const item = getWordObj(state.focusedWordId);
    if (item) speakText(item.word, LESSON_CONFIG.speechRateNormal);
  });
  document.getElementById("zoomSlowQaBtn")?.addEventListener("click", () => {
    const item = getWordObj(state.focusedWordId);
    if (item) speakText(item.qaASpeak, LESSON_CONFIG.speechRateSlow);
  });
  document.getElementById("zoomSpeakQaBtn")?.addEventListener("click", () => {
    const item = getWordObj(state.focusedWordId);
    if (item) speakText(item.qaASpeak, LESSON_CONFIG.speechRateNormal);
  });

  document.getElementById("cultureSubModeExploreBtn")?.addEventListener("click", () => {
    state.cultureSubMode = "explore";
    renderCultureStage(false);
  });
  document.getElementById("cultureSubModeQuizBtn")?.addEventListener("click", () => {
    state.cultureSubMode = "quiz";
    closeAllOverlays();
    renderCultureStage(false);
  });
  document.getElementById("cultureSlowSpeakBtn")?.addEventListener("click", () => {
    const item = getWordObj(state.focusedWordId);
    speakText(item.culture.enSentence, LESSON_CONFIG.speechRateSlow);
  });
  document.getElementById("cultureNormalSpeakBtn")?.addEventListener("click", () => {
    const item = getWordObj(state.focusedWordId);
    speakText(item.culture.enSentence, LESSON_CONFIG.speechRateNormal);
  });

  document.getElementById("partyRandomQuizBtn")?.addEventListener("click", runRandomPkSpinner);
  document.getElementById("partyMusicBtn")?.addEventListener("click", () => {
    if (state.playingMusic) {
      stopChiptuneBgm();
    } else {
      startChiptuneBgm();
      triggerBurstParticles();
    }
  });
  document.getElementById("partySnowBurstBtn")?.addEventListener("click", togglePartyFireworkShow);

  document.getElementById("teacherUnlockAllBtn")?.addEventListener("click", () => {
    if (state.unlockedIds.size === LESSON_CONFIG.words.length) {
      state.unlockedIds.clear();
      updateSceneAndStars();
    } else {
      LESSON_CONFIG.words.forEach(w => state.unlockedIds.add(w.id));
      triggerBurstParticles();
      updateSceneAndStars();
    }
  });

  document.getElementById("soundMuteBtn")?.addEventListener("click", () => {
    state.soundOn = !state.soundOn;
    document.getElementById("soundMuteIcon").textContent = state.soundOn ? "🔊" : "🔇";
    if (!state.soundOn && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  });

  document.getElementById("fullscreenToggleBtn")?.addEventListener("click", () => {
    playSfx("click");
    toggleFullScreen();
  });

  document.getElementById("resetLessonBtn")?.addEventListener("click", () => {
    if (fireworkShowInterval) {
      clearInterval(fireworkShowInterval);
      fireworkShowInterval = null;
      const snowBtn = document.getElementById("partySnowBurstBtn");
      if (snowBtn) {
        snowBtn.querySelector("span:first-child").textContent = "❄️ 暴風雪";
        snowBtn.querySelector("span:last-child").textContent = "慶祝煙火";
      }
    }
    state.unlockedIds.clear();
    state.storyStepIdx = 0;
    state.cabinFireplaceLit = false;
    state.gameQueueIdx = 0;
    state.scoreRed = 0;
    state.scoreGreen = 0;
    document.getElementById("scoreRedText").textContent = "0";
    document.getElementById("scoreGreenText").textContent = "0";
    state.heavySnow = false;
    if (state.playingMusic) {
      stopChiptuneBgm();
    }
    switchStage("story");
  });
});