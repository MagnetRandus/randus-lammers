import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

import * as path from "path";

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  mode: "development",
  entry: "./src/index.ts",
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    alias: {
      Interfaces: path.resolve(__dirname, "src/interfaces/"),
      Server: path.resolve(__dirname, "src/api-server/"),
      Local: path.resolve(__dirname, "src/api-local/"),
      Tools: path.resolve(__dirname, "src/tools"),
    },
  },
  watch: true,
};
