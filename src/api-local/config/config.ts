/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client } from "@microsoft/microsoft-graph-client";
import { sep } from "path";
import { ClientCredentialRequest, ConfidentialClientApplication, IConfidentialClientApplication, LogLevel } from "@azure/msal-node";
import { readFile } from "fs/promises";
import { sysProps } from "Interfaces/SysProps";
import { decode, JwtPayload } from "jsonwebtoken";
import { Say } from "Local/logger/Logger";

class Config {
  private static instance: Config;
  private _props?: sysProps;
  private _client?: Client;
  private tokenExpiry: number | null = null;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
  get props() {
    if (this._props === undefined) {
      throw new Error("Config is not initialized");
    }
    return this._props;
  }

  get client() {
    if (this._client === undefined) {
      throw new Error("Client is not initialized");
    }
    return this._client;
  }
  public static async getInstance(): Promise<Config> {
    if (!Config.instance) {
      Config.instance = new Config();
      await Config.instance.init();
    } else if (Config.instance.isTokenExpired()) {
      await Config.instance.init();
    }
    return Config.instance;
  }
  private async init() {
    try {
      // Load config
      const currentDir = process.cwd();
      const configFileContent = await readFile(`${currentDir}${sep}config${sep}config.json`, "utf8");
      this._props = JSON.parse(configFileContent);

      // Create client
      if (this._props !== undefined) {
        await this.graphclient(this._props);
      }
    } catch (error) {
      console.error("Error initializing GlobalConfig", error);
    }
  }
  private async graphclient(sysconfig: sysProps): Promise<void> {
    const cca: IConfidentialClientApplication = new ConfidentialClientApplication({
      auth: { ...sysconfig.credentials },
      system: {
        loggerOptions: {
          loggerCallback(loglevel: LogLevel, message: string, containsPii: boolean) {
            Say.getInstance().Info(`graphclient-${loglevel}`, `${message} [containsPii:${containsPii}]`);
          },
          piiLoggingEnabled: false,
          logLevel: LogLevel.Info,
        },
      },
    });

    const clientCredentialRequest: ClientCredentialRequest = {
      scopes: ["https://graph.microsoft.com/.default"], // replace with your resource
    };

    const response = await cca.acquireTokenByClientCredential(clientCredentialRequest);

    if (response && response.accessToken) {
      const decodedToken = decode(response.accessToken) as JwtPayload;
      if (decodedToken && decodedToken.exp) {
        this.tokenExpiry = decodedToken.exp * 1000; // Convert to milliseconds

        this._client = Client.init({
          authProvider: (done) => {
            done(null, response.accessToken);
          },
        });

        Say.getInstance().Info("graphclient", `Token Expires: ${response.expiresOn}`);
      }
    } else {
      throw new Error("Failed to acquire token.");
    }

    if (this._client === undefined) {
      this._client = Client.init({
        authProvider: (done) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          done(null, response!.accessToken);
        },
      });
    }
  }
  isTokenExpired(): boolean {
    if (!this.tokenExpiry) {
      return true;
    }
    return new Date().getTime() > this.tokenExpiry;
  }
}

export default Config;
