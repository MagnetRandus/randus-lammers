/**
 * https://learn.microsoft.com/en-us/graph/api/resources/listitem?view=graph-rest-1.0
 */

import { CreatedBy } from "./graph-createdBy";
import { ContentType } from "./graph-contenttype";
import { LastModifiedBy } from "./graph-lastmodifiedby";
import { ParentReference } from "./graph-parentreference";
import { WithSPFields } from "Interfaces/LISTS/base/IGraphListItemCustomField";
import Fields from "./graph-listitem-field";

interface IGraphListItem {
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
  fields: WithSPFields<Fields>;
}

export default IGraphListItem;
