export interface CloudSPCustomList<
  SPCustomFields extends Partial<CloudSPList>,
> {
  "@odata.context": string;
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
  fields: SPCustomFields;
}

export interface CloudSPList {
  "@odata.etag": string;
  id: number;
  Title: string;
  ContentType: string;
  Modified: string;
  Created: string;
  AuthorLookupId: string;
  EditorLookupId: string;
  _UIVersionString: string;
  Attachments: boolean;
  Edit: string;
  LinkTitleNoMenu: string;
  LinkTitle: string;
  ItemChildCount: string;
  FolderChildCount: string;
  _ComplianceFlags: string;
  _ComplianceTag: string;
  _ComplianceTagWrittenTime: string;
  _ComplianceTagUserId: string;
  AppAuthorLookupId: string;
  AppEditorLookupId: string;
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
