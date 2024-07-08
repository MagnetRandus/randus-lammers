import { GraphError } from "@microsoft/microsoft-graph-client";

interface CustomGraphErrorBody {
  code: string;
  message: string;
  innerError: InnerError;
}

interface InnerError {
  date: string;
  "request-id": string;
  "client-request-id": string;
}

// type AsGraphError<T> = T & { statusCode: number; code: string | null; requestId: string | null; date: Date; headers?: Headers; body: any };

// // Here, we'll create a type that changes the type of the `qaValue` and `prodValue` properties
// type WithChangedTypes<T> = {
//   [K in keyof T]: K extends GraphError ? string | number | Date | undefined | CustomGraphErrorBody  : T[K];
// };
// //  Now, we can create `IFlatDiffDb` using our new types
// export type IGraphError = WithChangedTypes<AsGraphError<Error>>;

export function isGraphError(error: Error): error is GraphError {
  return (
    "statusCode" in error &&
    "code" in error &&
    "requestId" in error &&
    "date" in error &&
    "body" in error
  );
}
export function parseGraphErrorBody(
  graphError: GraphError
): CustomGraphErrorBody {
  return JSON.parse(graphError.body);
}
