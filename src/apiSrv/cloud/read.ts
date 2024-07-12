import { IpcMainInvokeEvent } from "electron";
import { cloudSPSite } from "iSurfaces/cloud-spsite";
import { Say } from "../logger/logger";
import { getList } from "../sp-ops/GetList";
import { gcSiteInfo } from "../sp-ops/GetSite";
import { IList } from "iSurfaces/iList";
import { Items } from "iSurfaces/cloud-graph-item";
import { CloudSPCustomList, CloudSPList } from "iSurfaces/cloud-splist";
import Config from "../getConfig";
import { BrandedString, UriParams } from "iSurfaces/cloud-graph-endpoint";

async function cloudReadItems<
  T extends UriParams,
  K extends Partial<CloudSPCustomList<CloudSPList>>,
>(
  siteInf: cloudSPSite,
  lstInf: IList,
  EndPoint: BrandedString<T>
): Promise<Items<K>> {
  const say = Say.gI();
  say.Info("INIT", "Log should be created");

  const cloudItems = await readItems<K>(siteInf, lstInf, EndPoint);

  if (cloudItems instanceof Error) {
    say.Error("CloudItemsRead Error", cloudItems.message);
    throw new Error("");
  } else {
    say.Info(
      "CloudItemsRead-Response",
      `Fetched [${cloudItems}] items from ${lstInf.displayName}`
    );
    return cloudItems;
  }
}

export async function cloudReadList<T extends UriParams>(
  event: IpcMainInvokeEvent,
  ...args: Array<BrandedString<T>>
) {
  const say = Say.gI();
  say.Info("CloudWrite-Request", JSON.stringify(args[0]));

  const listName = `base`;
  const siteInf = await gcSiteInfo();

  if (siteInf instanceof Error) {
    say.Error("CloudRead-siteInf", siteInf.message);
    throw new Error(siteInf.message);
  }

  const lstInf = await getList(siteInf.id, listName);

  if (lstInf instanceof Error) {
    say.Error("CloudRead-lstInf", lstInf.message);
    throw new Error(lstInf.message);
  }

  return cloudReadItems(siteInf, lstInf, args[0]);
}

export async function readItem<
  K extends Partial<CloudSPCustomList<CloudSPList>>,
>(
  siteInf: cloudSPSite,
  lstInf: IList,
  ItemId: number
): Promise<Items<K> | Error> {
  try {
    const cfg = await Config.getInstance();
    const createItemEndpoint = `/sites/${siteInf.id}/lists/${lstInf.id}/items/${ItemId}`;
    const response = await cfg.client.api(createItemEndpoint).get();
    return response;
  } catch (err) {
    if (err instanceof Error) return err;
  }
  return new Error(`Error is not of type Error in sp-ops/item/read`);
}

export async function readItems<
  K extends Partial<CloudSPCustomList<CloudSPList>>,
>(
  siteInf: cloudSPSite,
  lstInf: IList,
  expStr: BrandedString<UriParams>
): Promise<Items<K> | Error> {
  try {
    const cfg = await Config.getInstance();
    const createItemEndpoint = `/sites/${siteInf.id}/lists/${lstInf.id}/items/`;
    const response = await cfg.client
      .api(createItemEndpoint)
      .expand(expStr)
      .get();
    return response;
  } catch (err) {
    if (err instanceof Error) return err;
  }
  return new Error(`Error is not of type Error in sp-ops/item/read`);
}
