import { progressBar } from "./progressBar.js";
import { initRGBBorder } from './rbg.js';

progressBar()
setInterval(progressBar, 86400000);

document.addEventListener("DOMContentLoaded", () => {
  initRGBBorder({
    gradientId: "rgbGradient",
    speedInputId: "speed",
    schemeInputId: "scheme",
    centerX: 900,
    centerY: 700
  });
});