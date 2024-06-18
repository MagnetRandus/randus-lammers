import { BGender } from "../types";

interface IBB {
  id: number;
  dateOfBirth?: string;
  gender: BGender;
  dam?: number;
  sire?: number;
}

export default IBB;
