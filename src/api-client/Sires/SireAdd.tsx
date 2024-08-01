import { BaseButton, Stack } from "@fluentui/react";
import IBBIdent from "Interfaces/IBBIdent";
import { useState } from "react";
import ThemeColor from "Ux/ColorScheme";
import { StackGenericStyles, stackGenericToken } from "Ux/StackGeneric";

interface IPropsABC {
  BBIdents: Array<IBBIdent> | undefined;
}

const SiresAdd: React.FC<IPropsABC> = ({ BBIdents }) => {
  const [BBuck, SetBBuck] = useState<Array<IBBIdent> | undefined>(
    BBIdents?.filter((j) => j.Sks === "Buck")
  );
  return (
    <Stack horizontal styles={StackGenericStyles} tokens={stackGenericToken}>
      {BBuck &&
        BBuck.map((bbident) => (
          <BaseButton
            style={{ display: "inline-block", marginLeft: 3 }}
            key={bbident.ItemId}
            onClick={(ev) => {
              console.dir(ev);
            }}
          >
            Buck:{bbident.TagNr}
          </BaseButton>
        ))}
    </Stack>
  );
};

export default SiresAdd;
