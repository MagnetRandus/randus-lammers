// interface CustomStylesProps {
//   customLabel?: Partial<ITextFieldStyles>;
//   customText?: Partial<ITextFieldStyles>;
// }

import { ITextFieldStyles, Label, mergeStyleSets, Text } from "@fluentui/react";
import colorScheme from "./ColourScheme";
import commonStyles from "./CommonStyles";

// const lsLabel = mergeStyleSets({
//   root: [
//     {
//       fontWeight: 600,
//       fontSize: 14,
//       margin: 0,
//       padding: "5px 0px",
//       display: "block",
//     },
//     CommonStyle,
//   ],
// });

// const lsText = mergeStyleSets({
//   root: [
//     {
//       color: colorScheme.desertTan,
//     },
//   ],
//   field: {
//     selectors: {
//       ":focus": {
//         border: `3px solid ${colorScheme.desertTan}`,
//       },
//     },
//   },
// });

const customStyles_Control: Partial<ITextFieldStyles> = {
  root: {},
};

const customStyles__Label: Partial<ITextFieldStyles> = {
  root: {
    fontWeight: 600,
    fontSize: 14,
    margin: 0,
    padding: "5px 0px",
    display: "block",
  },
};

const customStyles__Text: Partial<ITextFieldStyles> = {
  root: {
    background: colorScheme.whiteAlpha,
    height: 30,
    fontSize: 14,
    paddingRight: "28px",
    paddingLeft: "8px",
    paddingTop: "8px",
    borderRadius: "2px",
    margin: 0,
    marginTop: "0 !important",
  },
};

const UXTextInBlock = (props: { Label: string; Value: string }) => {
  return (
    <>
      <Label
        styles={mergeStyleSets(
          commonStyles,
          customStyles__Label,
          customStyles_Control
        )}
      >
        {props.Label}
      </Label>
      <Text
        styles={mergeStyleSets(
          commonStyles,
          customStyles__Text,
          customStyles_Control
        )}
      >
        {props.Value}
      </Text>
    </>
  );
};

export default UXTextInBlock;
