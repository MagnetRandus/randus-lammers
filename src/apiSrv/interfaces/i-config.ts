export interface authInfo {
  authority: string;
  clientId: string;
  clientSecret: string;
}

export interface SysConfig {
  credentials: authInfo;
  spdomain: string;
  subsite: string;
  interface_destination: string;
}
