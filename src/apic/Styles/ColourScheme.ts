// Define an interface for the color scheme

// function rgbaToHex(r: number, g: number, b: number, a: number) {
//   const toHex = (n: number) => {
//     const hex = n.toString(16);
//     return hex.length === 1 ? "0" + hex : hex;
//   };

//   const alpha = Math.round(a * 255);
//   const hexString = `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
//   console.log(`Update the color to hex: \n${hexString}\n----------`);
//   return hexString;
// }

interface ColorScheme {
  almondCreamLight: string;
  almondCream: string;
  peachBeige: string;
  walnutBrown: string;
  desertTan: string;
  coralOrange: string;
  sageGreen: string;
  whiteAlpha: string;
}

// Create an object that follows the ColorScheme interface
const colorScheme: ColorScheme = {
  almondCreamLight: "#f7f8ec",
  almondCream: "#f2f4dc", // Background
  peachBeige: "#f2ca99", // Secondary Background or Highlight
  walnutBrown: "#73553c", // Text, Borders, or Accent
  desertTan: "#bf9169", // Buttons or Interactive Elements
  coralOrange: "#fd815b", // Primary Buttons, Alerts, or Highlights
  sageGreen: "#9c9c81", // Disabled Background
  whiteAlpha: `#ffffff1a`,
};

export default colorScheme;
