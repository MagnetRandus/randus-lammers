import {
  createTableColumn,
  TableCellLayout,
  TableColumnDefinition,
} from "@fluentui/react-table";
import { TSPLBWeightReadItem } from "Interfaces/LISTS/trace/IGLICF-Weight";

type ItemType = TSPLBWeightReadItem;

function CreateItemColumns(
  dataFlat: Array<Partial<ItemType>>
): Array<TableColumnDefinition<ItemType>> {
  [dataFlat];
  return [
    createTableColumn<ItemType>({
      columnId: "bbDate",
      compare: (a, b) => {
        return a.bbDate.getMilliseconds() - b.bbDate.getMilliseconds();
      },
      renderHeaderCell() {
        return (
          <>
            <b>Date</b>
          </>
        );
      },
      renderCell(item) {
        return (
          <TableCellLayout>
            {item.bbDate
              ? new Date(item.bbDate).toLocaleDateString()
              : undefined}
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
            <b>Weight</b>
          </>
        );
      },
      renderCell(item) {
        return <TableCellLayout>{item.bbWeight}</TableCellLayout>;
      },
    }),
  ];
}

export default CreateItemColumns;
