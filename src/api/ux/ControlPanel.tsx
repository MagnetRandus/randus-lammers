import React from "react";
import styles from "./ControlPanel.module.scss";
import BBDetail from "./BBDetail";
import { dbCrudOps } from "../types";
import { DefaultButton, Stack } from "@fluentui/react";

export interface IPropsBBRender {
  dbCrudOps: dbCrudOps;
  IdFocus: number;
  SetIdfocus: React.Dispatch<React.SetStateAction<number>>;
}

const BBRender: React.FC<IPropsBBRender> = function ({
  dbCrudOps,
  IdFocus,
  SetIdfocus,
}) {
  const [AddingStock, AddingStockSet] = React.useState<boolean>(false);

  return (
    <>
      <Stack horizontal className={styles.ControlPanel}>
        <DefaultButton
          text="Add Stock"
          onClick={() => {
            AddingStockSet(!AddingStock);
            console.log("Adding stock");
          }}
        />
        <DefaultButton
          text="Test"
          onClick={() => {
            window.eapi.useGraph("ONE");
          }}
        />
      </Stack>
      {AddingStock && (
        <div>
          <BBDetail
            IdFocus={IdFocus}
            SetAddingStock={AddingStockSet}
            shwRecord={dbCrudOps.shwRecord}
            addRecord={dbCrudOps.addRecord}
            updRecord={dbCrudOps.updRecord}
            delRecord={dbCrudOps.delRecord}
            SetIdfocus={SetIdfocus}
          />
        </div>
      )}
    </>
  );
};

export default BBRender;
