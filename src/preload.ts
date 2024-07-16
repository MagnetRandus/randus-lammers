/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from "electron";
import { RCloudCreateReturnItem } from "Types/cloud-item-create-rt";
import { TErrorLevel } from "Types/local-logging-properties";

const eapi = {
  setTitle: (title: string) => ipcRenderer.send("set-title", title),
  cloudCreateItem: <T>(listname: string, payload: any): Promise<RCloudCreateReturnItem<T>> => ipcRenderer.invoke("cloudCreateItem", listname, payload),
  localLogging: (a: TErrorLevel, Label: string, Message: string): any => ipcRenderer.send("localLogging", a, Label, Message),
};

contextBridge.exposeInMainWorld("eapi", eapi);

export type ElectronHandler = typeof eapi;
