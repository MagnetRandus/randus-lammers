// import Config from "../../getConfig";
// import { IList } from "../../../interfaces/i-lists";
// import { ISite } from "../../../interfaces/i-site";

// async function deleteItem(
//   siteInf: ISite,
//   lstInf: IList,
//   ItemId: number
// ): Promise<undefined | Error> {
//   try {
//     const cfg = await Config.getInstance();
//     const createItemEndpoint = `/sites/${siteInf.id}/lists/${lstInf.id}/items/${ItemId}`;
//     const response = await cfg.client.api(createItemEndpoint).delete();
//     return response;
//   } catch (err) {
//     if (err instanceof Error) return err;
//   }
//   return new Error(`Error is not of type Error in sp-ops/item/read`);
// }
// export default deleteItem;
