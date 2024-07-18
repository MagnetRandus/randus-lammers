/* eslint-disable @typescript-eslint/no-explicit-any */

import { IpcMainInvokeEvent } from "electron";
import GraphResponse from "Interfaces/SP/graph-response";
import gphGetItems from "Server/graph/list/getItems";
import SPInitSite from "Server/spInit";

async function cloudGetItems<RT>(event: IpcMainInvokeEvent, ...args: [string, string, any]): Promise<GraphResponse<RT>> {
  const [listname, ExpStr] = args;

  const spSiteInfo = await SPInitSite.getInstance();

  const siteInfo = await spSiteInfo.SiteRootInfo;

  return await gphGetItems<RT>(siteInfo.id, listname, ExpStr);
}
export default cloudGetItems;
