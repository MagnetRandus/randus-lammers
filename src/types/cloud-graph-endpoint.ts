export type UriParams = "UriParams";
export type ROpts = "fields";

export type SOpts<T, K> = T extends "fields" ? keyof K : never;

export type BrandedString<T extends string> = string & { __brand: T };
