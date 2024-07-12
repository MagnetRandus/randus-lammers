import { CloudSPList } from "./cloud-splist";
import { BGender } from "./types";

interface CloudBaseItem extends Partial<CloudSPList> {
  tagnr: string;
  dateOfBirth: Date;
  sire: number;
  dam: number;
  gender: BGender;
}

type WithLookupId<T> = T & { sireLookupId: number; damLookupId: number };
type RemoveReadableLookups<T> = Omit<T, "sire" | "dam">;

type WithChangedTypes<T> = {
  [K in keyof T]: K extends "sireLookupId" | "damLookupId" ? number : T[K];
};
export type CloudBaseCU = WithChangedTypes<
  WithLookupId<RemoveReadableLookups<CloudBaseItem>>
>;
export type CloudBaseR = WithChangedTypes<WithLookupId<CloudBaseItem>>;
