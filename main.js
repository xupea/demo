// Modules to control application life and create native browser window
const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
const path = require("node:path");
const child = require("child_process");
const Screenshots = require("electron-screenshots");

function screenShot() {
  const screenshots = new Screenshots();
  globalShortcut.register("ctrl+shift+b", () => {
    screenshots.startCapture();
  });
  // 点击确定按钮回调事件
  screenshots.on("ok", (e, buffer, bounds) => {
    console.log("capture", buffer, bounds);
  });
  // 点击取消按钮回调事件
  screenshots.on("cancel", () => {
    console.log("capture", "cancel1");
  });
  screenshots.on("cancel", (e) => {
    // 执行了preventDefault
    // 点击取消不会关闭截图窗口
    e.preventDefault();
    console.log("capture", "cancel2");
  });
  // 点击保存按钮回调事件
  screenshots.on("save", (e, buffer, bounds) => {
    console.log("capture", buffer, bounds);
  });
  // 保存后的回调事件
  screenshots.on("afterSave", (e, buffer, bounds, isSaved) => {
    console.log("capture", buffer, bounds);
    console.log("isSaved", isSaved); // 是否保存成功
  });
}

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

ipcMain.handle("screenshot-niuniu", async (event, args) => {
  const screenShotExePath = path.join(
    __dirname,
    "NiuniuCapture.app/Contents/MacOS/NiuniuCapture"
  );
  const screenShotPatharam = [
    "startfromlocal," +
      path.join(__dirname, "set.info ") +
      "," +
      path.join(__dirname, "response.info") +
      ",0,3,0,0,0,0,0",
  ];
  child
    .spawn(screenShotExePath, screenShotPatharam, { stdio: "inherit" })
    .on("close", function (code) {
      // finishShot(code);
    });
});

ipcMain.handle("screenshot-rust", async (event, args) => {
  if (args) {
    mainWindow.hide();
  }

  const screenshots = new Screenshots();
  screenshots.startCapture();
  // 点击确定按钮回调事件
  screenshots.on("ok", (e, buffer, bounds) => {
    mainWindow.show();
    console.log("capture", buffer, bounds);
  });
  // 点击取消按钮回调事件
  screenshots.on("cancel", () => {
    console.log("capture", "cancel1");
  });
  screenshots.on("cancel", (e) => {
    // 执行了preventDefault
    // 点击取消不会关闭截图窗口
    e.preventDefault();
    console.log("capture", "cancel2");
  });
  // 点击保存按钮回调事件
  screenshots.on("save", (e, buffer, bounds) => {
    console.log("capture", buffer, bounds);
  });
  // 保存后的回调事件
  screenshots.on("afterSave", (e, buffer, bounds, isSaved) => {
    console.log("capture", buffer, bounds);
    console.log("isSaved", isSaved); // 是否保存成功
  });
  return "screenshot";
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  screenShot();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
