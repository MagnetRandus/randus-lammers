export interface __metadata {
  id: string;
  uri: string;
  etag: string;
  type: string;
}

export interface __deferred {
  uri: string;
}

export interface FirstUniqueAncestorSecurableObject {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface RoleAssignment {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface Author {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface ContentType {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface CreatablesInfo {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface DefaultView {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface DescriptionResource {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface EventReceiver {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface Field {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface Form {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface InformationRightsManagementSetting {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface Item {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface ParentWeb {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface RootFolder {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface Subscription {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface TitleResource {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface UserCustomAction {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface VersionPolicy {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface View {
  __deferred: __deferred;
}

export interface __deferred {
  uri: string;
}

export interface WorkflowAssociation {
  __deferred: __deferred;
}

export interface __metadata {
  type: string;
}

export interface CurrentChangeToken {
  __metadata: __metadata;
  StringValue: string;
}

export interface __metadata {
  type: string;
}

export interface ImagePath {
  __metadata: __metadata;
  DecodedUrl: string;
}

export interface __metadata {
  type: string;
}

export interface ParentWebPath {
  __metadata: __metadata;
  DecodedUrl: string;
}

export interface RootObject {
  __metadata: __metadata;
  FirstUniqueAncestorSecurableObject: FirstUniqueAncestorSecurableObject;
  RoleAssignments: RoleAssignment;
  Author: Author;
  ContentTypes: ContentType;
  CreatablesInfo: CreatablesInfo;
  DefaultView: DefaultView;
  DescriptionResource: DescriptionResource;
  EventReceivers: EventReceiver;
  Fields: Field;
  Forms: Form;
  InformationRightsManagementSettings: InformationRightsManagementSetting;
  Items: Item;
  ParentWeb: ParentWeb;
  RootFolder: RootFolder;
  Subscriptions: Subscription;
  TitleResource: TitleResource;
  UserCustomActions: UserCustomAction;
  VersionPolicies: VersionPolicy;
  Views: View;
  WorkflowAssociations: WorkflowAssociation;
  AllowContentTypes: boolean;
  BaseTemplate: number;
  BaseType: number;
  ContentTypesEnabled: boolean;
  CrawlNonDefaultViews: boolean;
  Created: string;
  CurrentChangeToken: CurrentChangeToken;
  DefaultContentApprovalWorkflowId: string;
  DefaultItemOpenUseListSetting: boolean;
  Description: string;
  Direction: string;
  DisableCommenting: boolean;
  DisableGridEditing: boolean;
  documentTemplateUrl?: any;
  DraftVersionVisibility: number;
  EnableAttachments: boolean;
  EnableFolderCreation: boolean;
  EnableMinorVersions: boolean;
  EnableModeration: boolean;
  EnableRequestSignOff: boolean;
  EnableVersioning: boolean;
  EntityTypeName: string;
  ExemptFromBlockDownloadOfNonViewableFiles: boolean;
  FileSavePostProcessingEnabled: boolean;
  ForceCheckout: boolean;
  HasExternalDataSource: boolean;
  Hidden: boolean;
  Id: string;
  ImagePath: ImagePath;
  ImageUrl: string;
  DefaultSensitivityLabelForLibrary: string;
  sensitivityLabelToEncryptOnDownloadForLibrary?: any;
  IrmEnabled: boolean;
  IrmExpire: boolean;
  IrmReject: boolean;
  IsApplicationList: boolean;
  IsCatalog: boolean;
  IsPrivate: boolean;
  ItemCount: number;
  LastItemDeletedDate: string;
  LastItemModifiedDate: string;
  LastItemUserModifiedDate: string;
  ListExperienceOptions: number;
  ListItemEntityTypeFullName: string;
  MajorVersionLimit: number;
  MajorWithMinorVersionsLimit: number;
  MultipleDataList: boolean;
  NoCrawl: boolean;
  ParentWebPath: ParentWebPath;
  ParentWebUrl: string;
  ParserDisabled: boolean;
  ServerTemplateCanCreateFolders: boolean;
  TemplateFeatureId: string;
  Title: string;
}

export default RootObject;
