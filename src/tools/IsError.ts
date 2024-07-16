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
