import {
  ConfidentialClientApplication,
  IConfidentialClientApplication,
  ClientCredentialRequest,
  LogLevel,
} from "@azure/msal-node";
import { Client } from "@microsoft/microsoft-graph-client";
import { SysConfig } from "../interfaces/i-config";
import { randusGraphCall } from "../interfaces/i-graphcall";

export async function getGraphClient(sysconfig: SysConfig): Promise<Client> {
  const config = {
    auth: { ...sysconfig.credentials },
    system: {
      loggerOptions: {
        loggerCallback(
          loglevel: LogLevel,
          message: string,
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

export async function makeGraphCallAsync<T>(
  sysconfig: SysConfig,
  client: Client
): Promise<randusGraphCall<T> | Error> {
  try {
    const site = await client
      .api(`/sites/${sysconfig.spdomain}:/sites/${sysconfig.subsite}`)
      .get();
    return client.api(`/sites/${site.id}/lists`).get() as Promise<
      randusGraphCall<T>
    >;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return error as Error;
  }
}
