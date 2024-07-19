import { IStackStyles, IStackTokens } from "@fluentui/react";
import colorScheme from "./ColorScheme";

export const StackHorizStyles: IStackStyles = {
  root: [
    {
      marginRight: 10,
      minWidth: 125,
      backgroundColor: colorScheme.almondCream,
      paddingBottom: 12,
      paddingLeft: 12,
    },
  ],
  inner: {
    overflow: "hidden",
  },
};

export const stackHorizToken: IStackTokens = {
  childrenGap: 10,
  padding: 0,
};
