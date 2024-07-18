import IGraphListItem from "Interfaces/SP/graph-listitem";
import { FieldsCustom } from "Interfaces/SP/graph-listitem-field";
import { Gender } from "Types/Gender";

interface IGraphListItemCustomFieldRead {
  tagnr: string;
  dateOfBirth: Date;
  sire: number;
  dam: number;
  gender: Gender;
}

/**
 * This type provide the default SharePoint List interface, plus the custom added fields
 */
export type TSPListBaseRead = IGraphListItem<FieldsCustom<IGraphListItemCustomFieldRead>>;

export type TSPListBaseReadItem = FieldsCustom<IGraphListItemCustomFieldRead>;

/**
 * Can write this as one, but its harder to read:
    type TSPListBaseA<T> = Omit<T & {sireLookupId:number, damLookupId:number}, "sire" | "dam">;
 */

type TSPListBaseA<T> = Omit<T, "sire" | "dam">;
type TSPListBaseAA<T> = TSPListBaseA<T> & { sireLookupId: number; damLookupId: number };

export type TSPListBaseCreate = TSPListBaseAA<IGraphListItemCustomFieldRead>; //Type of Creating an item

export type TSPListBaseUpdate = TSPListBaseCreate & { Id: number }; //Type for updating an item
