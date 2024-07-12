/* eslint-disable @typescript-eslint/no-explicit-any */
// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from "electron";
import { IPCLogWrite } from "iSurfaces/ipc";
import { CloudBaseCU, CloudBaseR } from "iSurfaces/cloud-base-item";
import { BrandedString } from "iSurfaces/cloud-graph-endpoint";

const eapi = {
  setTitle: (title: string) => ipcRenderer.send("set-title", title),
  cloudWrite: (bbinf: Partial<CloudBaseCU>): Promise<CloudBaseR> =>
    ipcRenderer.invoke("cloudWrite", bbinf),
  cloudReadList: <T extends string>(
    endPoint: BrandedString<T>
  ): Promise<Array<CloudBaseR>> =>
    ipcRenderer.invoke("cloudReadList", endPoint),
  logWrite: (ipcloginfo: IPCLogWrite) =>
    ipcRenderer.invoke("log-write", ipcloginfo),
  openDialog: (): Promise<Array<string>> =>
    ipcRenderer.invoke("dialog:openFile"),
};

contextBridge.exposeInMainWorld("eapi", eapi);

export type ElectronHandler = typeof eapi;
