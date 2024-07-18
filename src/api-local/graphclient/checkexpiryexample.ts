// import { Client } from "@microsoft/microsoft-graph-client";
// import { sep } from "path";
// import { ClientCredentialRequest, ConfidentialClientApplication, IConfidentialClientApplication, LogLevel } from "@azure/msal-node";
// import { readFile } from "fs/promises";
// import chalk from "chalk";
// import { sysProps } from "Interfaces/SysProps";

// class Config {
//     private static instance: Config;
//     private _props?: sysProps;
//     private _client?: Client;
//     private tokenExpiry: Date | null = null;

//     private constructor() {}

//     get props() {
//         if (this._props === undefined) {
//             throw new Error("Config is not initialized");
//         }
//         return this._props;
//     }

//     get client(): Promise<Client> {
//         if (this._client === undefined || this.isTokenExpired()) {
//             throw new Error("Client is not initialized or token has expired");
//         }
//         return Promise.resolve(this._client);
//     }

//     public static async getInstance(forceClientInit = false): Promise<Config> {
//         if (!Config.instance) {
//             Config.instance = new Config();
//             await Config.instance.init();
//         } else if (forceClientInit) {
//             await Config.instance.init();
//         }
//         return Config.instance;
//     }

//     private async init() {
//         try {
//             const currentDir = process.cwd();
//             const configFileContent = await readFile(`${currentDir}${sep}config${sep}config.json`, "utf8");
//             this._props = JSON.parse(configFileContent);

//             if (this._props !== undefined) {
//                 await this.graphclient(this._props);
//             }
//         } catch (error) {
//             console.error("Error initializing GlobalConfig", error);
//         }
//     }

//     private async graphclient(sysconfig: sysProps): Promise<void> {
//         const cca: IConfidentialClientApplication = new ConfidentialClientApplication({
//             auth: { ...sysconfig.credentials },
//             system: {
//                 loggerOptions: {
//                     loggerCallback(loglevel: LogLevel, message: string, containsPii: boolean) {
//                         console.log(message);
//                     },
//                     piiLoggingEnabled: false,
//                     logLevel: LogLevel.Info,
//                 },
//             },
//         });

//         const clientCredentialRequest: ClientCredentialRequest = {
//             scopes: ["https://graph.microsoft.com/.default"], // replace with your resource
//         };

//         const response = await cca.acquireTokenByClientCredential(clientCredentialRequest);

//         this.tokenExpiry = new Date(); // Set the current time
//         this.tokenExpiry.setSeconds(this.tokenExpiry.getSeconds() + response?.expiresIn);

//         if (this._client === undefined || this.isTokenExpired()) {
//             this._client = Client.init({
//                 authProvider: (done) => {
//                     done(null, response.accessToken);
//                 },
//             });
//         }
//     }

//     private isTokenExpired(): boolean {
//         if (!this.tokenExpiry) {
//             return true;
//         }
//         return new Date() > this.tokenExpiry;
//     }
// }

// export default Config;
