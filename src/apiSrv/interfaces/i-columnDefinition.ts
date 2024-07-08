import { IColLookup, IColNumber, IColText } from "./i-colomn.js";

/**
 * Column types and definitions are listed here:
 * https://learn.microsoft.com/en-us/graph/api/resources/columndefinition?view=graph-rest-1.0
 */
export interface ColumnDefinition {
  description: string;
  enforceUniqueValues: boolean;
  hidden: boolean;
  indexed: boolean;
  name: string;
  text?: IColText;
  number?: IColNumber;
  lookup?: IColLookup;
  required?: boolean;
  isSealed?: boolean;
}
