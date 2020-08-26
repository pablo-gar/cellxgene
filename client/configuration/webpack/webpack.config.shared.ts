// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require("path");
const fs = require("fs");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'MiniCssExt... Remove this comment to see the full error message
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ObsoleteWebpackPlugin = require("obsolete-webpack-plugin");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ScriptExtH... Remove this comment to see the full error message
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const src = path.resolve("src");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'nodeModule... Remove this comment to see the full error message
const nodeModules = path.resolve("node_modules");

const publicPath = "";

const rawObsoleteHTMLTemplate = fs.readFileSync(
  `${__dirname}/obsoleteHTMLTemplate.html`,
  "utf8"
);

const obsoleteHTMLTemplate = rawObsoleteHTMLTemplate.replace(/'/g, '"');

module.exports = {
  entry: [
    "core-js",
    "regenerator-runtime/runtime",
    "fastestsmallesttextencoderdecoder",
    "whatwg-fetch",
    "abort-controller/polyfill",
    "./src/index",
  ],
  output: {
    path: path.resolve("build"),
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: src,
        exclude: [path.resolve(src, "index.css")],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /index\.css$/,
        include: [path.resolve(src, "index.css")],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.json$/,
        include: [src, nodeModules],
        loader: "json-loader",
        exclude: /manifest.json$/,
      },
    ],
  },
  plugins: [
    new ObsoleteWebpackPlugin({
      name: "obsolete",
      template: obsoleteHTMLTemplate,
      promptOnNonTargetBrowser: false,
    }),
    new ScriptExtHtmlWebpackPlugin({
      async: "obsolete",
    }),
  ],
};
