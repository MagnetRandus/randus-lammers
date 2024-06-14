import React from "react";
import styles from "./bb.module.scss";
import BBAdd from "./addbb";

interface IPropsBB {
  inf: string;
}

const BBRender: React.FC<IPropsBB> = function () {
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
          <BBAdd s="a" />
        </div>
      )}
    </>
  );
};

export default BBRender;
