import {
  BrandedString,
  ROpts,
  SOpts,
  UriParams,
} from "iSurfaces/cloud-graph-endpoint";

/**
 * How to call this:
// uriParamsBuild<testListName>('fields',['ContentType','Created']);
 * 
 * @param opt 
 * @param sel 
 * @returns BrandedString<"CustomString">
 */
export function uriParamsBuild<K>(
  opt: ROpts,
  sel: SOpts<ROpts, K>[]
): BrandedString<UriParams> {
  const expStr = `${opt}($select=${sel.join(",")})`;
  return expStr as BrandedString<UriParams>;
}
