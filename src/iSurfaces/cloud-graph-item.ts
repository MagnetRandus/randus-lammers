import { CloudSPList, CloudSPCustomList } from "./cloud-splist";

export interface Items<Data extends Partial<CloudSPCustomList<CloudSPList>>> {
  "@odata.context": string;
  value: Data[];
}
