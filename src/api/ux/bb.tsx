import React from "react";
import styles from "./bb.module.scss";
import BBAdd from "./addbb";
import { dbCrudOps } from "../dbTalk/rh";

export interface IPropsBBRender {
  dbCrudOps: dbCrudOps;
}

const BBRender: React.FC<IPropsBBRender> = function ({ dbCrudOps }) {
  const [_StockAdding, _SetStockAdding] = React.useState<boolean>(false);
  return (
    <>
      <div className={styles.Controls}>
        <button
          onClick={() => {
            _SetStockAdding(!_StockAdding);
            console.log("Adding stock");
          }}
        >
          Add Stock
        </button>
      </div>
      {_StockAdding && (
        <div>
          <BBAdd addRecord={dbCrudOps.addRecord} />
        </div>
      )}
    </>
  );
};

export default BBRender;
