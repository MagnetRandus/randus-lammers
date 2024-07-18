/* eslint-disable @typescript-eslint/no-explicit-any */
import GraphResponse from "Interfaces/SP/graph-response";
import Config from "Local/config/config";

async function gphGetItems<RT>(siteId: string, listId: string, expStr: string): Promise<GraphResponse<RT>> {
  const cfg = await Config.getInstance();
  const createItemEndpoint = `/sites/${siteId}/lists/${listId}/items/`;
  const response = await cfg.client.api(createItemEndpoint).expand(expStr).get();

  return response;
}
export default gphGetItems;
