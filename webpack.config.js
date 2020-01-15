const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "scripts", "main.ts"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
    library: "panoSlicer"
  },
  devtool: "cheap-eval-source-map",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, "src", "styles", "styles.css"),
        to: path.resolve(__dirname, "dist", "styles")
      }
    ])
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
