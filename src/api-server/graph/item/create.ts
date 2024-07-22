/* eslint-disable @typescript-eslint/no-explicit-any */
import IGraphListItem from "Interfaces/SP/graph-listitem";
import Config from "Local/config/config";

async function gphCreateItem<RT, PT>(siteId: string, listId: string, payload: Partial<IGraphListItem<PT>>): Promise<RT> {
  const cfg = await Config.getInstance();
  const createItemEndpoint = `/sites/${siteId}/lists/${listId}/items`;
  const newItem = await cfg.client.api(createItemEndpoint).post(payload);
  return newItem;
}
export default gphCreateItem;
