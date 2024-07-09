export interface authInfo {
  authority: string;
  clientId: string;
  clientSecret: string;
}

export interface sysProps {
  credentials: authInfo;
  spdomain: string;
  subsite: string;
  interface_destination: string;
}
