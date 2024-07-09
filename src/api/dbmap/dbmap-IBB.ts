import IBB from "../../interfaces/IBB";
import IIBBForm from "../../interfaces/IIBBForm";
import convertDateString from "../t/DateParse";
import { BGender } from "../types";

const dbmapIBB = (formBB: IIBBForm): IBB => {
  return {
    id: Number(formBB.id),
    dateOfBirth: formBB.dateOfBirth
      ? convertDateString(formBB.dateOfBirth)
      : undefined,
    gender: formBB.gender as BGender,
    sire: formBB.sire ? Number(formBB.sire) : undefined,
    dam: formBB.dam ? Number(formBB.dam) : undefined,
  };
};

export default dbmapIBB;
