// import Ajv, { JSONSchemaType } from "ajv";
// import addFormats from "ajv-formats";
// import { readFileSync } from "fs";
// import { join } from "path";
// import RootObject from "../interfaces/dbSchema";

// function schemaValidate(): RootObject {
//   const tPath = join(__dirname, "..", "..", "assets", "schemas");

//   // Load and parse JSON schema
//   const dbSchema: JSONSchemaType<unknown> = JSON.parse(
//     readFileSync(join(tPath, `db.schema.json`), "utf-8")
//   );
//   const bbSchema: JSONSchemaType<unknown> = JSON.parse(
//     readFileSync(join(tPath, `bb.schema.json`), "utf-8")
//   );

//   // Load JSON data
//   const db = JSON.parse(
//     readFileSync(join(tPath, "db", `data.json`), "utf-8")
//   ) as RootObject;

//   // Validate data against schema
//   const ajv = new Ajv({ allErrors: true, schemas: [dbSchema, bbSchema] });

//   addFormats(ajv);

//   const validate = ajv.compile(dbSchema);
//   const valid = validate(db);

//   if (db && valid) {
//     return db;
//   }

//   return {
//     status: String(validate.errors),
//     adb: undefined,
//   };
// }

// export default schemaValidate;
