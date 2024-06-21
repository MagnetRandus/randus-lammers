// import colorScheme from "./ColourScheme";

const fontFamily = `'Segoe UI', "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif`;

import { mergeStyleSets } from "@fluentui/merge-styles";
import { ITextFieldStyles } from "@fluentui/react";

const CommonStyles: Partial<ITextFieldStyles> = {
  root: {
    fontFamily: fontFamily,
    WebkitFontSmoothing: "antialiased",
  },
};

const commonStyles = mergeStyleSets(CommonStyles);

export default commonStyles;
