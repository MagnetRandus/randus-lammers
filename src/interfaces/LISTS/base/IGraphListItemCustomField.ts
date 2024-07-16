import { Gender } from "Types/Gender";

interface IGraphListItemCustomField {
  tagnr: string;
  dateOfBirth: Date;
  sire: number;
  dam: number;
  gender: Gender;
}

// export interface IGraphListItemCustomField extends Fields {
//   tagnr: string;
//   dateOfBirth: Date;
//   sire: number;
//   dam: number;
//   gender: Gender;
// }

export type WithCustomFields<T> = T & IGraphListItemCustomField;
