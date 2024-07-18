interface RootObject {
  "@odata.etag": string;
  createdDateTime: string;
  eTag: string;
  id: string;
  lastModifiedDateTime: string;
  webUrl: string;
  createdBy: CreatedBy;
  lastModifiedBy: LastModifiedBy;
  parentReference: ParentReference;
  contentType: ContentType;
  "fields@odata.context": string;
  fields: Fields;
}

interface Fields {
  "@odata.etag": string;
  id: string;
  tagnr: string;
  dateOfBirth: string;
  gender: string;
}

interface ContentType {
  id: string;
  name: string;
}

interface ParentReference {
  id: string;
  siteId: string;
}

interface LastModifiedBy {
  application: Application;
  user: User;
}

interface Application {
  id: string;
  displayName: string;
}

interface CreatedBy {
  user: User;
}

interface User {
  displayName: string;
}
