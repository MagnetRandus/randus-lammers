/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import { BaseButton, Stack, ThemeProvider } from "@fluentui/react";
import styles from "./App.module.scss";
import BaseTheme from "Ux/BaseTheme";
import ControlPanel from "Client/ControlPanel/ControlPanel";
import ItemForm from "Client/ItemForm/ItemForm";
import { WithCustomFields } from "Interfaces/LISTS/base/IGraphListItemCustomField";
import Fields from "Interfaces/SP/graph-listitem-field";
import { isGraphError } from "Tools/IsError";
// import { Say } from "Local/logger/Logger";
interface IPropsBBok {
  start: boolean;
}

const BBok: React.FC<IPropsBBok> = ({ start }) => {
  [start];

  // const [localLogging, setLocalLogging] = useState<Say | undefined>();

  // window.eapi.localLogging().then((say) => setLocalLogging(say));

  const [statusMessage, setStatusMessage] = useState<string | undefined>(
    "Welcome"
  );

  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState<any>({
    tagnr: "0",
    dateOfBirth: new Date(),
    damLookupId: 0,
    sireLookupId: 0,
  });

  const validTagNrs = [18, 0, 1, 2, 3, 4, 10, 15]
    .sort((a, b) => a - b)
    .map((h) => h.toString());

  useEffect(() => {
    setTimeout(() => {
      setStatusMessage(undefined);
    }, 5000);
  }, [statusMessage, setStatusMessage]);

  // useEffect(() => {

  // }, []);

  return (
    <ThemeProvider applyTo="body" theme={BaseTheme}>
      <form
        onSubmit={(ev: React.FormEvent) => {
          ev.preventDefault();
          console.log("SUBMIT CALLED");
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
      <BaseButton
        onClick={() => {
          window.eapi
            .cloudCreateItem<WithCustomFields<Fields>>("base", {
              Title: "blehbleh1",
              tagnr: "abc12341",
            })
            .then((res) => {
              console.log(`Item with ID: ${res.id} created!`);
            })
            .catch((err) => {
              if (isGraphError(err)) {
                const {
                  body,
                  code,
                  date,
                  message,
                  name,
                  requestId,
                  statusCode,
                  headers,
                  stack,
                } = err;
                [
                  body,
                  code,
                  date,
                  message,
                  name,
                  requestId,
                  statusCode,
                  headers,
                  stack,
                ];
              }
            });
        }}
      >
        TEST
      </BaseButton>
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
