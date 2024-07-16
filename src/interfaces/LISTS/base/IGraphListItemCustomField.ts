import IGraphListItem from "Interfaces/SP/graph-listitem";
import { Gender } from "Types/Gender";

export interface IGraphListItemCustomFieldRead {
  tagnr: string;
  dateOfBirth: Date;
  sire: number;
  dam: number;
  gender: Gender;
}

export type WithSPFields<T> = T & IGraphListItem;

export type IGraphLIstItemCustomFieldCreate<T extends IGraphListItemCustomFieldRead> = Omit<T, "sire" | "dam"> & { damLookupId: number; sireLookupId: number };

export type TCreateItemBase = IGraphLIstItemCustomFieldCreate<IGraphListItemCustomFieldRead>;
export type TReadItemBase = WithSPFields<IGraphListItemCustomFieldRead>;
