/* eslint-disable @typescript-eslint/no-explicit-any */

import { IpcMainInvokeEvent } from "electron";
import gphUpdateItem from "Server/graph/item/updateItem";
import SPInitSite from "Server/spInit";
import { RCloudCreateReturnItem } from "Types/cloud-item-create-rt";

async function cloudUpdateItem<ReturnType, PayloadType>(event: IpcMainInvokeEvent, ...args: [string, number, PayloadType]): Promise<RCloudCreateReturnItem<ReturnType>> {
  const [listname, ItemId, payload] = args;

  const spSiteInfo = await SPInitSite.getInstance();
  const siteInfo = await spSiteInfo.SiteRootInfo;

  return gphUpdateItem(siteInfo.id, listname, ItemId, payload);
}
export default cloudUpdateItem;
