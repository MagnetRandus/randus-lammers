/* eslint-disable @typescript-eslint/no-explicit-any */

import { IpcMainInvokeEvent } from "electron";
import { Say } from "Local/logger/Logger";
import gphCreateItem from "Server/graph/item/create";
import SPInitSite from "Server/spInit";
import { RCloudCreateReturnItem } from "Types/cloud-item-create-rt";

async function cloudCreateItem<ReturnType, PayloadType>(event: IpcMainInvokeEvent, ...args: [string, PayloadType, any]): Promise<RCloudCreateReturnItem<ReturnType>> {
  const [listname, payload] = args;

  const spSiteInfo = await SPInitSite.getInstance();
  const siteInfo = await spSiteInfo.SiteRootInfo;

  return new Promise<RCloudCreateReturnItem<ReturnType>>((resolve, reject) => {
    gphCreateItem<any>(siteInfo.id, listname, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        Say.getInstance().Error("cloudCreateItem", err);

        if ("message" in err) {
          reject(err.message);
        } else {
          reject(`Error without a message, check log`);
        }
      });
  });
}
export default cloudCreateItem;
