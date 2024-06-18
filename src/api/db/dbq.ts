import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import IDBStruct from "../interfaces/dbSchema";
import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";

class dbq {
  private readonly tpath: string;
  constructor() {
    this.tpath = join(__dirname, "..", "..", "assets", "schemas");
  }

  public get db(): IDBStruct | undefined {
    try {
      const v = JSON.parse(
        readFileSync(join(this.tpath, "db", `data.json`), "utf-8")
      ) as IDBStruct;

      console.log(`READING DB`);

      return this.validate(v);
    } catch (err) {
      console.dir(err);
      return undefined;
    }
  }

  public set db(v: IDBStruct | undefined) {
    if (v) {
      writeFileSync(
        join(this.tpath, "db", `data.json`),
        JSON.stringify(this.validate(v)),
        "utf-8"
      );
    } else {
      throw new Error(`DB can't be set to undefined`);
    }
  }
  private validate(db: IDBStruct): IDBStruct {
    const dbSchema: JSONSchemaType<unknown> = JSON.parse(
      readFileSync(join(this.tpath, `db.schema.json`), "utf-8")
    );
    const bbSchema: JSONSchemaType<unknown> = JSON.parse(
      readFileSync(join(this.tpath, `bb.schema.json`), "utf-8")
    );
    const ajv = new Ajv({ allErrors: true, schemas: [dbSchema, bbSchema] });

    addFormats(ajv);

    const validate = ajv.compile(dbSchema);
    if (!validate(db)) {
      throw new Error(JSON.stringify(validate.errors));
    }

    return db;
  }
}

export default dbq;
