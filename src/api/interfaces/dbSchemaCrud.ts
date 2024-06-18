import { dbCrudOps } from "../dbTalk/rh";
import RootObject from "./dbSchema";

interface RootObjectCrud extends RootObject {
  crud: dbCrudOps; //This not reflected on the JSON schema
}

export default RootObjectCrud;
