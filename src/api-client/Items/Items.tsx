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
import styles from "./Items.module.scss";
import { TSPLBSireRead } from "Interfaces/LISTS/sires/IGLICF-Sires";
import IBBIdent from "Interfaces/IBBIdent";
import ThemeColor from "Ux/ColorScheme";

type ItemTypeBase = TSPListBaseReadItem;
type ItemTypeSires = TSPLBSireRead;

interface IPropsItems {
  data: Array<TSPListBaseRead>;
  selectedRows: Set<TableRowId>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<TableRowId>>>;
  Sires: Map<number, IBBIdent[]> | undefined;
}

const Items: React.FC<IPropsItems> = ({
  data,
  Sires,
  selectedRows,
  setSelectedRows,
}) => {
  const dataFlat = data.flatMap((j) => j.fields) as Partial<ItemTypeBase>[];
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

  const columns: Array<TableColumnDefinition<ItemTypeBase>> = CreateItemColumns(
    dataFlat,
    Sires
  );

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
          selectedItems={selectedRows}
          onSelectionChange={onSelectionChange}
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
          <DataGridBody<ItemTypeBase>>
            {({ item, rowId }) => (
              <DataGridRow<ItemTypeBase>
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

export default Items;
