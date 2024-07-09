import ibb from "../interfaces/IBB";
import idbo from "../interfaces/dbSchema";
import RootObjectCrud from "../interfaces/dbSchemaCrud";

export type IDBO = idbo;
export type IDBOx = IDBO | undefined;
export type IDBCrud = RootObjectCrud;
export type IDBCrudx = RootObjectCrud | undefined;
export type IBB = ibb;
export type IBBx = IBB | undefined;

/**
 * db Operations
 */

export type TSetRecord = (data: IBB) => void;
export type TUpdRecord = (data: IBB) => void;
export type TShwRecord = (id: number) => IBB;
export type TDelRecord = (id: number) => void;

export interface dbCrudOps {
  addRecord: TSetRecord;
  shwRecord: TShwRecord;
  updRecord: TUpdRecord;
  delRecord: TDelRecord;
}

/**
 * Other interfaces
 */

export type BGender = "Buck" | "Doe";
