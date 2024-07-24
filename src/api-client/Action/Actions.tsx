import { BaseButton, IIconProps } from "@fluentui/react";
import * as React from "react";
import ActionName from "Types/ActionName";
import { SelectMode } from "Types/SelectMode";

export interface ActionProps {
  Name: ActionName;
  IconProps: IIconProps;
  VisibleWhen: SelectMode[];
  HiddenWhen?: SelectMode[];
  CurrentMode: SelectMode;
  IsDisabled?: boolean;
  Click?: React.MouseEventHandler<BaseButton> | undefined;
}
export interface ActionState {
  Started: boolean;
}

export class Action extends React.Component<ActionProps, ActionState> {
  constructor(props: ActionProps) {
    super(props);
  }
  render(): React.ReactNode {
    const {
      CurrentMode,
      IconProps,
      Name,
      VisibleWhen,
      HiddenWhen,
      Click,
      IsDisabled,
    } = this.props;

    const hidden = VisibleWhen.indexOf(CurrentMode) === -1;

    if (VisibleWhen.some((j) => HiddenWhen?.includes(j))) {
      throw Error(
        `Element ${Name} can't be hidden and visible at the same time.`
      );
    }

    return (
      <BaseButton
        disabled={IsDisabled || false}
        hidden={hidden}
        iconProps={IconProps}
        onClick={Click}
      >
        {Name}
      </BaseButton>
    );
  }
}
