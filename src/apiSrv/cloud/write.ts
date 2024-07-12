/* eslint-disable @typescript-eslint/no-explicit-any */
import { IpcMainInvokeEvent } from "electron";
import { Say } from "../logger/logger";
import { gcSiteInfo } from "../sp-ops/GetSite";
import { getList } from "../sp-ops/GetList";
import createItem from "../sp-ops/item/create";
import { CloudBaseCU, CloudBaseR } from "iSurfaces/cloud-base-item";
import { cloudSPSite } from "iSurfaces/cloud-spsite";
import { IList } from "iSurfaces/iList";

async function readItem(
  siteInf: cloudSPSite,
  lstInf: IList,
  payload: Partial<CloudBaseCU>
): Promise<CloudBaseR> {
  const say = Say.gI();
  say.Info("INIT", "Log should be created");

  const createditm = await createItem<CloudBaseCU, CloudBaseR>(
    siteInf,
    lstInf,
    payload
  );

  if (createditm instanceof Error) {
    say.Error("CloudWrite Error", createditm.message);
    throw new Error("");
  } else {
    say.Info("CloudWrite-Response", JSON.stringify(createditm));
    return createditm;
  }
}

export async function cloudWrite(
  event: IpcMainInvokeEvent,
  ...args: Array<Partial<CloudBaseCU>>
): Promise<CloudBaseR> {
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

  return await readItem(siteInf, lstInf, args[0]);
}
