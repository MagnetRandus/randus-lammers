/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
//Singleton

import SPSiteRoot from "Interfaces/SPSiteRoot";
import Config from "Local/config/config";
import { Say } from "Local/logger/Logger";

type RVAL = SPSiteRoot;

class SPInitSite {
  private static instance: SPInitSite;
  private siterootinfo: RVAL | null = null;
  private constructor() {}

  public get SiteRootInfo(): Promise<RVAL> {
    return this.init();
  }

  public static async getInstance(): Promise<SPInitSite> {
    if (!SPInitSite.instance) {
      SPInitSite.instance = new SPInitSite();
      try {
        await SPInitSite.instance.init();
      } catch (err) {
        Say.getInstance().Error("SPInitSite Error", JSON.stringify(err));
      }
    }
    return SPInitSite.instance;
  }

  private async init(): Promise<RVAL> {
    if (this.siterootinfo) {
      return this.siterootinfo;
    }

    try {
      const cfg = Config.getInstance();
      const sysconfig = (await cfg).props;
      const client = (await cfg).client;

      const request = client.api(`/sites/${sysconfig.spdomain}:/sites/${sysconfig.subsite}`);
      this.siterootinfo = await request.get();

      Say.getInstance().Info("Graph Roundtrip", "");

      if (!this.siterootinfo) {
        throw new Error("Failed to fetch site root info.");
      }

      return this.siterootinfo;
    } catch (error) {
      Say.getInstance().Error("SPInit Error", JSON.stringify(error));
      throw error;
    }
  }
}

export default SPInitSite;
