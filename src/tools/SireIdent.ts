import ISireIdent from "Interfaces/ISireIdent";
import { TSPLBSireRead } from "Interfaces/LISTS/sires/IGLICF-Sires";
import { ISireIdents } from "Types/ISireIdents";
import ObjectMake from "./ObjectMake";
import { IBBIdents } from "Types/IBBIdents";
import { BBIdentFromItemId } from "./BBIdent";

function SireReadToIdent(sires: TSPLBSireRead[] | undefined, BBIdents: IBBIdents): ISireIdents | undefined {
  if (sires && sires.length > 0) {
    return sires
      .sort((a, b) => {
        try {
          return parseInt(a.fields.sireRef, 10) - parseInt(b.fields.sireRef, 10);
        } catch (error) {
          window.eapi.localLogging("Error", "SireReadToIdent-Sort", "This should not be here, but check sires list for blank values");
          return -1;
        }
      })
      .map((j) => {
        const bb = BBIdentFromItemId(BBIdents, j.fields.bbRef);
        const sire = BBIdentFromItemId(BBIdents, j.fields.sireRef);
        if (bb && sire) {
          return ObjectMake<ISireIdent>({ bb: bb, ItemId: j.fields.id, sire: sire });
        }
        throw new Error(`Unlikely, but undefined`);
      });
  }

  return undefined;
}
export default SireReadToIdent;
