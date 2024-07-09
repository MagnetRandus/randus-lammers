import { IBaseField } from "../i-item";

interface ListFields_testListName extends Partial<IBaseField> {
  firstColumn: string;
  SecondColumn: string;
  ThirdColumn: number;
  lkpDocs: number;
}

type testListName = ListFields_testListName;
export default testListName;

type WithLookupId<T> = T & { lkpDocsLookupId: number };
type WithoutlkpDocs<T> = Omit<T, "lkpDocs">;

type WithChangedTypes<T> = {
  [K in keyof T]: K extends "lkpDocsLookupId" ? number : T[K];
};
export type testListName_CU = WithChangedTypes<
  WithLookupId<WithoutlkpDocs<ListFields_testListName>>
>;
export type testListName_Read = WithChangedTypes<
  WithLookupId<ListFields_testListName>
>;
