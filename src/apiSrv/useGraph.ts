import { IpcMainInvokeEvent } from "electron";
import { getGraphClient } from "./graph/client";
import { SysConfig } from "./interfaces/i-config";
import { readFile } from "fs";
import { sep } from "path";
import { ISite } from "./interfaces/i-site";

export type graphDoWhat = "ONE";

async function getConfig(): Promise<SysConfig> {
  return new Promise<SysConfig>((resolve, reject) => {
    const tgtConfig = `${process.cwd()}${sep}config${sep}config.json`;
    readFile(tgtConfig, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

export async function UseGraph(
  event: IpcMainInvokeEvent,
  ...args: never[]
): Promise<void> {
  const flSysConfig = await getConfig();
  const client = await getGraphClient(flSysConfig);
  const siteInf = (await client
    .api(`/sites/${flSysConfig.spdomain}:/sites/${flSysConfig.subsite}`)
    .get()) as ISite;
  const [UseGraphParam1] = args;
  switch (UseGraphParam1 as graphDoWhat) {
    case "ONE":
      console.log("REQUESTING FUNCTION site info");
      console.dir(siteInf);
      break;
  }
}
