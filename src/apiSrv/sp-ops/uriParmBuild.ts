export type UriParams = "UriParams";
export type ROpts = "fields";

export type SOpts<T, K> = T extends "fields" ? keyof K : never;

export type BrandedString<T extends string> = string & { __brand: T };

/**
 * How to call this:
// uriParamsBuild<testListName>('fields',['ContentType','Created']);
 * 
 * @param opt 
 * @param sel 
 * @returns BrandedString<"CustomString">
 */
export function uriParamsBuild<K>(opt: ROpts, sel: SOpts<ROpts, K>[]): BrandedString<UriParams> {
  const expStr = `${opt}($select=${sel.join(",")})`;
  return expStr as BrandedString<UriParams>;
}
