import { BaseButton, IIconProps } from "@fluentui/react";
import * as React from "react";
import ActionName from "Types/ActionName";
import { EditingMode, SelectMode } from "Types/SelectMode";

export interface ActionProps {
  Name: ActionName;
  IconProps: IIconProps;
  VisibleWhen: SelectMode[];
  SpecificMode?: EditingMode[];
  HiddenWhen?: SelectMode[];
  CurrentSelectMode: SelectMode;
  CurrentEditMode: EditingMode;
  IsDisabled?: boolean;
  Click?: React.MouseEventHandler<BaseButton> | undefined;
  Title: string;
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
      CurrentSelectMode: CurrentMode,
      IconProps,
      Name,
      VisibleWhen,
      SpecificMode,
      HiddenWhen,
      Click,
      IsDisabled,
      CurrentEditMode,
      Title,
    } = this.props;

    const hidden =
      VisibleWhen.indexOf(CurrentMode) === -1 ||
      SpecificMode?.indexOf(CurrentEditMode) === -1;

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
        title={Title}
      >
        {Name}
      </BaseButton>
    );
  }
}
