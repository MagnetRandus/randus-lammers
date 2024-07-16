/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import { Stack, ThemeProvider } from "@fluentui/react";
import styles from "./App.module.scss";
import BaseTheme from "Ux/BaseTheme";
import ControlPanel from "Client/ControlPanel/ControlPanel";
import ItemForm from "Client/ItemForm/ItemForm";
import {
  TCreateItemBase,
  TReadItemBase,
} from "Interfaces/LISTS/base/IGraphListItemCustomField";

interface IPropsBBok {
  start: boolean;
}

const BBok: React.FC<IPropsBBok> = ({ start }) => {
  [start];

  const [statusMessage, setStatusMessage] = useState<string | undefined>(
    "Welcome"
  );

  const [isAdding, setIsAdding] = useState(false);

  const formDefaults: Partial<TCreateItemBase> = {
    tagnr: "0",
    dateOfBirth: new Date(),
    damLookupId: 0,
    sireLookupId: 0,
    gender: "Buck",
  };

  const [formData, setFormData] =
    useState<Partial<TCreateItemBase>>(formDefaults);

  const validTagNrs = [18, 0, 1, 2, 3, 4, 10, 15]
    .sort((a, b) => a - b)
    .map((h) => h.toString());

  return (
    <ThemeProvider applyTo="body" theme={BaseTheme}>
      <form
        onSubmit={(ev: React.FormEvent) => {
          ev.preventDefault();

          const sData = { ...formData };
          setFormData(formDefaults);
          alert("submitting");

          if (formData.damLookupId === 0) delete sData.damLookupId;
          if (formData.sireLookupId === 0) delete sData.sireLookupId;

          window.eapi
            .cloudCreateItem<TReadItemBase>("base", sData)
            .then((res) => {
              setStatusMessage(`${res.tagnr} saved as ${res.id}`);
            })
            .catch((err) => {
              if (err instanceof Error) {
                if (
                  err.message.indexOf("cloudCreateItem") !== -1 &&
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
          />
          {isAdding && (
            <ItemForm
              formData={formData}
              setFormData={setFormData}
              validTagNrs={validTagNrs}
            />
          )}
        </Stack>
      </form>
      {/* <BaseButton
        onClick={() => {
    
        }}
      >
        TEST
      </BaseButton> */}
    </ThemeProvider>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BBok start />} />
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
