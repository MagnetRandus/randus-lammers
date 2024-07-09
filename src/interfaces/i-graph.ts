import { GraphItem, IBaseField } from "./i-item";

export interface Items<Data extends GraphItem<Partial<IBaseField>>> {
  "@odata.context": string;
  value: Data[];
}
