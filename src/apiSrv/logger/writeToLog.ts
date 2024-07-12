import { IpcMainInvokeEvent } from "electron";
import { IPCLogWrite } from "iSurfaces/ipc";
import { Say } from "./logger";

export async function writeToLog(
  event: IpcMainInvokeEvent,
  ...args: Array<IPCLogWrite>
): Promise<void> {
  const say = Say.gI();
  const d = args[0];
  say.Info(d.Label, d.Message);
}
