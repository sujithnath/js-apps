const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../public")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css"
    }),
    new HtmlCriticalWebpackPlugin({
      base: path.resolve(__dirname, "public"),
      src: "index.html",
      dest: "index.html",
      inline: true,
      minify: true,
      extract: true,
      penthouse: {
        blockJSRequests: false
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      }
    ]
  }
});
