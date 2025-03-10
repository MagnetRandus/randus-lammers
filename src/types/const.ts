import { TableRowId } from "@fluentui/react-table";
import BaseSiresCreate from "Interfaces/BaseSires";
import { TSPLBWeightCreate } from "Interfaces/LISTS/trace/IGLICF-Weight";

export const formDefaults: BaseSiresCreate = {
  tagnr: "0",
  dateOfBirth: new Date(),
  damLookupId: undefined,
  bbSks: "Buck",
  bbWeight: 0,
  Sires: undefined,
  bbStatus: "Alive",
};
export const RELOAD = `!RELOAD!`;

export const rowDefaultSelection = new Set<TableRowId>([0]);

export const TraceWeightContentTypeId = "0x0100054D85AE9A2CB54A9E309347916952E40100B9A6472166C2C34D9CE5F92D1A304575";

export function FormDefaultsWeightInit(bbRefLookupId: number | undefined): TSPLBWeightCreate {
  if (bbRefLookupId)
    return {
      bbDate: new Date(),
      bbRefLookupId: bbRefLookupId,
      bbWeight: 0.0,
    };
  throw new Error(`Unable to init Weight form without an ItemId`);
}
