/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import {
  initializeIcons,
  registerIcons,
  Stack,
  ThemeProvider,
} from "@fluentui/react";
import styles from "./App.module.scss";
import BaseTheme from "Ux/BaseTheme";
import ControlPanel from "Client/ControlPanel/ControlPanel";
import ItemForm from "Client/ItemForm/ItemForm";
import {
  TSPListBaseCreate,
  TSPListBaseRead,
} from "Interfaces/LISTS/base/IGraphListItemCustomField";
import Items from "Client/Items/Items";
import IdTagNr from "Interfaces/IdTagNr";
import ObjectMake from "Tools/ObjectMake";
import { TableRowId } from "@fluentui/react-table";
import {
  defaultSelection,
  formDefaults,
  RELOAD,
  TraceWeightContentTypeId,
} from "Types/const";
import {
  AddIcon,
  CalendarIcon,
  CancelIcon,
  ClearSelectionIcon,
  DeleteIcon,
  SaveAsIcon,
  SaveIcon,
} from "@fluentui/react-icons-mdl2";
import TraceWeight from "Client/Trace/Weight";
import {
  TSPLBWeightCreate,
  TSPLBWeightRead,
} from "Interfaces/LISTS/trace/IGLICF-Weight";
import { ResolveTagNr } from "Tools/ResolveTagNr";

interface IPropsBBok {
  ListName: string;
}

initializeIcons();
registerIcons({
  icons: {
    calender: <CalendarIcon />,
    iconCancel: <CancelIcon />,
    iconSave: <SaveIcon />,
    iconUpdate: <SaveAsIcon />,
    iconAdd: <AddIcon />,
    icondelete: <DeleteIcon />,
    iconclear: <ClearSelectionIcon />,
  },
});

const BBok: React.FC<IPropsBBok> = ({ ListName }) => {
  const [statusMessage, setStatusMessage] = useState<string | undefined>(
    "Welcome"
  );

  const [editActive, SetEditActive] = useState<boolean>(false);
  const [addActive, SetAddActive] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] =
    useState<Set<TableRowId>>(defaultSelection);
  const [editItemId, setEditItemId] = useState<string>("0");
  const [ItemsData, setItemsData] = useState<
    Array<TSPListBaseRead> | undefined
  >();
  const [validTagNrs, setValidTags] = useState<Array<IdTagNr> | undefined>();

  const [formData, setFormData] = useState<TSPListBaseCreate | undefined>();

  const [formWeightData, setFormWeightData] = useState<
    TSPLBWeightCreate | undefined
  >();

  const [traceWeightActive, SetTraceWeightActive] = useState<boolean>(false);

  //#region UseEffect
  useEffect(() => {
    window.eapi
      .cloudGetItems<TSPListBaseRead>(
        ListName,
        `fields($select=id,tagnr,dateOfBirth,dam,sire,gender)`
      )
      .then((res) => {
        if (res) {
          setItemsData(res.value);
          setValidTags(
            res.value.map((j) => {
              return ObjectMake<IdTagNr>({
                ItemId: j.id,
                TagNr: j.fields.tagnr,
                Gender: j.fields.gender,
              });
            })
          );
        }
      });
  }, [ListName]);
  useEffect(() => {
    switch (statusMessage) {
      case undefined:
        console.log("message cleared");
        break;
      case RELOAD:
        location.reload();
        break;
    }
  }, [statusMessage]);
  useEffect(() => {
    if (selectedRows.has(0)) selectedRows.delete(0);
    if (selectedRows.size === 1 && ItemsData) {
      SetEditActive(true);
      SetAddActive(false);
    }
    if (selectedRows.size === 0 || selectedRows.size > 1) {
      setFormData(undefined);
      SetEditActive(false);
      SetTraceWeightActive(false);
      setEditItemId("0");
    }
  }, [selectedRows, ItemsData, editActive]);
  useEffect(() => {
    if (editItemId !== "0" && ItemsData) {
      selectedRows.forEach((v) => {
        const FieldsToEdit = ItemsData.filter((j) => j.fields.tagnr === v)[0]
          .fields;

        if (FieldsToEdit) {
          setFormData({
            tagnr: FieldsToEdit.tagnr,
            gender: FieldsToEdit.gender,
            dateOfBirth: new Date(FieldsToEdit.dateOfBirth),
            damLookupId: FieldsToEdit.dam,
            sireLookupId: FieldsToEdit.sire,
          });
        }
      });
    }
    if (editItemId === "0") {
      setFormData(undefined);
    }
  }, [editItemId, ItemsData, selectedRows]);
  useEffect(() => {
    if (addActive) {
      setFormData(formDefaults);
    } else {
      setFormData(undefined);
    }
  }, [addActive]);
  useEffect(() => {
    if (traceWeightActive && validTagNrs && selectedRows) {
      setEditItemId(ResolveTagNr(selectedRows, validTagNrs));
      setFormWeightData({
        bbDate: new Date(),
        bbWeight: 0,
        bbRefLookupId: parseInt(editItemId, 10),
      });
    } else {
      setFormWeightData(undefined);
    }
  }, [validTagNrs, selectedRows, traceWeightActive, editItemId]);
  //#endregion

  return (
    <ThemeProvider applyTo="body" theme={BaseTheme}>
      <form
        onSubmit={(ev: React.FormEvent) => {
          ev.preventDefault();
          if (addActive) {
            const sData: Partial<TSPListBaseCreate> = { ...formData };

            if (sData.damLookupId === 0) delete sData.damLookupId;
            if (sData.sireLookupId === 0) delete sData.sireLookupId;

            window.eapi
              .cloudCreateItem<TSPListBaseRead, Partial<TSPListBaseCreate>>(
                ListName,
                { fields: sData }
              )
              .then((res) => {
                const msg = `Tag Nr ${res.fields.tagnr} saved (${res.id})`;
                setStatusMessage(msg);
                setTimeout(() => {
                  setStatusMessage(RELOAD);
                }, 3000);
                window.eapi.localLogging("Info", "DATA-TRACK", msg);
                setEditItemId("0");
              })
              .catch((err) => {
                if (err instanceof Error) {
                  if (
                    err.message.indexOf("cloudeCreateItem") !== -1 &&
                    err.message.indexOf("unique") !== -1
                  ) {
                    alert("Duplicate Tag Nr");
                    setEditItemId("0");
                  }
                  setStatusMessage(err.message);
                }
              });
          }
          if (editActive && formData) {
            window.eapi
              .cloudUpdateItem<
                TSPListBaseRead,
                TSPListBaseCreate
              >(ListName, parseInt(editItemId, 10), formData)
              .then((res) => {
                const msg = `Tag Nr ${res.fields.tagnr} updated (${res.id})`;
                setStatusMessage(msg);
                setTimeout(() => {
                  setStatusMessage(RELOAD);
                }, 3000);
                window.eapi.localLogging("Info", "DATA-TRACK", msg);
                setEditItemId("0");
              });
          }
          if (traceWeightActive && formWeightData) {
            SetEditActive(false);
            window.eapi
              .cloudCreateItem<TSPLBWeightRead, TSPLBWeightCreate>("trace", {
                contentType: {
                  id: TraceWeightContentTypeId,
                },
                fields: {
                  ...formWeightData,
                  bbRefLookupId: parseInt(editItemId, 10),
                },
              })
              .then((res) => {
                const msg = `Trace Added on ${res.fields.id}`;
                setStatusMessage(msg);
                setTimeout(() => {
                  setStatusMessage(RELOAD);
                }, 3000);
                window.eapi.localLogging("Info", "DATA-TRACK", msg);
                setEditItemId("0");
              });
          }
        }}
      >
        <Stack className={styles.Main}>
          <ControlPanel
            statusMessage={statusMessage}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            ValidTagNrs={validTagNrs}
            setStatusMessage={setStatusMessage}
            setEditItemId={setEditItemId}
            editItemId={editItemId}
            SetEditActive={SetEditActive}
            EditActive={editActive}
            AddActive={addActive}
            SetAddActive={SetAddActive}
            TraceWeightActive={traceWeightActive}
            SetTraceWeightActive={SetTraceWeightActive}
          />
          {formData && validTagNrs && !traceWeightActive && (
            <ItemForm
              formData={formData}
              setFormData={setFormData}
              validTagNrs={validTagNrs}
            />
          )}
          {formWeightData && traceWeightActive && (
            <TraceWeight
              formData={formWeightData}
              setFormData={setFormWeightData}
            />
          )}
        </Stack>
      </form>
      <Stack>
        {ItemsData && (
          <Items
            data={ItemsData}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        )}
      </Stack>
    </ThemeProvider>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BBok ListName={"base"} />} />
      </Routes>
    </Router>
  );
}

const rootContainer = document.getElementById("root");

if (rootContainer) {
  const root = createRoot(rootContainer);
  root.render(<App />);
} else {
  console.error(`broken html, cannot find root`);
}
