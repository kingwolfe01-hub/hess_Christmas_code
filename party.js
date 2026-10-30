/* =========================================================================
   🎄 3D 麥塊聖誕冒險教室 (Minecraft Christmas 3D) - 派對與 PK 模組 (party.js)
   - 階段 4：Party 環遊世界 5 國祝福語 ＆ 雙隊隨機抽題 PK
   - 5 國語言說聖誕快樂母語發音體驗
   - 隨機抽考 PK 輪盤 (出題防洩題 ＋ 揭曉答案互動)
   - 全景慶祝煙火與暴風雪循環控制
   ========================================================================= */

window.LESSON_CONFIG = window.LESSON_CONFIG || {};

LESSON_CONFIG.globalGreetings = [
  { flag: "🇺🇸🇬🇧", country: "美 / 英 (English)", phrase: "Merry Christmas!", phonetic: "Merry Christmas!", lang: "en-US", speakText: "Merry Christmas!", role: "greeting_en" },
  { flag: "🇲🇽🇪🇸", country: "墨西哥 / 西班牙", phrase: "¡Feliz Navidad!", phonetic: "費利斯 納維達", lang: "es-ES", speakText: "Feliz Navidad!", role: "greeting_es" },
  { flag: "🇩🇪", country: "德國 (German)", phrase: "Frohe Weihnachten!", phonetic: "弗洛赫 懷納赫滕", lang: "de-DE", speakText: "Frohe Weihnachten!", role: "greeting_de" },
  { flag: "🇫🇷", country: "法國 (French)", phrase: "Joyeux Noël!", phonetic: "ジュワユ 諾艾爾", lang: "fr-FR", speakText: "Joyeux Noël!", role: "greeting_fr" },
  { flag: "🇯🇵", country: "日本 (Japanese)", phrase: "メリークリスマス!", phonetic: "Merī Kurisumasu", lang: "ja-JP", speakText: "メリークリスマス", role: "greeting_ja" }
];

let fireworkShowInterval = null;
let currentPkAnswerRevealer = null;

function renderPartyGreetings() {
  const grid = document.getElementById("partyGreetingsGrid");
  if (!grid) return;
  grid.innerHTML = "";
  LESSON_CONFIG.globalGreetings.forEach(g => {
    const btn = document.createElement("button");
    btn.className = "py-2 px-2 rounded-xl bg-[#38261a] hover:bg-amber-400 hover:text-red-950 text-white border-2 border-amber-300/60 transition flex flex-col items-center justify-center mc-btn";
    btn.innerHTML = `
      <span class="text-sm sm:text-base font-black">${g.flag} ${g.country.split(" ")[0]}</span>
      <span class="text-xs sm:text-sm font-black text-yellow-300 truncate w-full text-center">${g.phrase}</span>
    `;
    btn.addEventListener("click", () => {
      triggerBurstParticles();
      speakText(g.speakText, 0.9, g.lang, g.role);
      document.getElementById("promptStepBadge").textContent = `🌍 世界聖誕祝福語 · ${g.country}`;
      document.getElementById("promptLineA").textContent = `${g.flag} "${g.phrase}" (${g.phonetic})`;
      document.getElementById("promptSubZh").textContent = `點擊上方 🔴 Redstone 或 🟢 Emerald 的「+1」按鈕，幫大聲唸出來的小組加分！`;
    });
    grid.appendChild(btn);
  });
}

function runRandomPkSpinner() {
  closeAllOverlays();
  const revealBtn = document.getElementById("bannerRevealAnswerBtn");
  if (revealBtn) revealBtn.classList.add("hidden");

  let ticks = 0;
  const maxTicks = 10;
  const timer = setInterval(() => {
    const randItem = LESSON_CONFIG.words[Math.floor(Math.random() * LESSON_CONFIG.words.length)];
    state.focusedWordId = randItem.id;
    updateSceneAndStars();
    ticks++;
    if (ticks >= maxTicks) {
      clearInterval(timer);
      playSfx("ding");

      const challengeTypes = [
        {
          type: "🔤 音節拼字 PK (+1分)",
          board: "words",
          lineA: `🎲 PK 搶答: Spell "${randItem.zh}"! (${randItem.chunks.length} 個音節)`,
          subZh: `請兩隊搶答拼出這個單字！學生搶答後，教師請點擊上方「👁️ 揭曉答案」驗證！`,
          revealAction: () => {
            openVoxelZoomBox(randItem.id, LESSON_CONFIG.speechRateNormal);
            document.getElementById("promptSubZh").innerHTML = `✅ 正確答案：<span class="text-yellow-300 font-black text-base sm:text-lg">${randItem.word} (${randItem.chunks.join(" - ")})</span>`;
          }
        },
        {
          type: "📍 單複數空間句型 PK (+1分)",
          board: "words",
          lineA: `🎲 PK 搶答: ${randItem.qaQ}`,
          subZh: `請兩隊搶答用完整英文句子回答位置！回答後請點擊上方「👁️ 揭曉答案」核對！`,
          revealAction: () => {
            openVoxelZoomBox(randItem.id, LESSON_CONFIG.speechRateNormal);
            document.getElementById("promptSubZh").innerHTML = `✅ 正確答案：<span class="text-yellow-300 font-black text-base sm:text-lg">${randItem.qaASpeak}</span>`;
          }
        },
        {
          type: "🌍 國際文化與台灣比較 PK (+2分)",
          board: "culture",
          lineA: `🎲 Culture PK: ${randItem.culture.country} 的聖誕習俗是什麼？`,
          subZh: `雙倍搶答題：請說出「${randItem.zh}」在該國的傳統由來與台灣的差異！搶答後點擊「👁️ 揭曉答案」！`,
          revealAction: () => {
            openCultureCompareBoard(randItem.id, LESSON_CONFIG.speechRateNormal);
            document.getElementById("promptSubZh").innerHTML = `✅ 文化正解：<span class="text-yellow-300 font-black text-base sm:text-lg">${randItem.culture.enSentence}</span>`;
          }
        }
      ];

      const picked = challengeTypes[Math.floor(Math.random() * challengeTypes.length)];

      closeAllOverlays();

      document.getElementById("promptStepBadge").textContent = picked.type;
      document.getElementById("promptLineA").textContent = picked.lineA;
      document.getElementById("promptLineB").classList.add("hidden");
      document.getElementById("promptSubZh").textContent = picked.subZh;

      currentPkAnswerRevealer = picked.revealAction;
      if (revealBtn) {
        revealBtn.classList.remove("hidden");
        revealBtn.textContent = "👁️ 揭曉答案";
        revealBtn.disabled = false;
      }
    }
  }, 110);
}

function triggerMegaFirework() {
  playSfx("firework_blast");
  const canvas = snowCanvasEl || document.getElementById("snowCanvas");
  if (!canvas) return;

  const originX = Math.random() * (canvas.width * 0.75) + (canvas.width * 0.12);
  const originY = Math.random() * (canvas.height * 0.45) + (canvas.height * 0.12);
  const palette = ["#facc15", "#f43f5e", "#38bdf8", "#4ade80", "#c084fc", "#fb923c", "#ffffff", "#e879f9"];

  for (let i = 0; i < 75; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6.5 + 2.0;
    burstList.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.2,
      size: Math.floor(Math.random() * 6) + 4,
      color: palette[Math.floor(Math.random() * palette.length)],
      life: 1.25
    });
  }
}

function togglePartyFireworkShow() {
  const btn = document.getElementById("partySnowBurstBtn");
  if (fireworkShowInterval) {
    clearInterval(fireworkShowInterval);
    fireworkShowInterval = null;
    state.heavySnow = false;
    if (btn) {
      btn.querySelector("span:first-child").textContent = "❄️ 暴風雪";
      btn.querySelector("span:last-child").textContent = "慶祝煙火";
    }
  } else {
    state.heavySnow = true;
    if (btn) {
      btn.querySelector("span:first-child").textContent = "⏹️ 停止狂歡";
      btn.querySelector("span:last-child").textContent = "停止煙火秀";
    }
    triggerMegaFirework();
    fireworkShowInterval = setInterval(() => {
      if (!state.heavySnow || state.stage !== "party") {
        clearInterval(fireworkShowInterval);
        fireworkShowInterval = null;
        if (btn) {
          btn.querySelector("span:first-child").textContent = "❄️ 暴風雪";
          btn.querySelector("span:last-child").textContent = "慶祝煙火";
        }
        return;
      }
      triggerMegaFirework();
    }, 750);
  }
}
