import { IBuckDoe } from "Types/BuckDoe";
import { Status } from "Types/Status";

interface IBBIdent {
  TagNr: string;
  ItemId: number;
  Sks: IBuckDoe;
  Weight: number;
  Status: Status;
}

export default IBBIdent;
