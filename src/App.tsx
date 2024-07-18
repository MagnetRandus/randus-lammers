/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import { Stack, ThemeProvider } from "@fluentui/react";
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
import { RELOAD } from "Types/Reload";

interface IPropsBBok {
  ListName: string;
}

const BBok: React.FC<IPropsBBok> = ({ ListName }) => {
  const [statusMessage, setStatusMessage] = useState<string | undefined>(
    "Welcome"
  );

  const [isAdding, setIsAdding] = useState(false);

  const defaultSelection = new Set<TableRowId>([0]);

  const [selectedRows, setSelectedRows] =
    useState<Set<TableRowId>>(defaultSelection);

  const formDefaults: TSPListBaseCreate = {
    tagnr: "0",
    dateOfBirth: new Date(),
    damLookupId: 0,
    sireLookupId: 0,
    gender: "Buck",
  };

  const [formData, setFormData] = useState<TSPListBaseCreate>(formDefaults);
  const [editItemId, setEditItemId] = useState<string | undefined>();
  const [ItemsData, setItemsData] = useState<Array<TSPListBaseRead>>();
  const [validTagNrs, setValidTags] = useState<Array<IdTagNr> | undefined>();

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
              });
            })
          );
        }
      });
  }, [ListName]);

  useEffect(() => {
    if (selectedRows.has(0)) selectedRows.delete(0);
  }, [selectedRows, setSelectedRows]);

  useEffect(() => {
    if (statusMessage === RELOAD) {
      location.reload();
    }
  }, [setStatusMessage, statusMessage]);

  // useEffect(() => {
  //   if (ItemsData && editItemId) {
  //     const focusItem = ItemsData.filter((J) => J.id === editItemId)[0];
  //     setFormData({
  //       tagnr: focusItem.fields.tagnr,
  //       gender: focusItem.fields.gender,
  //       dateOfBirth: new Date(focusItem.fields.dateOfBirth),
  //       damLookupId: focusItem.fields.dam,
  //       sireLookupId: focusItem.fields.sire,
  //     });
  //     setIsAdding(!isAdding);
  //   }
  // }, [editItemId, setEditItemId, ItemsData, setIsAdding, isAdding]);

  return (
    <ThemeProvider applyTo="body" theme={BaseTheme}>
      <form
        onSubmit={(ev: React.FormEvent) => {
          ev.preventDefault();

          const sData: Partial<TSPListBaseCreate> = { ...formData };

          setFormData(formDefaults);

          if (sData.damLookupId === 0) delete sData.damLookupId;
          if (sData.sireLookupId === 0) delete sData.sireLookupId;

          window.eapi
            .cloudCreateItem<TSPListBaseRead, Partial<TSPListBaseCreate>>(
              ListName,
              sData
            )
            .then((res) => {
              const msg = `Tag Nr ${res.fields.tagnr} saved (${res.id})`;
              setStatusMessage(msg);
              setTimeout(() => {
                setStatusMessage(RELOAD);
              }, 3000);
              window.eapi.localLogging("Info", "DATA-TRACK", msg);
              setFormData(formDefaults);
              setIsAdding(false);
            })
            .catch((err) => {
              if (err instanceof Error) {
                if (
                  err.message.indexOf("cloudeCreateItem") !== -1 &&
                  err.message.indexOf("unique") !== -1
                ) {
                  alert("Duplicate Tag Nr");
                  setFormData(formDefaults);
                }
                setStatusMessage(err.message);
              }
            });
        }}
      >
        <Stack className={styles.Main}>
          <ControlPanel
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            statusMessage={statusMessage}
            selectedRows={selectedRows}
            ValidTagNrs={validTagNrs}
            setStatusMessage={setStatusMessage}
            setEditItemId={setEditItemId}
          />
          {isAdding && validTagNrs && (
            <ItemForm
              formData={formData}
              setFormData={setFormData}
              validTagNrs={validTagNrs}
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
