interface IColumn {
  "@odata.context": string;
  columnGroup: string;
  description: string;
  displayName: string;
  enforceUniqueValues: boolean;
  hidden: boolean;
  id: string;
  indexed: boolean;
  name: string;
  readOnly: boolean;
  required: boolean;
  text?: IColText;
  number: IColNumber;
  lookup: IColLookup;
}

export interface IColLookup {
  allowMultipleValues: boolean;
  allowUnlimitedLength: boolean;
  columnName: string;
  listId: string;
  primaryLookupColumnId: string;
}

export interface IColText {
  allowMultipleLines: boolean;
  appendChangesToExistingText: boolean;
  linesForEditing: number;
  maxLength: number;
}

export interface IColNumber {
  decimalPlaces: "automatic" | "none" | "one" | "two" | "three" | "four" | "five";
  displayAs: "number" | "percentage";
  maximum?: number;
  minimum?: number;
}
