// Define an interface for the color scheme

// export function rgbaToHex(r: number, g: number, b: number, a: number) {
//   const toHex = (n: number) => {
//     const hex = n.toString(16);
//     return hex.length === 1 ? "0" + hex : hex;
//   };

//   const alpha = Math.round(a * 255);
//   const hexString = `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
//   console.log(`Update the color to hex: \n${hexString}\n----------`);
//   return hexString;
// }

interface IColorScheme {
  almondCreamLight: string;
  almondCream: string;
  lavenderMist: string;
  royalPlum: string;
  peachBeige: string;
  walnutBrown: string;
  desertTan: string;
  coralOrange: string;
  sageGreen: string;
  whiteAlpha: string;
  inherit: "inherit";
}

// Create an object that follows the ColorScheme interface
const ThemeColor: IColorScheme = {
  almondCreamLight: "#f7f8ec",
  almondCream: "#f2f4dc", // Background
  lavenderMist: "#E2DCF5", //Also a background
  royalPlum: "#6D2F75",
  peachBeige: "#f2ca99", // Secondary Background or Highlight
  walnutBrown: "#73553c", // Text, Borders, or Accent
  desertTan: "#bf9169", // Buttons or Interactive Elements
  coralOrange: "#fd815b", // Primary Buttons, Alerts, or Highlights
  sageGreen: "#9c9c81", // Disabled Background
  whiteAlpha: `#ffffff1a`,
  inherit: "inherit",
};

export default ThemeColor;
