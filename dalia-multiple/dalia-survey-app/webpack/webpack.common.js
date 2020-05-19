const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    app: "./src/containers/app/index.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public")
  }
};
