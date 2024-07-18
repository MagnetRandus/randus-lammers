export type UriParams = "UriParams";
export type ROpts = "fields";

// This Non-Recursive approach could be used instead
type Primitive = string | number | boolean | symbol | null | undefined;
type Flatten<Obj, Prefix extends string = ""> = {
  [Key in keyof Obj & string as `${Prefix}${Key}`]: Obj[Key] extends Primitive ? `${Prefix}${Key}` : Flatten<Obj[Key], `${Prefix}${Key}/`>;
};

type NestedKeys<T> = Flatten<T>[keyof Flatten<T>];

export type SOpts<T, K> = T extends "fields" ? NestedKeys<K> : never;

export type BrandedString<T extends string> = string & { __brand: T };
