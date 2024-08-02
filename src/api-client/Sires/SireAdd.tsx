import { BaseButton, Stack } from "@fluentui/react";
import IBBIdent from "Interfaces/IBBIdent";
import ISireIdent from "Interfaces/ISireIdent";
import ObjectMake from "Tools/ObjectMake";
import { StackGenericStyles, stackGenericToken } from "Ux/StackGeneric";

interface IPropsABC {
  BB: IBBIdent | undefined;
  BBIdents: Array<IBBIdent> | undefined;
  Sires: Set<ISireIdent>;
  SetSires: React.Dispatch<React.SetStateAction<Set<Partial<ISireIdent>>>>;
}

const SiresAdd: React.FC<IPropsABC> = ({ BB, BBIdents, Sires, SetSires }) => {
  if (BB === undefined) throw new Error(`BBIdent can't be undefined`);

  return (
    <Stack>
      <Stack horizontal styles={StackGenericStyles} tokens={stackGenericToken}>
        {Sires.size !== 0 &&
          Array.from(Sires)
            .sort(
              (a, b) => parseInt(a.sire.TagNr, 10) - parseInt(b.sire.TagNr, 10)
            )
            .map((sireIdent) => (
              <BaseButton
                title={JSON.stringify(sireIdent)}
                style={{ display: "inline-block", marginLeft: 3 }}
                key={sireIdent.sire.ItemId}
                onClick={() => {
                  SetSires((prevSiresMap) => {
                    const newSet = new Set(prevSiresMap);
                    newSet.delete(sireIdent);
                    return newSet;
                  });
                }}
              >
                {sireIdent.sire.TagNr}
              </BaseButton>
            ))}
      </Stack>
      <Stack horizontal styles={StackGenericStyles} tokens={stackGenericToken}>
        {BBIdents &&
          BBIdents.filter(
            (sire) =>
              sire.Sks === "Buck" &&
              sire.Status === "Alive" &&
              sire.ItemId !== BB.ItemId
          ).map(
            (bbIdent) =>
              !Array.from(Sires)
                .sort(
                  (a, b) => parseInt(a.bb.TagNr, 10) - parseInt(b.bb.TagNr, 10)
                )
                .map((j) => j.sire)
                .includes(bbIdent) && (
                <BaseButton
                  title={JSON.stringify(bbIdent)}
                  style={{ display: "inline-block", marginLeft: 3 }}
                  key={bbIdent.ItemId}
                  onClick={() => {
                    SetSires((prevSiresMap) => {
                      const newSet = new Set(prevSiresMap);
                      newSet.add(
                        ObjectMake<Partial<ISireIdent>>({
                          bb: BB,
                          sire: bbIdent,
                        })
                      );
                      return newSet;
                    });
                  }}
                >
                  {bbIdent.TagNr}
                </BaseButton>
              )
          )}
      </Stack>
    </Stack>
  );
};

export default SiresAdd;
