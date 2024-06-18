import ibb from "./interfaces/IBB";
import idbo from "../api/interfaces/dbSchema";
import RootObjectCrud from "./interfaces/dbSchemaCrud";

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

/**
 * Other interfaces
 */

export type BGender = "Buck" | "Doe";
