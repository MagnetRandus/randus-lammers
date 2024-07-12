/* eslint-disable @typescript-eslint/no-empty-interface */
export interface cloudSPSite {
  "@odata.context": string;
  createdDateTime: string;
  description: string;
  id: string;
  lastModifiedDateTime: string;
  name: string;
  webUrl: string;
  displayName: string;
  root: Root;
  siteCollection: SiteCollection;
}

interface SiteCollection {
  hostname: string;
}

interface Root {}
