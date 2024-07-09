import {
  ConfidentialClientApplication,
  IConfidentialClientApplication,
  ClientCredentialRequest,
  LogLevel,
} from "@azure/msal-node";
import { Client } from "@microsoft/microsoft-graph-client";
import { sysProps } from "../interfaces/i-config";

export async function getGraphClient(sysconfig: sysProps): Promise<Client> {
  const config = {
    auth: { ...sysconfig.credentials },
    system: {
      loggerOptions: {
        loggerCallback(
          loglevel: LogLevel,
          message: string,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          containsPii: boolean
        ) {
          console.log(message);
        },
        piiLoggingEnabled: false,
        logLevel: LogLevel.Info,
      },
    },
  };

  const cca: IConfidentialClientApplication = new ConfidentialClientApplication(
    config
  );

  const clientCredentialRequest: ClientCredentialRequest = {
    scopes: ["https://graph.microsoft.com/.default"], // replace with your resource
  };

  const response = await cca.acquireTokenByClientCredential(
    clientCredentialRequest
  );

  return Client.init({
    authProvider: (done) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      done(null, response!.accessToken);
    },
  });
}
