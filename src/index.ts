import { app, BrowserWindow, ipcMain } from "electron";
// eslint-disable-next-line import/no-unresolved
// import { writeFile } from "original-fs";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

import * as path from "path";
import readFromJsonlFile from "./api/db/read";
import { ISchemaA } from "./api/interfaces/dbSchema";
import writeToJsonlFile from "./api/db/write";

// import { ISchemaA } from "./api/interfaces/dbSchema";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
    },
  });

  ipcMain.on("set-title", (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title);
  });

  ipcMain.on("write-file", (event, data: ISchemaA[]) => {
    writeToJsonlFile(path.join(__dirname, "../../assets/db/data.jsonl"), data)
      .then(() => console.log("Data written successfully"))
      .catch((err) => console.error("Error writing data:", err));
  });

  ipcMain.on("read-db", (event, response: (response: ISchemaA[]) => void) => {
    console.log(`READING FROM DB..........`);
    readFromJsonlFile(path.join(__dirname, "../../assets/db/data.jsonl"))
      .then((data) => {
        response(data);
      })
      .catch((err) => console.error("Error reading data:", err));
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
