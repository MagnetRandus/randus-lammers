import Config from "../getConfig";
import { ISite } from "../interfaces/i-site";

export async function gcSiteInfo(): Promise<ISite | Error> {
  try {
    const cfg = Config.getInstance();
    const sysconfig = (await cfg).props;
    const client = (await cfg).client;

    const request = client.api(
      `/sites/${sysconfig.spdomain}:/sites/${sysconfig.subsite}`
    );

    return (await request.get()) as ISite;
  } catch (error) {
    if (error instanceof Error) {
      return error;
    } else {
      console.log(JSON.stringify(error));
      throw new TypeError(
        `Error thrown is not an instance of Error, so it can't be returned. Check the console for details.`
      );
    }
  }
}
