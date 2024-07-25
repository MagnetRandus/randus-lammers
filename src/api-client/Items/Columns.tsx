import {
  createTableColumn,
  TableCellLayout,
  TableColumnDefinition,
} from "@fluentui/react-table";
import { TSPListBaseReadItem } from "Interfaces/LISTS/base/IGraphListItemCustomField";

type ItemType = TSPListBaseReadItem;

function CreateItemColumns(
  dataFlat: Array<Partial<ItemType>>
): Array<TableColumnDefinition<ItemType>> {
  return [
    createTableColumn<ItemType>({
      columnId: "tagnr",
      compare: (a, b) => {
        return parseInt(a.tagnr, 10) - parseInt(b.tagnr, 10);
      },
      renderHeaderCell() {
        return (
          <>
            <b>Tag Nr</b>
          </>
        );
      },
      renderCell(item) {
        return <TableCellLayout>{item.tagnr}</TableCellLayout>;
      },
    }),
    createTableColumn<ItemType>({
      columnId: "dateOfBirth",
      compare: (a, b) => {
        if (a.dateOfBirth && b.dateOfBirth) {
          if (a.dateOfBirth === undefined) return 1;
          if (b.dateOfBirth === undefined) return -1;
          return (
            new Date(a.dateOfBirth).getTime() -
            new Date(b.dateOfBirth).getTime()
          );
        }
        return -1;
      },
      renderHeaderCell() {
        return (
          <>
            <b>DoB</b>
          </>
        );
      },
      renderCell(item) {
        if (item.dateOfBirth) {
          return (
            <TableCellLayout>
              {new Date(item.dateOfBirth).toLocaleDateString()}
            </TableCellLayout>
          );
        }
        return <TableCellLayout>&nbsp;</TableCellLayout>;
      },
    }),
    createTableColumn<ItemType>({
      columnId: "bbSks",
      compare: (a, b) => {
        return a.bbSks.localeCompare(b.bbSks);
      },
      renderHeaderCell() {
        return (
          <>
            <b>Buck/Doe</b>
          </>
        );
      },
      renderCell(item) {
        return <TableCellLayout>{item.bbSks}</TableCellLayout>;
      },
    }),
    createTableColumn<ItemType>({
      columnId: "bbWeight",
      compare: (a, b) => {
        return a.bbWeight - b.bbWeight;
      },
      renderHeaderCell() {
        return (
          <>
            <b>Last known Weight</b>
          </>
        );
      },
      renderCell(item) {
        return <TableCellLayout>{item.bbWeight}</TableCellLayout>;
      },
    }),
    createTableColumn<ItemType>({
      columnId: "sire",
      compare: (a, b) => {
        if (a.sire === undefined) return 1;
        if (b.sire === undefined) return -1;
        return a.sire - b.sire;
      },
      renderHeaderCell() {
        return (
          <>
            <b>Sire</b>
          </>
        );
      },
      renderCell(item) {
        return (
          <TableCellLayout>
            {item.sire ? (
              <>{dataFlat.filter((j) => j.id === String(item.sire))[0].tagnr}</>
            ) : undefined}
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<ItemType>({
      columnId: "dam",
      compare: (a, b) => {
        if (a.dam === undefined) return 1;
        if (b.dam === undefined) return -1;
        if (a.dam && b.dam) {
          return a.dam - b.dam;
        }
        return -1;
      },
      renderHeaderCell() {
        return (
          <>
            <b>Dam</b>
          </>
        );
      },
      renderCell(item) {
        return (
          <TableCellLayout>
            {item.dam ? (
              <>{dataFlat.filter((j) => j.id === String(item.dam))[0].tagnr}</>
            ) : undefined}
          </TableCellLayout>
        );
      },
    }),
  ];
}

export default CreateItemColumns;
