import type { Configuration } from "webpack";
import * as path from "path";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

import "webpack-dev-server"; // Import to get types for devServer

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

export const rendererConfig: Configuration = {
  mode: "development",
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss"],
    alias: {
      Interfaces: path.resolve(__dirname, "src/interfaces/"),
      Types: path.resolve(__dirname, "src/types/"),
      Client: path.resolve(__dirname, "src/api-client/"),
      Ux: path.resolve(__dirname, "src/ux/"),
      Tools: path.resolve(__dirname, "src/tools"),
    },
  },
  devServer: {
    port: 8080,
    hot: true,
    open: false,
    historyApiFallback: true,
  },
};
