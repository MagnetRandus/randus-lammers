import { TableRowId } from "@fluentui/react-table";
import IBBIdent from "Interfaces/IdTagNr";
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

export function BBIdentFromTagNr(BBIdents: IBBIdent[], TagNr: string): IBBIdent | undefined {
  return BBIdents[
    BBIdents.findIndex((j) => {
      return j.TagNr === TagNr;
    })
  ];
}

export function BBIdentFromItemId(BBIdents: IBBIdent[], ItemId: string | number | undefined | null): IBBIdent | undefined {
  if (typeof ItemId === "number") {
    console.log(`ItemId is a number`);
    return BBIdents[
      BBIdents.findIndex((j) => {
        return j.ItemId === ItemId;
      })
    ];
  }
  if (typeof ItemId === "string") {
    console.log(`ItemId is a string`);
    return BBIdents[
      BBIdents.findIndex((j) => {
        return j.ItemId === parseInt(ItemId);
      })
    ];
  }

  return undefined;
}

export function validTagsFor(BBIdents: IBBIdent[], sks: IBuckDoe): IBBIdent[] | undefined {
  const j = BBIdents.filter((j) => j.Sks === sks).sort((a, b) => {
    return parseInt(a.TagNr, 10) - parseInt(b.TagNr, 10);
  });

  if (j.length !== 0) return j;
  else return undefined;
}
