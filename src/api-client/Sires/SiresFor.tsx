import IBBIdent from "Interfaces/IBBIdent";
import { ISireIdents } from "Types/ISireIdents";
import ThemeColor from "Ux/ColorScheme";

interface IPropsABC {
  IbbIdent: IBBIdent | undefined;
  Sires: Map<IBBIdent, ISireIdents | undefined>;
}

const SiresFor: React.FC<IPropsABC> = ({ IbbIdent, Sires }) => {
  if (Sires && IbbIdent) {
    const siresfor = Sires.get(IbbIdent);
    if (siresfor) {
      return (
        <div>
          {siresfor.map((j) => (
            <div
              style={{
                display: "inline-block",
                marginRight: 3,
                border: `1px solid ${ThemeColor.royalPlum}`,
                padding: 2,
              }}
              key={j.ItemId}
            >
              {j.sire.TagNr}
            </div>
          ))}
        </div>
      );
    }
  }
  return undefined;
};

export default SiresFor;
