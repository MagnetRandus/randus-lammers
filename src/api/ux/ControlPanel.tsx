import React from "react";
import styles from "./ControlPanel.module.scss";
import { dbCrudOps } from "../dbTalk/rh";
import BBDetail from "./BBDetail";

export interface IPropsBBRender {
  dbCrudOps: dbCrudOps;
  IdFocus: number;
}

const BBRender: React.FC<IPropsBBRender> = function ({ dbCrudOps, IdFocus }) {
  const [AddingStock, AddingStockSet] = React.useState<boolean>(false);

  return (
    <>
      <div className={styles.ControlPanel}>
        <button
          className={styles.ButtonPlain}
          onClick={() => {
            AddingStockSet(!AddingStock);
            console.log("Adding stock");
          }}
        >
          Add Stock
        </button>
      </div>
      {AddingStock && (
        <div>
          <BBDetail
            IdFocus={IdFocus}
            shwRecord={dbCrudOps.shwRecord}
            addRecord={dbCrudOps.addRecord}
          />
        </div>
      )}
    </>
  );
};

export default BBRender;
