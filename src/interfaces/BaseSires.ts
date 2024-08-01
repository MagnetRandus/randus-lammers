import { TSPListBaseCreate } from "./LISTS/base/IGraphListItemCustomField";
import { IGCLICFSires } from "./LISTS/sires/IGLICF-Sires";

interface BaseSiresCreate extends TSPListBaseCreate {
  Sires: Array<IGCLICFSires> | undefined;
}

export default BaseSiresCreate;
