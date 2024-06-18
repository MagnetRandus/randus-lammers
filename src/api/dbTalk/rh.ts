/**
 * db record handler
 */

import _ from "underscore";

import { IBB, IDBCrud, IDBO, IDBOx, TSetRecord } from "../types";
import React from "react";

export interface dbCrudOps {
  addRecord: TSetRecord;
}

class RecordHandler {
  private dbInstance: IDBCrud;
  constructor(
    private eapi: typeof window.eapi,
    private SetOdb: React.Dispatch<React.SetStateAction<IDBOx>>
  ) {}
  getDb() {
    this.eapi.dbRead().then((dbo) => {
      (dbo as IDBCrud).crud = {
        addRecord: (data: IBB) => {
          if (this.dbInstance && this.dbInstance.adb) {
            this.dbInstance.adb = _.union(this.dbInstance.adb, [data]);
            this.eapi.dbWrite(_.omit(this.dbInstance, "crud") as IDBO);
          }
        },
      };
      this.dbInstance = dbo as IDBCrud;
      this.SetOdb(dbo);
      console.dir(this);
    });
    // this.SetOdb(this.eapi.dbRead())
  }
}

export default RecordHandler;
