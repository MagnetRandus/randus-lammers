import IBBIdent from "Interfaces/IBBIdent";
import ThemeColor from "Ux/ColorScheme";

interface IPropsABC {
  ItemId: number;
  Sires: Map<number, IBBIdent[]> | undefined;
}

const SiresFor: React.FC<IPropsABC> = ({ ItemId, Sires }) => {
  if (Sires) {
    const siresfor = Sires.get(ItemId);
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
              {j.TagNr}
            </div>
          ))}
        </div>
      );
    }
  }
  return undefined;
};

export default SiresFor;
