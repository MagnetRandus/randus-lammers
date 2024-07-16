import { authInfo } from "./AuthInfo";

export interface sysProps {
  credentials: authInfo;
  spdomain: string;
  subsite: string;
  interface_destination: string;
}
