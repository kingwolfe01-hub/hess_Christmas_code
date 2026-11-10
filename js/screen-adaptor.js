/* =========================================================================
   🎄 3D 麥塊聖誕冒險教室 (Minecraft Christmas 3D) - 螢幕自動適配器 (screen-adaptor.js)
   - 基準設計尺寸: 1920 x 1080 (16:9 最佳黃金比例)
   - 自動判斷視窗/大屏/Pad/手機尺寸，動態等比縮放，確保全介面與熱區零跑位
   ========================================================================= */

(function () {
  const BASE_WIDTH = 1920;
  const BASE_HEIGHT = 1080;

  window.currentStageScale = 1;

  function applyStageScale() {
    const stage = document.getElementById("virtualStage");
    if (!stage) return;

    let winW = window.innerWidth || document.documentElement.clientWidth;
    let winH = window.innerHeight || document.documentElement.clientHeight;

    // 優先使用 visualViewport 精確取得行動裝置 (iOS Safari / Chrome) 可視高度，排除網址列誤差
    if (window.visualViewport && window.visualViewport.width && window.visualViewport.height) {
      winW = window.visualViewport.width;
      winH = window.visualViewport.height;
    }

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

  // 針對行動裝置 (iPad / iPhone) 橫豎屏旋轉後的非同步延遲進行多段式校正
  window.addEventListener("orientationchange", () => {
    setTimeout(applyStageScale, 50);
    setTimeout(applyStageScale, 150);
    setTimeout(applyStageScale, 300);
    setTimeout(applyStageScale, 500);
  });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", applyStageScale);
  }

  // 全螢幕切換事件
  ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"].forEach((evt) => {
    document.addEventListener(evt, () => {
      setTimeout(applyStageScale, 50);
      setTimeout(applyStageScale, 200);
    });
  });
})();
