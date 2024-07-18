/* eslint-disable @typescript-eslint/no-explicit-any */
import Config from "Local/config/config";

async function gphUpdateItem<T>(siteId: string, listId: string, ItemId: number, payload: any): Promise<T> {
  const cfg = await Config.getInstance();
  const endpoint = `/sites/${siteId}/lists/${listId}/items/${ItemId}`;
  const newItem = await cfg.client.api(endpoint).update({ fields: payload });
  return newItem;
}
export default gphUpdateItem;
