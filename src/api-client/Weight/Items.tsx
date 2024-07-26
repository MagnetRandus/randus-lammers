import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridProps,
  DataGridRow,
  TableColumnDefinition,
} from "@fluentui/react-table";

import { useState } from "react";
import CreateItemColumns from "./Columns";
import styles from "./Items.module.scss";
import {
  TSPLBWeightRead,
  TSPLBWeightReadItem,
} from "Interfaces/LISTS/trace/IGLICF-Weight";

interface IPropsItems {
  data: Array<TSPLBWeightRead>;
}
type ItemType = TSPLBWeightReadItem;

const WeightItems: React.FC<IPropsItems> = ({ data }) => {
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

  // const onSelectionChange: DataGridProps["onSelectionChange"] = (
  //   e,
  //   rowsSel
  // ) => {
  //   setSelectedRows(new Set<TableRowId>(rowsSel.selectedItems));
  // };

  const columns: Array<TableColumnDefinition<ItemType>> =
    CreateItemColumns(dataFlat);

  return (
    <>
      <div className={styles.Items}>
        <DataGrid
          items={dataFlat}
          getRowId={(itm) => itm.tagnr}
          sortable
          columns={columns}
          sortState={sortState}
          onSortChange={onSortChange}
          selectionMode="multiselect"
          // selectedItems={selectedRows}
          // onSelectionChange={onSelectionChange}
          defaultSelectedItems={undefined}
          defaultChecked={false}
          focusMode="composite"
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
                selectionCell={{
                  radioIndicator: { "aria-label": "Select row" },
                }}
              >
                {({ renderCell }) => (
                  <DataGridCell>{renderCell(item)}</DataGridCell>
                )}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
      </div>
    </>
  );
};

export default WeightItems;
