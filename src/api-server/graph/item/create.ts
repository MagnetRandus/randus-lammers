/* eslint-disable @typescript-eslint/no-explicit-any */
import Config from "Local/config/config";

async function gphCreateItem<T>(siteId: string, listId: string, payload: any): Promise<T> {
  const cfg = await Config.getInstance();
  const createItemEndpoint = `/sites/${siteId}/lists/${listId}/items`;
  const newItem = await cfg.client.api(createItemEndpoint).post({ fields: payload });
  return newItem;
}
export default gphCreateItem;
