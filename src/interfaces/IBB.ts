import { BGender } from "../api/types";

interface IBB {
  id: number;
  dateOfBirth?: string;
  gender: BGender;
  dam?: number;
  sire?: number;
}

export default IBB;
