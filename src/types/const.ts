import { TableRowId } from "@fluentui/react-table";
import { TSPListBaseCreate } from "Interfaces/LISTS/base/IGraphListItemCustomField";
import { TSPLBWeightCreate } from "Interfaces/LISTS/trace/IGLICF-Weight";

export const formDefaults: TSPListBaseCreate = {
  tagnr: "0",
  dateOfBirth: new Date(),
  damLookupId: 0,
  sireLookupId: 0,
  gender: "Buck",
};
export const RELOAD = `!RELOAD!`;

export const defaultSelection = new Set<TableRowId>([0]);

export const TraceWeightContentTypeId = "0x0100054D85AE9A2CB54A9E309347916952E40100B9A6472166C2C34D9CE5F92D1A304575";

export const FormDefaultsWeight: TSPLBWeightCreate = {
  bbDate: new Date(),
  bbRefLookupId: null,
  bbWeight: 0.0,
};
