/* =========================================================================
   🎄 3D 麥塊聖誕冒險教室 (Minecraft Christmas 3D) - 螢幕自動適配器 (screen-adaptor.js)
   - 基準設計尺寸: 1920 x 1080 (16:9 最佳黃金比例)
   - 自動判斷視窗/大屏尺寸，動態等比縮放，確保全介面與熱區零跑位
   ========================================================================= */

(function () {
  const BASE_WIDTH = 1920;
  const BASE_HEIGHT = 1080;

  window.currentStageScale = 1;

  function applyStageScale() {
    const stage = document.getElementById("virtualStage");
    if (!stage) return;

    const winW = window.innerWidth || document.documentElement.clientWidth;
    const winH = window.innerHeight || document.documentElement.clientHeight;

    const scaleX = winW / BASE_WIDTH;
    const scaleY = winH / BASE_HEIGHT;
    const scale = Math.min(scaleX, scaleY);

    window.currentStageScale = scale;

    stage.style.transform = `scale(${scale})`;
    stage.style.transformOrigin = "center center";
  }

  window.applyStageScale = applyStageScale;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyStageScale);
  } else {
    applyStageScale();
  }

  window.addEventListener("load", applyStageScale);
  window.addEventListener("resize", applyStageScale);
  window.addEventListener("orientationchange", () => {
    setTimeout(applyStageScale, 150);
  });
  document.addEventListener("fullscreenchange", () => {
    setTimeout(applyStageScale, 50);
  });
  document.addEventListener("webkitfullscreenchange", () => {
    setTimeout(applyStageScale, 50);
  });
  document.addEventListener("mozfullscreenchange", () => {
    setTimeout(applyStageScale, 50);
  });
  document.addEventListener("MSFullscreenChange", () => {
    setTimeout(applyStageScale, 50);
  });
})();
