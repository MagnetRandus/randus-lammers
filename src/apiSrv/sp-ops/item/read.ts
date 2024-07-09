import { Items } from "../../../interfaces/i-graph";
import Config from "../../getConfig";
import { GraphItem, IBaseField } from "../../../interfaces/i-item";
import { IList } from "../../../interfaces/i-lists";
import { ISite } from "../../../interfaces/i-site";
import { BrandedString, UriParams } from "../uriParmBuild";

export async function readItem<K extends Partial<IBaseField>>(
  siteInf: ISite,
  lstInf: IList,
  ItemId: number
): Promise<GraphItem<K> | Error> {
  try {
    const cfg = await Config.getInstance();
    const createItemEndpoint = `/sites/${siteInf.id}/lists/${lstInf.id}/items/${ItemId}`;
    const response = await cfg.client.api(createItemEndpoint).get();
    return response;
  } catch (err) {
    if (err instanceof Error) return err;
  }
  return new Error(`Error is not of type Error in sp-ops/item/read`);
}

export async function readItems<K extends Partial<IBaseField>>(
  siteInf: ISite,
  lstInf: IList,
  expStr: BrandedString<UriParams>
): Promise<Items<GraphItem<K>> | Error> {
  try {
    const cfg = await Config.getInstance();
    const createItemEndpoint = `/sites/${siteInf.id}/lists/${lstInf.id}/items/`;
    const response = await cfg.client
      .api(createItemEndpoint)
      .expand(expStr)
      .get();
    return response;
  } catch (err) {
    if (err instanceof Error) return err;
  }
  return new Error(`Error is not of type Error in sp-ops/item/read`);
}
