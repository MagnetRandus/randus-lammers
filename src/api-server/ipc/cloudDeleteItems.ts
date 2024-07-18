/* eslint-disable @typescript-eslint/no-explicit-any */

import { IpcMainInvokeEvent } from "electron";
import gphDeleteItems from "Server/graph/list/deleteItems";
import SPInitSite from "Server/spInit";

async function cloudDeleteItems<PayloadType extends Array<string>>(event: IpcMainInvokeEvent, ...args: [string, PayloadType]): Promise<undefined> {
  const [listname, ItemIds] = args;
  const spSiteInfo = await SPInitSite.getInstance();
  const siteInfo = await spSiteInfo.SiteRootInfo;
  return gphDeleteItems(siteInfo.id, listname, ItemIds);
}
export default cloudDeleteItems;
