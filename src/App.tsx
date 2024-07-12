import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import BaseTheme from "./apic/Themes/BaseTheme";
import ControlPanel from "./apic/ControlPanel/ControlPanel";
import { Stack, ThemeProvider } from "@fluentui/react";
import BBDetail from "./apic/BBItem/BBItem";
import { CloudBaseCU, CloudBaseR } from "iSurfaces/cloud-base-item";
import { uriParamsBuild } from "./apic/tools";

interface IPropsBBok {
  start: boolean;
}

const eP = uriParamsBuild<CloudBaseR>("fields", [
  "id",
  "gender",
  "sire",
  "dam",
  "tagnr",
  "dateOfBirth",
  "Title",
]);

const BBok: React.FC<IPropsBBok> = ({ start }) => {
  [start];

  const validTagNrs = [18, 0, 1, 2, 3, 4, 10, 15]
    .sort((a, b) => a - b)
    .map((h) => h.toString());

  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState<Partial<CloudBaseCU>>({
    tagnr: "0",
    dateOfBirth: new Date(),
    damLookupId: 0,
    sireLookupId: 0,
  });

  const [statusMessage, setStatusMessage] = useState<string | undefined>(
    "Welcome"
  );

  useEffect(() => {
    setTimeout(() => {
      setStatusMessage(undefined);
    }, 5000);
  }, [statusMessage, setStatusMessage]);

  useEffect(() => {
    window.eapi
      .cloudReadList<"UriParams">(eP)
      .then((res) => {
        console.log("GOT ITEMS");
        console.dir(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <ThemeProvider applyTo="body" theme={BaseTheme}>
      <form
        onSubmit={(ev: React.FormEvent) => {
          ev.preventDefault();
          if (formData.damLookupId === 0) delete formData.damLookupId;
          if (formData.sireLookupId === 0) delete formData.sireLookupId;
          console.dir(formData);
          window.eapi.cloudWrite(formData);
        }}
      >
        <Stack className={styles.Main}>
          <ControlPanel
            setIsAdding={setIsAdding}
            isAdding={isAdding}
            statusMessage={statusMessage}
          />
          {isAdding && (
            <BBDetail
              formData={formData}
              setFormData={setFormData}
              validTagNrs={validTagNrs}
            />
          )}
        </Stack>
      </form>
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
