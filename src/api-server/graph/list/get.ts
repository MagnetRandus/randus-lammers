/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
//Singleton

import Config from "Local/config/config";
import { Say } from "Local/logger/Logger";

type RVAL = any;

class SPInitList {
  private static instance: SPInitList;
  private lstInfo: RVAL | null = null;

  private constructor(private ListName: string) {}

  public get ListInfo(): Promise<RVAL> {
    return this.init(SPInitList.instance.ListName);
  }

  public static async getInstance(ListName: string): Promise<SPInitList> {
    if (!SPInitList.instance) {
      SPInitList.instance = new SPInitList(ListName);
      try {
        await SPInitList.instance.init(ListName);
      } catch (err) {
        Say.getInstance().Error("SPInitList Error", JSON.stringify(err));
      }
    }
    return SPInitList.instance;
  }

  private async init(listname: string): Promise<RVAL> {
    if (this.lstInfo) {
      return this.lstInfo;
    }

    try {
      const cfg = Config.getInstance();
      const sysconfig = (await cfg).props;
      const client = (await cfg).client;

      const request = client.api(`/sites/${sysconfig.spdomain}:/sites/${sysconfig.subsite}/lists/${listname}`);
      this.lstInfo = await request.get();

      Say.getInstance().Info("Graph Roundtrip SPInitList", "");

      if (!this.lstInfo) {
        throw new Error("Failed to fetch site root info.");
      }

      return this.lstInfo;
    } catch (error) {
      Say.getInstance().Error("SPInit Error", JSON.stringify(error));
      throw error;
    }
  }
}

export default SPInitList;
