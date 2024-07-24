import { TableRowId } from "@fluentui/react-table";
import IdTagNr from "Interfaces/IdTagNr";

export function ResolveTagNrToId(selectedRows: Set<TableRowId>, ValidTagNrs: IdTagNr[]): number {
  if (selectedRows.size === 1) {
    const updateIds = new Array<string>();
    selectedRows.forEach((tagNr) => {
      const SelRef = ValidTagNrs.find((h) => h?.TagNr === tagNr);
      if (SelRef) updateIds.push(SelRef.ItemId.toString());
    });
    return parseInt(updateIds[0]);
  }
  throw new Error(`Resolve Tag Nr to Id can only be used when a single item is selected`);
}
