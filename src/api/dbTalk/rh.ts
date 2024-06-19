/**
 * db record handler
 */

import _ from "underscore";

import { IBB, IDBCrud, IDBO, IDBOx, TSetRecord, TShwRecord } from "../types";
import React from "react";

export interface dbCrudOps {
  addRecord: TSetRecord;
  shwRecord: TShwRecord;
}

class RecordHandler {
  private dbInstance: IDBCrud;
  private dbo: IDBO;
  constructor(
    private eapi: typeof window.eapi,
    private SetOdb: React.Dispatch<React.SetStateAction<IDBOx>>
  ) {}
  async getDb() {
    try {
      const dbo = (this.dbo = await this.eapi.dbRead());

      this.dbInstance = { ...dbo, crud: {} } as IDBCrud;
      this.dbInstance.crud.addRecord = this.addRecord.bind(this);
      this.dbInstance.crud.shwRecord = this.shwRecord.bind(this);
      this.SetOdb(this.dbInstance);
    } catch (error) {
      console.error("Error reading the database:", error);
    }
  }
  private addRecord(data: IBB): string {
    if (this.dbInstance && this.dbInstance.adb) {
      //
      if (_.findWhere(this.dbInstance.adb, { id: data.id })) {
        return `Duplicate Id encountered ${data.id}`;
      }

      this.dbInstance.adb = _.union(this.dbInstance.adb, [data]); //Add Record
      this.eapi.dbWrite(_.omit(this.dbInstance, "crud") as IDBO);
      this.SetOdb({ ...this.dbInstance }); // Ensure the state is updated with the latest data
      return "OK";
    }
    return "BAD";
  }
  private shwRecord(Id: number): IBB {
    const idx = this.dbInstance.adb?.findIndex((d) => d.id === Id);
    if (idx && this.dbInstance && this.dbInstance.adb) {
      return this.dbInstance.adb[idx];
    } else throw new Error(`Could not find id: ${Id} in the database`);
  }
}

export default RecordHandler;
