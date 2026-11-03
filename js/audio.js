/* =========================================================================
   🎄 3D 麥塊聖誕冒險教室 (Minecraft Christmas 3D) - 音訊核心引擎 (audio.js)
   - Web Audio API 擬真 Foley 音效合成 (打火石火花、傳送門、壁爐柴火、鐵砧合成等)
   - 8-bit 麥塊像素風格《Jingle Bells》BGM 合成引擎 (支援 Ducking 降音)
   - Google AI 語音精確對照播放器 (89 個音檔精準映射表、雙重相容性、雲端串流自動遞補)
   - Web Speech API 智慧容錯回退機制
   ========================================================================= */

// 全域音訊實例宣告
let currentAudioInstance = null;
let audioCtx = null;

// ==========================================
// 1. Web Audio API 音效合成引擎 (Foley SFX)
// ==========================================
function ensureAudioCtx() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) {
      audioCtx = new Ctx();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  // 行動裝置專屬喚醒靜音 Buffer
  try {
    if (audioCtx && !window._mobileAudioUnlocked) {
      const buffer = audioCtx.createBuffer(1, 1, 22050);
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.start(0);
      window._mobileAudioUnlocked = true;
    }
  } catch (_) {}
  return audioCtx;
}

function playSfx(type) {
  if (window.state && window.state.soundOn === false) return;
  const ctx = ensureAudioCtx();
  if (!ctx) return;

  const now = ctx.currentTime;

  switch (type) {
    case "click": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
      break;
    }

    case "drop": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.09);
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
      break;
    }

    case "blizzard_wind": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(280, now + 0.35);
      osc.frequency.linearRampToValueAtTime(110, now + 0.75);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.25);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.8);
      break;
    }

    case "flint_steel": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(3200, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
      break;
    }

    case "portal":
    case "portal_hum": {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = "sine";
      osc2.type = "triangle";
      osc1.frequency.setValueAtTime(110, now);
      osc1.frequency.exponentialRampToValueAtTime(220, now + 0.4);
      osc2.frequency.setValueAtTime(114, now);
      osc2.frequency.exponentialRampToValueAtTime(228, now + 0.4);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.55);
      osc2.stop(now + 0.55);
      break;
    }

    case "ding":
    case "radar_ping": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1860, now);
      osc.frequency.setValueAtTime(2480, now + 0.08);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
      break;
    }

    case "fire":
    case "fire_crackle": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
      break;
    }

    case "anvil_craft": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
      break;
    }

    case "success": {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        gain.gain.setValueAtTime(0.2, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.16);
      });
      break;
    }

    case "oops":
    case "error": {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.18);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
      break;
    }

    case "fanfare": {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.11);
        gain.gain.setValueAtTime(0.26, now + i * 0.11);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.11 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.11);
        osc.stop(now + i * 0.11 + 0.35);
      });
      break;
    }

    case "party_horn": {
      const freqs = [392, 440, 523, 659];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.18, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
      break;
    }

    case "portal_ignite": {
      const flint = ctx.createOscillator();
      const flintGain = ctx.createGain();
      flint.type = "sawtooth";
      flint.frequency.setValueAtTime(1600, now);
      flint.frequency.exponentialRampToValueAtTime(3600, now + 0.05);
      flint.frequency.exponentialRampToValueAtTime(300, now + 0.15);
      flintGain.gain.setValueAtTime(0.35, now);
      flintGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      flint.connect(flintGain);
      flintGain.connect(ctx.destination);
      flint.start(now);
      flint.stop(now + 0.15);

      const boom = ctx.createOscillator();
      const boomGain = ctx.createGain();
      boom.type = "sine";
      boom.frequency.setValueAtTime(85, now + 0.05);
      boom.frequency.exponentialRampToValueAtTime(35, now + 0.6);
      boomGain.gain.setValueAtTime(0.45, now + 0.05);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      boom.connect(boomGain);
      boomGain.connect(ctx.destination);
      boom.start(now + 0.05);
      boom.stop(now + 0.6);
      break;
    }

    case "wormhole_warp": {
      const w1 = ctx.createOscillator();
      const w2 = ctx.createOscillator();
      const wGain = ctx.createGain();
      w1.type = "sawtooth";
      w2.type = "triangle";
      w1.frequency.setValueAtTime(90, now);
      w1.frequency.exponentialRampToValueAtTime(480, now + 0.35);
      w1.frequency.exponentialRampToValueAtTime(110, now + 0.75);
      w2.frequency.setValueAtTime(94, now);
      w2.frequency.exponentialRampToValueAtTime(490, now + 0.35);
      w2.frequency.exponentialRampToValueAtTime(114, now + 0.75);
      wGain.gain.setValueAtTime(0.01, now);
      wGain.gain.linearRampToValueAtTime(0.35, now + 0.3);
      wGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      w1.connect(wGain);
      w2.connect(wGain);
      wGain.connect(ctx.destination);
      w1.start(now);
      w2.start(now);
      w1.stop(now + 0.8);
      w2.stop(now + 0.8);
      break;
    }

    case "reindeer_happy": {
      [659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
        const bell = ctx.createOscillator();
        const bellGain = ctx.createGain();
        bell.type = "sine";
        bell.frequency.setValueAtTime(freq, now + i * 0.08);
        bellGain.gain.setValueAtTime(0.28, now + i * 0.08);
        bellGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.28);
        bell.connect(bellGain);
        bellGain.connect(ctx.destination);
        bell.start(now + i * 0.08);
        bell.stop(now + i * 0.08 + 0.28);
      });
      break;
    }

    case "fireplace_ignite": {
      const spark = ctx.createOscillator();
      const sparkGain = ctx.createGain();
      spark.type = "sawtooth";
      spark.frequency.setValueAtTime(1800, now);
      spark.frequency.exponentialRampToValueAtTime(3200, now + 0.06);
      spark.frequency.exponentialRampToValueAtTime(400, now + 0.16);
      sparkGain.gain.setValueAtTime(0.3, now);
      sparkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      spark.connect(sparkGain);
      sparkGain.connect(ctx.destination);
      spark.start(now);
      spark.stop(now + 0.16);

      const wood = ctx.createOscillator();
      const woodGain = ctx.createGain();
      wood.type = "triangle";
      wood.frequency.setValueAtTime(140, now + 0.08);
      wood.frequency.exponentialRampToValueAtTime(280, now + 0.25);
      wood.frequency.exponentialRampToValueAtTime(80, now + 0.55);
      woodGain.gain.setValueAtTime(0.38, now + 0.08);
      woodGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      wood.connect(woodGain);
      woodGain.connect(ctx.destination);
      wood.start(now + 0.08);
      wood.stop(now + 0.6);
      break;
    }
    case "firework_blast": {
      const whistleOsc = ctx.createOscillator();
      const whistleGain = ctx.createGain();
      whistleOsc.type = "sawtooth";
      whistleOsc.frequency.setValueAtTime(280, now);
      whistleOsc.frequency.exponentialRampToValueAtTime(950, now + 0.16);
      whistleGain.gain.setValueAtTime(0.12, now);
      whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      whistleOsc.connect(whistleGain);
      whistleGain.connect(ctx.destination);
      whistleOsc.start(now);
      whistleOsc.stop(now + 0.16);

      const boomOsc = ctx.createOscillator();
      const boomGain = ctx.createGain();
      boomOsc.type = "triangle";
      boomOsc.frequency.setValueAtTime(140, now + 0.16);
      boomOsc.frequency.exponentialRampToValueAtTime(35, now + 0.55);
      boomGain.gain.setValueAtTime(0.35, now + 0.16);
      boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      boomOsc.connect(boomGain);
      boomGain.connect(ctx.destination);
      boomOsc.start(now + 0.16);
      boomOsc.stop(now + 0.55);
      break;
    }
  }
}

// ==========================================
// 2. 8-bit 麥塊像素風格 BGM 合成引擎
// ==========================================
let chiptuneBgmCtx = null;
let chiptuneBgmTimer = null;
let chiptuneBgmGain = null;
let chiptuneCurrentNoteIndex = 0;
let isBgmDucked = false;

const NOTE_FREQS = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
  G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25,
  D5: 587.33, REST: 0
};

const JINGLE_BELLS_MELODY = [
  ['E4', 2], ['E4', 2], ['E4', 4],
  ['E4', 2], ['E4', 2], ['E4', 4],
  ['E4', 2], ['G4', 2], ['C4', 3], ['D4', 1], ['E4', 8],
  ['F4', 2], ['F4', 2], ['F4', 3], ['F4', 1],
  ['F4', 2], ['E4', 2], ['E4', 2], ['E4', 1], ['E4', 1],
  ['E4', 2], ['D4', 2], ['D4', 2], ['E4', 2], ['D4', 4], ['G4', 4],
  ['E4', 2], ['E4', 2], ['E4', 4],
  ['E4', 2], ['E4', 2], ['E4', 4],
  ['E4', 2], ['G4', 2], ['C4', 3], ['D4', 1], ['E4', 8],
  ['F4', 2], ['F4', 2], ['F4', 3], ['F4', 1],
  ['F4', 2], ['E4', 2], ['E4', 2], ['E4', 1], ['E4', 1],
  ['G4', 2], ['G4', 2], ['F4', 2], ['D4', 2], ['C4', 8],
  ['REST', 4]
];

function initChiptuneBgm() {
  const ctx = ensureAudioCtx();
  if (!ctx) return null;
  chiptuneBgmCtx = ctx;
  if (!chiptuneBgmGain && ctx) {
    chiptuneBgmGain = ctx.createGain();
    chiptuneBgmGain.gain.setValueAtTime(0.18, ctx.currentTime);
    chiptuneBgmGain.connect(ctx.destination);
  }
  return ctx;
}

function setBgmDucking(enable) {
  isBgmDucked = enable;
  if (!chiptuneBgmGain || !chiptuneBgmCtx) return;
  const now = chiptuneBgmCtx.currentTime;
  const targetGain = enable ? 0.025 : 0.14;
  chiptuneBgmGain.gain.cancelScheduledValues(now);
  chiptuneBgmGain.gain.linearRampToValueAtTime(targetGain, now + 0.25);
}

function play8BitNote(freq, durationSec) {
  if (!chiptuneBgmCtx || freq === 0) return;
  const now = chiptuneBgmCtx.currentTime;

  const osc = chiptuneBgmCtx.createOscillator();
  const noteGain = chiptuneBgmCtx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(freq, now);

  noteGain.gain.setValueAtTime(0.7, now);
  noteGain.gain.exponentialRampToValueAtTime(0.01, now + durationSec * 0.92);

  osc.connect(noteGain);
  noteGain.connect(chiptuneBgmGain);

  osc.start(now);
  osc.stop(now + durationSec * 0.95);

  const bassOsc = chiptuneBgmCtx.createOscillator();
  const bassGain = chiptuneBgmCtx.createGain();
  bassOsc.type = 'triangle';
  bassOsc.frequency.setValueAtTime(freq / 2, now);
  bassGain.gain.setValueAtTime(0.5, now);
  bassGain.gain.exponentialRampToValueAtTime(0.01, now + durationSec * 0.9);

  bassOsc.connect(bassGain);
  bassGain.connect(chiptuneBgmGain);

  bassOsc.start(now);
  bassOsc.stop(now + durationSec * 0.95);
}

function tickChiptuneSequence() {
  if (!window.state || !window.state.playingMusic) return;
  const noteData = JINGLE_BELLS_MELODY[chiptuneCurrentNoteIndex];
  const noteName = noteData[0];
  const beats = noteData[1];
  const stepDurationSec = 0.115;
  const noteDurationSec = beats * stepDurationSec;

  if (noteName !== 'REST') {
    const freq = NOTE_FREQS[noteName] || 0;
    play8BitNote(freq, noteDurationSec);
  }

  chiptuneCurrentNoteIndex = (chiptuneCurrentNoteIndex + 1) % JINGLE_BELLS_MELODY.length;
  chiptuneBgmTimer = setTimeout(tickChiptuneSequence, noteDurationSec * 1000);
}

function startChiptuneBgm() {
  initChiptuneBgm();
  if (window.state) window.state.playingMusic = true;
  chiptuneCurrentNoteIndex = 0;
  clearTimeout(chiptuneBgmTimer);
  const label = document.getElementById("partyMusicBtnLabel");
  if (label) label.textContent = "⏹️ 停止音樂";
  tickChiptuneSequence();
}

function stopChiptuneBgm() {
  if (window.state) window.state.playingMusic = false;
  clearTimeout(chiptuneBgmTimer);
  chiptuneBgmTimer = null;
  const label = document.getElementById("partyMusicBtnLabel");
  if (label) label.textContent = "🎵 聖誕音樂";
  if (chiptuneBgmGain && chiptuneBgmCtx) {
    chiptuneBgmGain.gain.setValueAtTime(0.14, chiptuneBgmCtx.currentTime);
  }
}

// ==========================================
// 3. 實體音檔精準映射表 (89 個音檔清單)
// ==========================================
const EXACT_AUDIO_MAP = {
  // 【A 組】8 幕故事角色對話 (16 句)
  "it's cold today in taiwan!": "it_s_cold_today_in_taiwan.mp3",
  "look! an sos map from santa!": "look__an_s_o_s_map_from_santa.mp3",
  "look! an s o s map from santa!": "look__an_s_o_s_map_from_santa.mp3",
  "we need our backpack and compass!": "we_need_our_backpack_and_compass.mp3",
  "we have flint and steel. let's go!": "we_have_flint_and_steel__let_s_go.mp3",
  "look at the christmas portal!": "look_at_the_christmas_portal.mp3",
  "light it up with flint and steel! go!": "light_it_up_with_flint_and_steel__go.mp3",
  "we are in the purple vortex!": "we_are_in_the_purple_vortex.mp3",
  "hold on tight! it's getting cold!": "hold_on_tight__it_s_getting_cold.mp3",
  "brrr! it's freezing outside!": "brrr__it_s_freezing_outside.mp3",
  "the blizzard blew my seven blocks away!": "the_blizzard_blew_my_seven_blocks_away.mp3",
  "rudolph is cold in the blizzard!": "rudolph_is_cold_in_the_blizzard.mp3",
  "look! the pine tree can shelter him!": "look_the_pine_tree_can_shelter_him.mp3",
  "look the pine tree can shelter him": "look_the_pine_tree_can_shelter_him.mp3",
  "it is dark and cold in the cabin!": "it_is_dark_and_cold_in_the_cabin.mp3",
  "let's light the fireplace with flint!": "let_s_light_the_fireplace_with_flint.mp3",
  "look at the tree! it's party time!": "look_at_the_tree__it_s_party_time.mp3",
  "merry christmas! let's celebrate!": "merry_christmas__let_s_celebrate.mp3",

  // 【B 組】7 個核心單字 (Core Vocabulary)
  "pine tree": "pine_tree.mp3",
  "ribbon": "ribbon.mp3",
  "ornament": "ornament.mp3",
  "star": "star.mp3",
  "stocking": "stocking.mp3",
  "present": "present.mp3",
  "santa claus": "santa_claus.mp3",

  // 【C 組】7 個完整問答句 (Complete Q&A)
  "where is the pine tree? it's by the fireplace.": "where_is_the_pine_tree__it_s_by_the_fireplace.mp3",
  "where is the ribbon? it's around the pine tree.": "where_is_the_ribbon__it_s_around_the_pine_tree.mp3",
  "where are the ornaments? they're on the tree.": "where_are_the_ornaments__they_re_on_the_tree.mp3",
  "where is the star? it's on top of the tree.": "where_is_the_star__it_s_on_top_of_the_tree.mp3",
  "where is the stocking? it's above the fireplace.": "where_is_the_stocking__it_s_above_the_fireplace.mp3",
  "where are the presents? they're under the tree.": "where_are_the_presents__they_re_under_the_tree.mp3",
  "where is santa claus? he is in the room.": "where_is_santa_claus__he_is_in_the_room.mp3",

  // 【D 組】7 國文化介紹短句 (Culture Sentences)
  "in germany, people put trees in the house.": "in_germany__people_put_trees_in_the_house.mp3",
  "in france, ribbons tie holiday joy together.": "in_france__ribbons_tie_holiday_joy_together.mp3",
  "in mexico, bright ornaments bring joy.": "in_mexico__bright_ornaments_bring_joy.mp3",
  "in the philippines, star lanterns light the street.": "in_the_philippines__star_lanterns_light_the_street.mp3",
  "in the uk, children hang stockings by the fire.": "in_the_uk__children_hang_stockings_by_the_fire.mp3",
  "in the usa, presents wait under the tree.": "in_the_usa__presents_wait_under_the_tree.mp3",
  "in australia, santa surfs at the sunny beach.": "in_australia__santa_surfs_at_the_sunny_beach.mp3",

  // 【E 組】自然發音音節拆解方塊 (Phonics Chunks)
  "pine": "chunk_pine.mp3",
  "tree": "chunk_tree.mp3",
  "rib": "chunk_rib.mp3",
  "bon": "chunk_bon.mp3",
  "or": "chunk_or.mp3",
  "na": "chunk_na.mp3",
  "ment": "chunk_ment.mp3",
  "st": "chunk_st.mp3",
  "ar": "chunk_ar.mp3",
  "stock": "chunk_stock.mp3",
  "ing": "chunk_ing.mp3",
  "pre": "chunk_pre.mp3",
  "sent": "chunk_sent.mp3",
  "santa": "chunk_santa.mp3",
  "claus": "chunk_claus.mp3",

  // 【F 組】空間介系詞挑戰純問句 (Questions Only)
  "where is the pine tree?": "q_where_is_the_pine_tree.mp3",
  "where is the ribbon?": "q_where_is_the_ribbon.mp3",
  "where are the ornaments?": "q_where_are_the_ornaments.mp3",
  "where is the star?": "q_where_is_the_star.mp3",
  "where is the stocking?": "q_where_is_the_stocking.mp3",
  "where are the presents?": "q_where_are_the_presents.mp3",
  "where is santa claus?": "q_where_is_santa_claus.mp3",

  // 【G 組】國際文化搶答填空問句 (Culture Quiz Questions)
  "in germany, people put green blank in the house!": "cq_germany_blank.mp3",
  "in france, people tie colorful blank on gifts!": "cq_france_blank.mp3",
  "in mexico, colorful blank are hung for christmas!": "cq_mexico_blank.mp3",
  "in the philippines, the bright blank lantern is called a parol!": "cq_philippines_blank.mp3",
  "in the uk, children hang a blank by the fire for gifts!": "cq_uk_blank.mp3",
  "in the usa, families put colorful blank under the tree!": "cq_usa_blank.mp3",
  "in australia, santa wears shorts and surfs at the blank!": "cq_australia_blank.mp3",

  // 【H 組】環遊世界 5 國語言聖誕祝福語 (Holiday Greetings)
  "merry christmas!": "greeting_en_merry_christmas.mp3",
  "merry christmas": "greeting_en_merry_christmas.mp3",
  "¡feliz navidad!": "greeting_es_feliz_navidad.mp3",
  "feliz navidad!": "greeting_es_feliz_navidad.mp3",
  "feliz navidad": "greeting_es_feliz_navidad.mp3",
  "frohe weihnachten!": "greeting_de_frohe_weihnachten.mp3",
  "frohe weihnachten": "greeting_de_frohe_weihnachten.mp3",
  "joyeux noël!": "greeting_fr_joyeux_noel.mp3",
  "joyeux noel!": "greeting_fr_joyeux_noel.mp3",
  "joyeux noel": "greeting_fr_joyeux_noel.mp3",
  "メリークリスマス!": "greeting_ja_merry_christmas.mp3",
  "メリークリスマス": "greeting_ja_merry_christmas.mp3",

  // 【I 組】遊戲激勵與回饋語 (Feedback & Encouragement)
  "try again!": "feedback_try_again.mp3",
  "try again": "feedback_try_again.mp3",
  "great job!": "feedback_great_job.mp3",
  "awesome!": "feedback_awesome.mp3",
  "correct!": "feedback_correct.mp3",

  // 【J 組】故事模式情境 Mini-Quiz (Story Mini-Quiz)
  "which green tree can shelter rudolph the reindeer?": "story_quiz_rudolph.mp3",
  "correct! the pine tree shelters rudolph!": "story_quiz_correct_rudolph.mp3",
  "where do children hang their christmas stockings?": "story_quiz_stocking.mp3",
  "correct! stockings are above the fireplace!": "story_quiz_correct_hearth.mp3"
};

// ==========================================
// 4. 音訊播放與安全中斷機制
// ==========================================
function stopCurrentSpeech() {
  if (currentAudioInstance) {
    try {
      currentAudioInstance.onerror = null;
      currentAudioInstance.onended = null;
      currentAudioInstance.pause();
      currentAudioInstance.src = "";
      currentAudioInstance = null;
    } catch (e) {}
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
}

function normalizeSpeechText(text) {
  if (!text) return "";
  let t = String(text);
  t = t.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "");
  t = t.replace(/[\u2600-\u27BF\uFE0F]/g, "");
  t = t.replace(/_+/g, "blank");
  t = t.replace(/\s+([,!?.:;])/g, "$1");
  t = t.replace(/\s+/g, " ").trim();
  return t;
}

function playAudioFilePromise(filename, actualRate, fallbackText = null, fallbackLang = "en-US") {
  return new Promise((resolve, reject) => {
    const singleUnderscore = filename.replace(/__+/g, "_");
    const candFilenames = Array.from(new Set([filename, singleUnderscore]));
    const paths = [];
    candFilenames.forEach(fn => {
      paths.push(`audio/${fn}`);
      paths.push(`${fn}`);
    });

    const isFileOrigin = (typeof window !== "undefined" && window.location && window.location.protocol === "file:");
    // 在 file:/// 協議下避免外部跨域 TTS 觸發 Chromium 安全性警告，改由 Web Speech API 回退
    if (fallbackText && !isFileOrigin) {
      const cleanLang = (fallbackLang || "en").split("-")[0];
      const cleanTtsText = normalizeSpeechText(fallbackText);
      const encoded = encodeURIComponent(cleanTtsText);
      paths.push(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=${cleanLang}&client=tw-ob`);
    }

    let pathIdx = 0;
    let isFinished = false;

    function cleanupAudio(audioEl) {
      if (!audioEl) return;
      audioEl.onerror = null;
      audioEl.onended = null;
      try {
        audioEl.pause();
        audioEl.src = "";
      } catch (_) {}
    }

    function tryNext() {
      if (isFinished) return;
      if (pathIdx >= paths.length) {
        isFinished = true;
        currentAudioInstance = null;
        return reject(new Error("找不到音檔：" + filename));
      }

      if (currentAudioInstance) {
        cleanupAudio(currentAudioInstance);
        currentAudioInstance = null;
      }

      const audio = new Audio(paths[pathIdx]);
      currentAudioInstance = audio;
      const targetRate = actualRate || 1.0;
      audio.defaultPlaybackRate = targetRate;
      audio.playbackRate = targetRate;

      // 雙重監聽：防止 Safari / Chrome 在 play 或 loadedmetadata 時重設語速
      audio.addEventListener('loadedmetadata', () => {
        try { audio.playbackRate = targetRate; } catch (_) {}
      });
      audio.addEventListener('play', () => {
        try { audio.playbackRate = targetRate; } catch (_) {}
      });

      let hasHandledFailure = false;
      const handleFailure = () => {
        if (hasHandledFailure || isFinished) return;
        hasHandledFailure = true;
        cleanupAudio(audio);
        pathIdx++;
        tryNext();
      };

      audio.onended = () => {
        if (isFinished) return;
        isFinished = true;
        cleanupAudio(audio);
        currentAudioInstance = null;
        resolve();
      };

      audio.onerror = handleFailure;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          handleFailure();
        });
      }
    }

    tryNext();
  });
}

async function speakText(text, rate = null, lang = "en-US", role = "default") {
  if (!text) return;

  const actualRate = rate !== null ? rate : (typeof LESSON_CONFIG !== "undefined" ? LESSON_CONFIG.speechRateNormal : 0.96);
  stopCurrentSpeech();
  setBgmDucking(true);

  try {
    const normText = normalizeSpeechText(text);
    const cleanText = normText.toLowerCase();

    let matchedFilename = EXACT_AUDIO_MAP[cleanText];

    if (!matchedFilename) {
      const noPunct = cleanText.replace(/[,!?.:;]/g, "").trim();
      matchedFilename = EXACT_AUDIO_MAP[noPunct];
    }

    if (!matchedFilename && cleanText.length > 5) {
      const sortedKeys = Object.keys(EXACT_AUDIO_MAP).sort((a, b) => b.length - a.length);
      for (const key of sortedKeys) {
        if (cleanText.includes(key)) {
          matchedFilename = EXACT_AUDIO_MAP[key];
          break;
        }
      }
    }

    if (matchedFilename) {
      try {
        await playAudioFilePromise(matchedFilename, actualRate, cleanText, lang);
        return;
      } catch (err) {
        console.warn(`[MP3 播放失敗，啟用備用發音] 檔名: ${matchedFilename}`, err);
        stopCurrentSpeech();
      }
    }

    await speakBrowserSpeech(text, actualRate, lang, role);
  } finally {
    setBgmDucking(false);
  }
}

function speakBrowserSpeech(text, rate = 0.96, lang = "en-US", role = "default") {
  return new Promise((resolve) => {
    if (!("speechSynthesis" in window)) return resolve();
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = rate;
    utter.lang = lang;

    if (role === "steve") {
      utter.pitch = 0.95;
    } else if (role === "santa") {
      utter.pitch = 0.72;
      utter.rate = Math.max(0.65, rate * 0.88);
    } else if (role === "alex") {
      utter.pitch = 1.15;
    } else {
      utter.pitch = 1.0;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const cleanLang = (lang || "en-US").replace("_", "-");
      const langVoices = voices.filter(v => v.lang && (v.lang.replace("_", "-").startsWith(cleanLang) || v.lang.startsWith(cleanLang.split("-")[0])));
      const pool = langVoices.length > 0 ? langVoices : voices;

      if (role === "steve" || role === "santa") {
        const maleVoice = pool.find(v => /male|david|mark|george|christopher|guy|ichiro|keita/i.test(v.name));
        if (maleVoice) utter.voice = maleVoice;
        else if (pool[0]) utter.voice = pool[0];
      } else if (role === "alex") {
        const femaleVoice = pool.find(v => /female|zira|jenny|samantha|victoria|karen|nanami|ayumi/i.test(v.name));
        if (femaleVoice) utter.voice = femaleVoice;
        else if (pool[0]) utter.voice = pool[0];
      } else {
        if (pool[0]) utter.voice = pool[0];
      }
    }

    utter.onend = () => resolve();
    utter.onerror = () => resolve();

    window.speechSynthesis.speak(utter);
  });
}

async function speakPhonicsChunk(chunkText, phoneticSound) {
  playSfx("click");
  const spoken = phoneticSound || chunkText;
  speakText(spoken, typeof LESSON_CONFIG !== "undefined" ? LESSON_CONFIG.speechRateSlow : 0.76, "en-US", "alex");
}


// ==========================================
// 2.5 劇情環境背景音引擎 (Story Ambient Engine)
// - 隨幕次自動淡入淡出環境底音 (蟲洞共振、暴風雪風吼、壁爐柴火底音)
// ==========================================
let storyAmbientNodes = null;

function stopStorySceneBgm() {
  if (storyAmbientNodes) {
    try {
      const now = storyAmbientNodes.ctx.currentTime;
      storyAmbientNodes.gain.gain.linearRampToValueAtTime(0.001, now + 0.35);
      setTimeout(() => {
        try {
          if (storyAmbientNodes && storyAmbientNodes.sources) {
            storyAmbientNodes.sources.forEach(s => { s.stop(); s.disconnect(); });
          }
        } catch (_) {}
        storyAmbientNodes = null;
      }, 400);
    } catch (_) {
      storyAmbientNodes = null;
    }
  }
}

function playStorySceneBgm(step) {
  if (window.state && window.state.soundOn === false) return;
  const ctx = ensureAudioCtx();
  if (!ctx) return;

  stopStorySceneBgm();
  const now = ctx.currentTime;

  if (step === 4) {
    // 第 4 幕：時空蟲洞深層立體共振底音
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(65, now);
    osc.frequency.linearRampToValueAtTime(110, now + 1.5);
    osc.frequency.linearRampToValueAtTime(75, now + 3.0);
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    storyAmbientNodes = { ctx, gain, sources: [osc] };
  } else if (step === 5 || step === 6) {
    // 第 5、6 幕：暴風雪呼嘯寒風環境底音
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc1.type = "sine";
    osc2.type = "triangle";
    osc1.frequency.setValueAtTime(130, now);
    osc1.frequency.linearRampToValueAtTime(240, now + 1.8);
    osc1.frequency.linearRampToValueAtTime(115, now + 3.5);
    osc2.frequency.setValueAtTime(140, now);
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.5);
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    osc1.start(now);
    osc2.start(now);
    storyAmbientNodes = { ctx, gain, sources: [osc1, osc2] };
  } else if (step === 7) {
    // 第 7 幕：溫暖壁爐柴火燃燒底音
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(80, now);
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    storyAmbientNodes = { ctx, gain, sources: [osc] };
  }
}
window.playStorySceneBgm = playStorySceneBgm;
window.stopStorySceneBgm = stopStorySceneBgm;