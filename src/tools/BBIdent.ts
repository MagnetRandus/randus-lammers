import { TableRowId } from "@fluentui/react-table";
import IBBIdent from "Interfaces/IBBIdent";
import { IBuckDoe } from "Types/BuckDoe";

export function BBIdentToItemId(selectedRows: Set<TableRowId>, BBIdent: IBBIdent[]): number | undefined {
  if (selectedRows.size === 1) {
    const SelRef = BBIdent.find((h) => h.TagNr === Array.from(selectedRows)[0]);
    if (SelRef) return parseInt(SelRef.ItemId.toString());
  }
  return undefined;
}
export function BBIdentFromSelectedRows(BBIdent: IBBIdent[], selectedRows: Set<TableRowId>): IBBIdent[] {
  return BBIdent.filter((j) => Array.from(selectedRows.values()).includes(j.TagNr));
}

export function BBIdentFromTagNr(BBIdents: IBBIdent[] | undefined, TagNr: string): IBBIdent | undefined {
  if (BBIdents) {
    return BBIdents[
      BBIdents.findIndex((j) => {
        return j.TagNr === TagNr;
      })
    ];
  }
  return undefined;
}

export function BBIdentFromItemId(BBIdents: IBBIdent[] | undefined, ItemId: string | number | undefined): IBBIdent | undefined {
  if (BBIdents && BBIdents.length > 0) {
    if (typeof ItemId === "number") {
      window.eapi.localLogging("Error", "BBIdentFromItemId", "ItemId is a number");
      return BBIdents[
        BBIdents.findIndex((j) => {
          return j.ItemId === ItemId;
        })
      ];
    }
    if (typeof ItemId === "string") {
      return BBIdents[
        BBIdents.findIndex((j) => {
          return j.ItemId === parseInt(ItemId);
        })
      ];
    }
  }

  window.eapi.localLogging("Info", "BBIdentFromItemId", "BBIdents was undefined");

  return undefined;
}

export function validTagsFor(BBIdents: IBBIdent[], sks: IBuckDoe): IBBIdent[] | undefined {
  const j = BBIdents.filter((j) => j.Sks === sks).sort((a, b) => {
    return parseInt(a.TagNr, 10) - parseInt(b.TagNr, 10);
  });

  if (j.length !== 0) return j;
  else return undefined;
}
