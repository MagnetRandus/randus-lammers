/* eslint-disable @typescript-eslint/no-unused-vars */
import { IpcMainInvokeEvent } from "electron";
import { testListName_Read } from "./interfaces/fields/testListName";
import { Say } from "./logger/logger";
import { readItems } from "./sp-ops/item/read";
import { gcSiteInfo } from "./sp-ops/GetSite";
import { getList } from "./sp-ops/GetList";
import { IList } from "./interfaces/i-lists";
import { ISite } from "./interfaces/i-site";
import { uriParamsBuild } from "./sp-ops/uriParmBuild";

export type graphDoWhat = "read" | "create" | "update" | "delete";

async function rI(siteInf: ISite, lstInf: IList) {
  const say = Say.gI();
  say.Info("INIT", "Log should be created");

  const rReadItems = await readItems<testListName_Read>(
    siteInf,
    lstInf,
    uriParamsBuild<testListName_Read>("fields", [
      "firstColumn",
      "SecondColumn",
      "ThirdColumn",
      "lkpDocs",
    ])
  );
  if (rReadItems instanceof Error) {
    say.Error("rReadItems", rReadItems);
  } else {
    say.Info("Read Items", JSON.stringify(rReadItems.value[0].fields.lkpDocs));
  }
}

export async function UseGraph(
  event: IpcMainInvokeEvent,
  ...args: never[]
): Promise<void> {
  const listName = `testListName`;
  const siteInf = await gcSiteInfo();

  if (siteInf instanceof Error) {
    throw new Error(siteInf.message);
  }

  const lstInf = await getList(siteInf.id, listName);

  rI(siteInf, lstInf);
}
