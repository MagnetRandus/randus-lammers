// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from "electron";
import IDBStruct from "./api/interfaces/dbSchema";

const eapi = {
  setTitle: (title: string) => ipcRenderer.send("set-title", title),
  useGraph: (doWhat: string) => ipcRenderer.invoke("use-graph", doWhat),
  dbWrite: (db: IDBStruct) => ipcRenderer.send("write-db", db),
  dbRead: (): Promise<IDBStruct> => ipcRenderer.invoke("read-db"),
  openDialog: (): Promise<Array<string>> =>
    ipcRenderer.invoke("dialog:openFile"),
};

contextBridge.exposeInMainWorld("eapi", eapi);

export type ElectronHandler = typeof eapi;
