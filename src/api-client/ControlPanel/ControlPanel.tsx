import { Stack, BaseButton, ITextFieldStyles } from "@fluentui/react";
import colorScheme from "Ux/ColorScheme";
import * as React from "react";
// Define the styles for the TextField component using the colorScheme
const textFieldStyles: Partial<ITextFieldStyles> = {
  root: {
    backgroundColor: colorScheme.almondCream,
    border: `1px solid ${colorScheme.desertTan}`,
    height: `35px`,
    padding: `3px`,
    gap: `7px`,
  },
  fieldGroup: {
    borderColor: colorScheme.walnutBrown,
  },
  field: {
    color: colorScheme.walnutBrown,
  },
  errorMessage: {
    color: colorScheme.coralOrange,
  },
};

// Use the TextField component with the defined styles

interface IPropControlPanel {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  isAdding: boolean;
  statusMessage: string | undefined;
}

const ControlPanel: React.FC<IPropControlPanel> = ({
  setIsAdding,
  isAdding,
  statusMessage,
}) => {
  return (
    <Stack horizontal styles={textFieldStyles}>
      <BaseButton
        hidden={isAdding}
        type="button"
        onClick={() => {
          setIsAdding(!isAdding);
        }}
      >
        Add
      </BaseButton>
      <BaseButton hidden={!isAdding} type="submit">
        Save
      </BaseButton>
      <BaseButton onClick={() => setIsAdding(false)}>Cancel</BaseButton>
      <Stack grow />
      {statusMessage && <div>{statusMessage}</div>}
    </Stack>
  );
};

export default ControlPanel;
