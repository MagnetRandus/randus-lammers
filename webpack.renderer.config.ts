import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

import "webpack-dev-server"; // Import to get types for devServer
// import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

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
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    // alias: {
    //   iSurfaces: resolve(__dirname, "src/iSurfaces"),
    // },
  },
  // resolve: {
  //   alias: {
  //     iSurfaces: path.resolve(__dirname, "src/iSurfaces"),
  //   },
  //   plugins: [
  //     new TsconfigPathsPlugin({
  //       extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  //     }),
  //   ],
  // },
  devServer: {
    port: 8080,
    hot: true,
    open: false,
    historyApiFallback: true,
  },
};
