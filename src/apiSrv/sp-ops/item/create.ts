import Config from "../../getConfig";
import { GraphItem, IBaseField } from "../../interfaces/i-item";
import { IList } from "../../interfaces/i-lists";
import { ISite } from "../../interfaces/i-site";

async function createItem<K extends Partial<IBaseField>>(
  siteInf: ISite,
  lstInf: IList,
  payload: Partial<K>
): Promise<GraphItem<K> | Error> {
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
