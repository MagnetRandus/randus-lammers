import IGraphListItem from "Interfaces/SP/graph-listitem";
import { FieldsCustom } from "Interfaces/SP/graph-listitem-field";

interface IGCLICFWeight {
  bbDate: Date;
  bbWeight: number;
  bbRef: number; //Lookup
}

export type TSPLBWeightRead = IGraphListItem<FieldsCustom<IGCLICFWeight>>; //has contentType (caml case)

export type TSPLBWeightReadItem = FieldsCustom<IGCLICFWeight>;

type TSPListBaseA<T> = Omit<T, "bbRef">;
type TSPListBaseAA<T> = TSPListBaseA<T> & { bbRefLookupId: number | null };

export type TSPLBWeightCreate = TSPListBaseAA<IGCLICFWeight>; //Type of Creating an item
