import { TableRowId } from "@fluentui/react-table";
import { TSPListBaseCreate } from "Interfaces/LISTS/base/IGraphListItemCustomField";

export const formDefaults: TSPListBaseCreate = {
  tagnr: "0",
  dateOfBirth: new Date(),
  damLookupId: 0,
  sireLookupId: 0,
  gender: "Buck",
};
export const RELOAD = `!RELOAD!`;

export const defaultSelection = new Set<TableRowId>([0]);
