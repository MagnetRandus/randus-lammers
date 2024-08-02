import IGraphListItem from "Interfaces/SP/graph-listitem";
import { FieldsCustom } from "Interfaces/SP/graph-listitem-field";

export interface IGCLICFSires {
  bbRef: string;
  sireRef: string;
}

export type TSPLBSireRead = IGraphListItem<FieldsCustom<IGCLICFSires>>; //has contentType (caml case)

export type TSPLBSireReadItem = FieldsCustom<IGCLICFSires>;

type TSPListBaseA<T> = Omit<T, "bbRef" | "sireRef">;
type TSPListBaseAA<T> = TSPListBaseA<T> & { bbRefLookupId: string | undefined; sireRefLookupId: string | undefined };

export type TSPLBSireCreate = TSPListBaseAA<IGCLICFSires>; //Type of Creating an item
