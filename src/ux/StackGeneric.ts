import { IStackStyles, IStackTokens } from "@fluentui/react";
import ThemeColor from "./ColorScheme";

export const StackGenericStyles: IStackStyles = {
  root: [
    {
      minWidth: 125,
      backgroundColor: ThemeColor.lavenderMist,
      paddingTop: 12,
      paddingLeft: 12,
      paddingBottom: 12,
      marginBottom: 12,
      border: `1px solid ${ThemeColor.lavenderMist}`,
      gap: 7,
    },
  ],
  inner: {
    overflow: "hidden",
  },
};

export const stackGenericToken: IStackTokens = {
  childrenGap: 10,
  padding: 0,
};
