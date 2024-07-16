import { User } from "./User";
import { Application } from "./graph-Application";

export interface LastModifiedBy {
  application: Application;
  user: User;
}
