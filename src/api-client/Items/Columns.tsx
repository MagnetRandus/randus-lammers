import {
  createTableColumn,
  TableCellLayout,
  TableColumnDefinition,
} from "@fluentui/react-table";
import SiresFor from "Client/Sires/Sires";
import IBBIdent from "Interfaces/IBBIdent";
import { TSPListBaseReadItem } from "Interfaces/LISTS/base/IGraphListItemCustomField";
import ThemeColor from "Ux/ColorScheme";

type ItemType = TSPListBaseReadItem;

function CreateItemColumns(
  dataFlat: Array<Partial<ItemType>>,
  Sires: Map<number, IBBIdent[]> | undefined
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
        return (
          <TableCellLayout>
            <span>{item.tagnr}</span>
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<ItemType>({
      columnId: "bbStatus",
      compare: (a, b) => {
        return a.bbStatus.localeCompare(b.bbStatus);
      },
      renderHeaderCell() {
        return (
          <>
            <b>Status</b>
          </>
        );
      },
      renderCell(item) {
        return (
          <TableCellLayout>
            <span>{item.bbStatus}</span>
          </TableCellLayout>
        );
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
              <span>{new Date(item.dateOfBirth).toLocaleDateString()}</span>
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
        return (
          <TableCellLayout>
            <span>{item.bbSks}</span>
          </TableCellLayout>
        );
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
        return (
          <TableCellLayout>
            <span>{item.bbWeight}</span>
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<ItemType>({
      columnId: "sires",
      compare: () => {
        return -1;
      },
      renderHeaderCell() {
        return (
          <>
            <b>Potential Sires</b>
          </>
        );
      },
      renderCell(item) {
        return (
          <TableCellLayout>
            <SiresFor ItemId={parseInt(item.id, 10)} Sires={Sires} />
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
        let flatItems: Partial<TSPListBaseReadItem>[] | undefined = undefined;
        if (item.dam) {
          flatItems = dataFlat.filter((j) => j.tagnr === String(item.dam));
          if (flatItems.length === 0) {
            flatItems = undefined;
          }
        }
        return (
          <TableCellLayout>
            {flatItems && flatItems.map((j) => j.tagnr).join(", ")}
          </TableCellLayout>
        );
      },
    }),
  ];
}

export default CreateItemColumns;
