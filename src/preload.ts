/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from "electron";
import GraphResponse from "Interfaces/SP/graph-response";
import { RCloudCreateReturnItem } from "Types/cloud-item-create-rt";
import { TErrorLevel } from "Types/local-logging-properties";

const eapi = {
  setTitle: (title: string) => ipcRenderer.send("set-title", title),
  cloudCreateItem: <RT, PT>(listname: string, payload: PT): Promise<RCloudCreateReturnItem<RT>> => ipcRenderer.invoke("cloudCreateItem", listname, payload),
  cloudGetItems: <RT>(listname: string, extString: string): Promise<GraphResponse<RT>> => ipcRenderer.invoke("cloudGetItems", listname, extString),
  cloudUpdateItem: <RT, PT>(listname: string, itemId: number, payload: PT): Promise<RT> => ipcRenderer.invoke("cloudUpdateItem", listname, itemId, payload),
  cloudDeleteItems: <PT>(listname: string, payload: PT): Promise<undefined> => ipcRenderer.invoke("cloudDeleteItems", listname, payload),
  localLogging: (ErrLvl: TErrorLevel, Label: string, Message: string): any => ipcRenderer.send("localLogging", ErrLvl, Label, Message),
};

contextBridge.exposeInMainWorld("eapi", eapi);

export type ElectronHandler = typeof eapi;
