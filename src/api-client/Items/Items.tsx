import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridProps,
  DataGridRow,
  TableColumnDefinition,
  TableRowId,
} from "@fluentui/react-table";

import {
  TSPListBaseRead,
  TSPListBaseReadItem,
} from "Interfaces/LISTS/base/IGraphListItemCustomField";

import { useState } from "react";
import CreateItemColumns from "./Columns";

interface IPropsItems {
  data: Array<TSPListBaseRead>;
  selectedRows: Set<TableRowId>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<TableRowId>>>;
}

type ItemType = TSPListBaseReadItem;

const Items: React.FC<IPropsItems> = ({
  data,
  selectedRows,
  setSelectedRows,
}) => {
  const dataFlat = data.flatMap((j) => j.fields) as Partial<ItemType>[];
  const onSortChange: DataGridProps["onSortChange"] = (e, nextSortState) => {
    setSortState(nextSortState);
  };

  const [sortState, setSortState] = useState<
    Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]
  >({
    sortColumn: "tagnr",
    sortDirection: "descending",
  });

  const onSelectionChange: DataGridProps["onSelectionChange"] = (
    e,
    rowsSel
  ) => {
    setSelectedRows(new Set<TableRowId>(rowsSel.selectedItems));
  };

  const columns: Array<TableColumnDefinition<ItemType>> =
    CreateItemColumns(dataFlat);

  return (
    <>
      <DataGrid
        items={dataFlat}
        getRowId={(itm) => itm.tagnr}
        sortable
        columns={columns}
        sortState={sortState}
        onSortChange={onSortChange}
        selectionMode="multiselect"
        selectedItems={selectedRows}
        onSelectionChange={onSelectionChange}
        defaultSelectedItems={undefined}
        defaultChecked={false}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<ItemType>>
          {({ item, rowId }) => (
            <DataGridRow<ItemType>
              key={rowId}
              selectionCell={{ radioIndicator: { "aria-label": "Select row" } }}
            >
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </>
  );
};

export default Items;
