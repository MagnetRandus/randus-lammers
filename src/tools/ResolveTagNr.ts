import { TableRowId } from "@fluentui/react-table";
import IdTagNr from "Interfaces/IdTagNr";

export function ResolveTagNr(selectedRows: Set<TableRowId>, ValidTagNrs: IdTagNr[]): string {
  const updateIds = new Array<string>();
  selectedRows.forEach((tagNr) => {
    const SelRef = ValidTagNrs.find((h) => h?.TagNr === tagNr);
    if (SelRef) updateIds.push(SelRef.ItemId.toString());
  });
  return updateIds[0];
}
