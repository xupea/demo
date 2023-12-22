/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
function screenshotWithRust(event) {
  window.electron.screenshotWithRust(event.shiftKey);
}

function screenshotWithNiuNiu(event) {
  window.electron.screenshotWithNiuNiu(event.shiftKey);
}

function imageViewer(event) {
  window.electron.imageViewer();
}

document.getElementById("screenshotWithRust").addEventListener("click", screenshotWithRust);
document.getElementById("screenshotWithNiuNiu").addEventListener("click", screenshotWithNiuNiu);
document.getElementById("imageViewer").addEventListener("click", imageViewer);
