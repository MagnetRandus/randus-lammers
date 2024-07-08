import React from "react";
import { IBB } from "../types";

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

interface IPropsBBGrid {
  data: IBB[];
  IdFocusSet: React.Dispatch<React.SetStateAction<number>>;
}

const BBGrid: React.FC<IPropsBBGrid> = ({ data, IdFocusSet }) => {
  const onSortChange: DataGridProps["onSortChange"] = (e, nextSortState) => {
    setSortState(nextSortState);
  };

  const [sortState, setSortState] = React.useState<
    Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]
  >({
    sortColumn: "id",
    sortDirection: "descending",
  });

  const [selectedRows, setSelectedRows] = React.useState(
    new Set<TableRowId>([1])
  );
  const onSelectionChange: DataGridProps["onSelectionChange"] = (e, data) => {
    setSelectedRows(data.selectedItems);
  };

  React.useEffect(() => {
    selectedRows.forEach((rowSel) => {
      console.log(`You selected row: ${rowSel}`);
      IdFocusSet(Number(rowSel));
    });
  }, [selectedRows, IdFocusSet]);

  const columns: Array<TableColumnDefinition<IBB>> = [
    createTableColumn<IBB>({
      columnId: "id",
      compare: (a, b) => {
        return a.id - b.id;
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
    createTableColumn<IBB>({
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
    createTableColumn<IBB>({
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
    createTableColumn<IBB>({
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
    createTableColumn<IBB>({
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
        items={data}
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
        <DataGridBody<IBB>>
          {({ item, rowId }) => (
            <DataGridRow<IBB>
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
