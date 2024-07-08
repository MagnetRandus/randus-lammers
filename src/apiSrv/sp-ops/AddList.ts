import Config from "../getConfig";
import { IList } from "../interfaces/i-lists";

async function addList(siteId: string, displayName: string): Promise<IList> {
  const cfg = Config.getInstance();
  const q = (await cfg).client.api(`/sites/${siteId}/lists`).post({
    displayName: displayName,
    list: {
      template: "genericList",
    },
  });
  return q;
}

export default addList;
