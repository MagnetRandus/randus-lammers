import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import styles from "./BBGrid.module.scss";

import {
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridProps,
  DataGridRow,
  TableCellLayout,
  TableColumnDefinition,
  TableRowId,
} from "@fluentui/react-table";
import { CloudBaseR } from "iSurfaces/cloud-base-item";

interface IPropsBBGrid {
  Items: Array<CloudBaseR>;
  IdFocusSet: Dispatch<SetStateAction<number>>;
}

const BBGrid: FC<IPropsBBGrid> = ({ Items, IdFocusSet }) => {
  const onSortChange: DataGridProps["onSortChange"] = (e, nextSortState) => {
    setSortState(nextSortState);
  };

  const [sortState, setSortState] = useState<
    Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]
  >({
    sortColumn: "id",
    sortDirection: "descending",
  });

  const [selectedRows, setSelectedRows] = useState(new Set<TableRowId>([1]));
  const onSelectionChange: DataGridProps["onSelectionChange"] = (e, data) => {
    setSelectedRows(data.selectedItems);
  };

  useEffect(() => {
    selectedRows.forEach((rowSel) => {
      console.log(`You selected row: ${rowSel}`);
      IdFocusSet(Number(rowSel));
    });
  }, [selectedRows, IdFocusSet]);

  const columns: Array<TableColumnDefinition<CloudBaseR>> = [
    createTableColumn<CloudBaseR>({
      columnId: "Id",
      compare: (a, b) => {
        const aid = a.id ? a.id : 0;
        const bid = b.id ? b.id : 0;
        return aid - bid;
      },
      renderHeaderCell() {
        return (
          <>
            <b>Id</b>
          </>
        );
      },
      renderCell(item) {
        return <TableCellLayout>{item.id}</TableCellLayout>;
      },
    }),
    createTableColumn<CloudBaseR>({
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
    createTableColumn<CloudBaseR>({
      columnId: "gender",
      compare: (a, b) => {
        return a.gender.localeCompare(b.gender);
      },
      renderHeaderCell() {
        return (
          <>
            <b>Gender</b>
          </>
        );
      },
      renderCell(item) {
        return <TableCellLayout>{item.gender}</TableCellLayout>;
      },
    }),
    createTableColumn<CloudBaseR>({
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
        return <TableCellLayout>{item.dam}</TableCellLayout>;
      },
    }),
    createTableColumn<CloudBaseR>({
      columnId: "sire",
      compare: (a, b) => {
        if (a.dam === undefined) return 1;
        if (b.dam === undefined) return -1;
        return a.dam - b.dam;
      },
      renderHeaderCell() {
        return (
          <>
            <b>Sire</b>
          </>
        );
      },
      renderCell(item) {
        return <TableCellLayout>{item.sire}</TableCellLayout>;
      },
    }),
  ];

  return (
    <>
      <DataGrid
        className={styles.BBGrid}
        items={Items}
        getRowId={(itm) => itm.id}
        sortable
        columns={columns}
        sortState={sortState}
        onSortChange={onSortChange}
        selectionMode="single"
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
        <DataGridBody<CloudBaseR>>
          {({ item, rowId }) => (
            <DataGridRow<CloudBaseR>
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

export default BBGrid;
