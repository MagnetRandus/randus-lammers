export interface __metadata {
  id: string;
  uri: string;
  type: string;
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

export interface TitleResource {
  __deferred: __deferred;
}

export interface RootObject {
  __metadata: __metadata;
  DescriptionResource: DescriptionResource;
  TitleResource: TitleResource;
  AutoIndexed: boolean;
  CanBeDeleted: boolean;
  ClientSideComponentId: string;
  clientSideComponentProperties?: any;
  clientValidationFormula?: any;
  clientValidationMessage?: any;
  customFormatter?: any;
  defaultFormula?: any;
  defaultValue?: any;
  Description: string;
  Direction: string;
  EnforceUniqueValues: boolean;
  EntityPropertyName: string;
  Filterable: boolean;
  FromBaseType: boolean;
  Group: string;
  Hidden: boolean;
  Id: string;
  Indexed: boolean;
  IndexStatus: number;
  InternalName: string;
  IsModern: boolean;
  jSLink?: any;
  PinnedToFiltersPane: boolean;
  ReadOnlyField: boolean;
  Required: boolean;
  SchemaXml: string;
  Scope: string;
  Sealed: boolean;
  ShowInFiltersPane: number;
  Sortable: boolean;
  StaticName: string;
  Title: string;
  FieldTypeKind: number;
  TypeAsString: string;
  TypeDisplayName: string;
  TypeShortDescription: string;
  validationFormula?: any;
  validationMessage?: any;
}

export default RootObject;
