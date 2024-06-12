// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from "electron";
import { ISchemaA } from "./api/interfaces/dbSchema";

const eapi = {
  setTitle: (title: string) => ipcRenderer.send("set-title", title),
  writeFile: (data: ISchemaA[]) => ipcRenderer.send("write-file", data),
  dbRead: (resolve: (data: ISchemaA[]) => void) =>
    ipcRenderer.send("read-db", resolve),
};

contextBridge.exposeInMainWorld("eapi", eapi);

export type ElectronHandler = typeof eapi;
