import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React from "react";
import RootObject from "./api/interfaces/dbSchema";
import styles from "./App.module.scss";

function Hello() {
  const [db, dbSet] = React.useState<RootObject | undefined>(undefined);
  return (
    <div>
      <button
        onClick={() => {
          // window.eapi.writeFile(data);
          window.eapi
            .dbRead()
            .then((db) => {
              if (db.status == "Init 0") {
                dbSet(db);
              } else {
                console.log(db.status);
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }}
      >
        get db
      </button>
      <button
        onClick={async () => {
          const filePaths = await window.eapi.openDialog();
          filePaths;
        }}
      >
        Open Dialog
      </button>
      {db &&
        db.adb?.map((record) => (
          <div className={styles.MyDiv} key={record.id}>
            {record.id}
          </div>
        ))}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
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
