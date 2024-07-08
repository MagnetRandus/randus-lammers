import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React from "react";
import styles from "./App.module.scss";
import RecordHandler from "./api/dbTalk/rh";
import { dbCrudOps, IDBCrudx } from "./api/types";
import BBGrid from "./api/ux/BBGrid";
import BBRender from "./api/ux/ControlPanel";
import { Stack, ThemeProvider } from "@fluentui/react";
import BaseTheme from "./api/ux/Themes/BaseTheme";

interface IPropsBBok {
  start: boolean;
}

const BBok: React.FC<IPropsBBok> = ({ start }) => {
  // const setCustomCSSVariables = () => {
  //   const root = document.documentElement;

  //   root.style.setProperty("--colorNeutralStrokeAccessible", "red");
  // };

  // // setCustomCSSVariables();

  [start];

  const [IdFocus, IdFocusSet] = React.useState<number>(1); //DataGrid automatically selects the first item

  const [db, setDb] = React.useState<IDBCrudx>(undefined);
  const [rh] = React.useState<RecordHandler>(
    new RecordHandler(window.eapi, setDb)
  );
  const [dbOps, dbOpsSet] = React.useState<dbCrudOps | undefined>(undefined);

  React.useEffect(() => {
    rh.getDb();
  }, [rh]);

  React.useEffect(() => {
    if (db) {
      dbOpsSet(db.crud);
    }
  }, [db]);

  return (
    <ThemeProvider applyTo="body" theme={BaseTheme}>
      <Stack className={styles.Main}>
        {db && (
          <>
            {dbOps && (
              <BBRender
                IdFocus={IdFocus}
                SetIdfocus={IdFocusSet}
                dbCrudOps={dbOps}
              />
            )}
            {db.adb && <BBGrid IdFocusSet={IdFocusSet} data={db.adb} />}
          </>
        )}
      </Stack>
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
