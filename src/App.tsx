import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React from "react";
import styles from "./App.module.scss";
import BBRender from "./api/ux/bb";
import RecordHandler, { dbCrudOps } from "./api/dbTalk/rh";
import { IDBCrudx } from "./api/types";

interface IPropsBBok {
  start: boolean;
}

const BBok: React.FC<IPropsBBok> = ({ start }) => {
  [start];

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
    <div>
      {db && (
        <div>
          <div className={styles.ControlPanel}>
            {dbOps && <BBRender dbCrudOps={dbOps} />}
          </div>
          {db.adb?.map((bbRec) => (
            <div className={styles.MyDiv} key={bbRec.id}>
              {bbRec.id}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  return <div>hello</div>;
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

/**
 * <button
        onClick={async () => {
          const filePaths = await window.eapi.openDialog();
          filePaths;
        }}
      >
        Open Dialog
      </button>
 */
