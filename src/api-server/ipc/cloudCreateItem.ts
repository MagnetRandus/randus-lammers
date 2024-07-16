/* eslint-disable @typescript-eslint/no-explicit-any */

import { IpcMainInvokeEvent } from "electron";
import { Say } from "Local/logger/Logger";
import gphCreateItem from "Server/graph/item/create";
import SPInitSite from "Server/spInit";
import { RCloudCreateReturnItem } from "Types/cloud-item-create-rt";

//(channel: string, listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => (Promise<any>) | (any)): void
async function cloudCreateItem<T>(event: IpcMainInvokeEvent, ...args: [string, any, any]): Promise<RCloudCreateReturnItem<T>> {
  const [listname, payload] = args;

  const spSiteInfo = await SPInitSite.getInstance();
  const siteInfo = await spSiteInfo.SiteRootInfo;
  Say.getInstance().Info("Got site", siteInfo.displayName);

  return new Promise<RCloudCreateReturnItem<T>>((resolve, reject) => {
    try {
      gphCreateItem<any>(siteInfo.id, listname, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      if (err instanceof Error) {
        reject(err);
      } else {
        Say.getInstance().Error(`WeirdnessIn:cloudCreateItem`, JSON.stringify(err));
        reject(`Unkown Error in cloudCreateItem refer to the log`);
      }
    }
  });
}
export default cloudCreateItem;
