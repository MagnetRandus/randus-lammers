import { ITextFieldStyles, mergeStyleSets } from "@fluentui/react";
import colorScheme from "./ColourScheme";
import commonStyles from "./CommonStyles";

const ButtonStyling: Partial<ITextFieldStyles> = {
  root: {
    background: colorScheme.coralOrange,
    borderRadius: "2px",
    margin: 0,
    selectors: {
      ":hover": {
        background: colorScheme.walnutBrown, // Change this to your desired hover color
      },
    },
  },
};

const CancelButtonStyle: Partial<ITextFieldStyles> = {
  root: {
    background: colorScheme.sageGreen,
    borderRadius: "2px",
    margin: 0,
  },
};

const UpdateButtonStyle: Partial<ITextFieldStyles> = {
  root: {
    background: colorScheme.coralOrange,
    borderRadius: "2px",
    margin: 0,
  },
};

const SubmitButtonStyle: Partial<ITextFieldStyles> = {
  root: {
    background: colorScheme.coralOrange,
    borderRadius: "2px",
    margin: 0,
  },
};

const GetButtonStyle = () => {
  return {
    Cancel: mergeStyleSets(commonStyles, ButtonStyling, CancelButtonStyle),
    Update: mergeStyleSets(commonStyles, ButtonStyling, UpdateButtonStyle),
    Submit: mergeStyleSets(commonStyles, ButtonStyling, SubmitButtonStyle),
  };
};

export default GetButtonStyle;
