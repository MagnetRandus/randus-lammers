import { cloudSPSite } from "iSurfaces/cloud-spsite";
import Config from "../../getConfig";
import { CloudSPList } from "iSurfaces/cloud-splist";
import { IList } from "iSurfaces/iList";

async function createItem<K extends Partial<CloudSPList>, T>(
  siteInf: cloudSPSite,
  lstInf: IList,
  payload: Partial<K>
): Promise<T | Error> {
  try {
    const cfg = await Config.getInstance();
    const createItemEndpoint = `/sites/${siteInf.id}/lists/${lstInf.id}/items`;
    const newItem = await cfg.client
      .api(createItemEndpoint)
      .post({ fields: payload });
    return newItem;
  } catch (err) {
    if (err instanceof Error) return err;
  }
  return new Error(`Error is not of type Error`);
}

export default createItem;
