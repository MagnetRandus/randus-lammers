/* eslint-disable @typescript-eslint/no-explicit-any */

import { IpcMainInvokeEvent } from "electron";
import GraphResponse from "Interfaces/SP/graph-response";
import gphGetAllItems from "Server/graph/list/getItemsAll";
import SPInitSite from "Server/spInit";

async function cloudGetAllItems<RT>(event: IpcMainInvokeEvent, ...args: [string, string]): Promise<GraphResponse<RT>> {
  const [listname, ExpStr] = args;

  const spSiteInfo = await SPInitSite.getInstance();

  const siteInfo = await spSiteInfo.SiteRootInfo;

  return await gphGetAllItems<RT>(siteInfo.id, listname, ExpStr);
}
export default cloudGetAllItems;
