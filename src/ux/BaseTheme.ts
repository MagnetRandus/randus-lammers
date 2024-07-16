import { createTheme } from "@fluentui/react";
import { IEffects } from "@fluentui/react/lib/Styling";

interface IExtendedEffects extends IEffects {
  strokeWidthThin: string;
}

const BaseTheme = createTheme({
  palette: {
    themePrimary: "#fc645b",
    themeLighterAlt: "#fff9f8",
    themeLighter: "#ffe6e5",
    themeLight: "#fed0cd",
    themeTertiary: "#fda19c",
    themeSecondary: "#fd766e",
    themeDarkAlt: "#e35952",
    themeDark: "#c04b45",
    themeDarker: "#8d3733",
    neutralLighterAlt: "#f0f1e5",
    neutralLighter: "#ecede1",
    neutralLight: "#e2e3d8",
    neutralQuaternaryAlt: "#d3d3c9",
    neutralQuaternary: "#c9cac0",
    neutralTertiaryAlt: "#c1c2b8",
    neutralTertiary: "#d5c4b6",
    neutralSecondary: "#ab907a",
    neutralPrimaryAlt: "#84654c",
    neutralPrimary: "#73553c",
    neutralDark: "#57402d",
    black: "#402f21",
    white: "#f7f8ec",
  },
});

const cEffect = BaseTheme.effects as IExtendedEffects;
cEffect.strokeWidthThin = "#9c9c81";

BaseTheme.effects = {
  ...BaseTheme.effects,
  ...cEffect,
};

export default BaseTheme;
