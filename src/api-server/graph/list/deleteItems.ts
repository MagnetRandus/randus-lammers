/* eslint-disable @typescript-eslint/no-explicit-any */
import Config from "Local/config/config";

async function gphDeleteItems(siteId: string, listId: string, ItemIds: Array<string>): Promise<undefined> {
  const cfg = await Config.getInstance();

  const arrP = new Array<Promise<any>>();

  ItemIds.map((j) => {
    const createItemEndpoint = `/sites/${siteId}/lists/${listId}/items/${j}`;
    arrP.push(cfg.client.api(createItemEndpoint).delete());
  });

  await Promise.all(arrP);
}
export default gphDeleteItems;
