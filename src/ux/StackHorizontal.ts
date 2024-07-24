import { IStackStyles, IStackTokens } from "@fluentui/react";

interface IHorizStackOpts {
  bgColor: string;
  bordercolor: string;
  gap?: number;
  childrenGap?: number;
  paddingTop?: number;
  paddingLeft?: number;
  paddingBottom?: number;
  marginBottom?: number;
  minWidth?: number;
}

export function HorizStack(opts: IHorizStackOpts): [IStackStyles, IStackTokens] {
  const StackHorizStyles: IStackStyles = {
    root: [
      {
        backgroundColor: opts.bgColor,
        border: `1px solid ${opts.bordercolor}`,
        minWidth: opts.minWidth ?? 125,
        paddingTop: opts.paddingTop ?? 12,
        paddingLeft: opts.paddingLeft ?? 12,
        paddingBottom: opts.paddingBottom ?? 12,
        marginBottom: opts.marginBottom ?? 12,
        gap: opts.gap ?? 7,
      },
    ],
    inner: {
      overflow: "hidden",
    },
  };

  const stackHorizToken: IStackTokens = {
    childrenGap: opts.childrenGap ? opts.childrenGap : 10,
    padding: 0,
  };

  return [StackHorizStyles, stackHorizToken];
}
