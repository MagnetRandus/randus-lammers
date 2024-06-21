/**
 * db record handler
 */

import _ from "underscore";

import { IBB, IDBCrud, IDBO, IDBOx } from "../types";
import React from "react";

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
    if (
      idx !== undefined &&
      idx !== -1 &&
      this.dbInstance &&
      this.dbInstance.adb
    ) {
      return this.dbInstance.adb[idx];
    } else throw new Error(`Could not find id: ${Id} in the database`);
  }
  private async updRecord(data: IBB) {
    if (this.dbInstance && this.dbInstance.adb) {
      // Find the index of the existing record
      const index = _.findIndex(this.dbInstance.adb, { id: data.id });
      if (index === -1) {
        console.warn(`Record with ID ${data.id} not found.`);
        return; // Exit if no record with the specified ID exists
      }

      // Update the record
      this.dbInstance.adb[index] = { ...this.dbInstance.adb[index], ...data };
      await this.eapi.dbWrite(_.omit(this.dbInstance, "crud") as IDBO);
      this.SetOdb({ ...this.dbInstance }); // Ensure the state is updated with the latest data
    }
  }
  private async delRecord(id: number) {
    if (this.dbInstance && this.dbInstance.adb) {
      // Filter out the record with the specified ID
      const newAdb = _.reject(
        this.dbInstance.adb,
        (record) => record.id === id
      );
      if (newAdb.length === this.dbInstance.adb.length) {
        console.warn(`Record with ID ${id} not found.`);
        return; // Exit if no record with the specified ID exists
      }

      // Update the adb array
      this.dbInstance.adb = newAdb;
      await this.eapi.dbWrite(_.omit(this.dbInstance, "crud") as IDBO);
      this.SetOdb({ ...this.dbInstance }); // Ensure the state is updated with the latest data
    }
  }
}

export default RecordHandler;
