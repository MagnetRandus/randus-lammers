import IGraphListItem from "Interfaces/SP/graph-listitem";
import { FieldsCustom } from "Interfaces/SP/graph-listitem-field";
import UOM from "Types/UOM";

interface IGCLICMedication {
  bbDate: Date;
  bbRef: number; //Lookup
  bbDosage: number;
  bbMedicine: string;
  bbUnitMeasured: UOM;
}

/**
 * This type provide the default SharePoint List interface, plus the custom added fields
 */
export type TSPLBMedicationRead = IGraphListItem<FieldsCustom<IGCLICMedication>>;

export type TSPLBMedicationReadItem = FieldsCustom<IGCLICMedication>;

/**
 * Can write this as one, but its harder to read:
    type TSPListBaseA<T> = Omit<T & {sireLookupId:number, damLookupId:number}, "sire" | "dam">;
 */

type TSPListBaseA<T> = Omit<T, "bbRef">;
type TSPListBaseAA<T> = TSPListBaseA<T> & { bbRefLookupId: number | null };

export type TSPLBMedicationCreate = TSPListBaseAA<IGCLICMedication>; //Type of Creating an item
