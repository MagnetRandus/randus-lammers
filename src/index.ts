import { app, BrowserWindow, ipcMain, dialog, session } from "electron";
import dbq from "./api/db/dbq";
// eslint-disable-next-line import/no-unresolved
// import { writeFile } from "original-fs";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 720,
    width: 1080,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
    },
  });

  async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow);
    if (!canceled) {
      return filePaths;
    }
  }

  const dbO = new dbq();

  ipcMain.on("set-title", (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    if (win) win.setTitle(title);
  });

  ipcMain.on("write-db", (event, db) => {
    dbO.db = db;
  });

  /**
   * https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/assets/fonts/leelawadeeui-thai/leelawadeeui-semilight.woff2
   * https://res.cdn.office.net/files/fabric-cdn-prod_20240129.001/assets/icons/fabric-icons-a13498cf.woff
   */

  app.whenReady().then(() => {
    const defaultCPS = `'self' 'unsafe-eval' 'unsafe-inline' http://localhost:* ws://localhost:*`;
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [
            `default-src ${defaultCPS} *`,
            `font-src ${defaultCPS} *`,
            `img-src ${defaultCPS} *`,
            `style-src ${defaultCPS} *`,
            `font-src ${defaultCPS} *`,
          ],
        },
      });
    });

    ipcMain.handle("dialog:openFile", handleFileOpen);
    ipcMain.handle("read-db", function () {
      return dbO.db;
    });
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
