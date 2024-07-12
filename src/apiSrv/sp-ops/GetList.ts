import { IList } from "iSurfaces/iList";
import Config from "../getConfig";

/**
 *
 * @param siteId
 * @param clientInitd
 * @param identifier {list-id} or {list-title}
 * @returns
 * #Ref:https://learn.microsoft.com/en-us/graph/api/list-get?view=graph-rest-1.0&tabs=http
 */
export async function getList(
  siteId: string,
  identifier: string
): Promise<IList | Error> {
  const cfg = Config.getInstance();
  return (await cfg).client.api(`/sites/${siteId}/lists/${identifier}`).get();
}
