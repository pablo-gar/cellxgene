// @ts-expect-error ts-migrate(6200) FIXME: Definitions of the following identifiers conflict ... Remove this comment to see the full error message
const path = require("path");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'webpack'.
const webpack = require("webpack");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'HtmlWebpac... Remove this comment to see the full error message
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ScriptExtH... Remove this comment to see the full error message
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'MiniCssExt... Remove this comment to see the full error message
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { merge } = require("webpack-merge");

const sharedConfig = require("./webpack.config.shared");
const babelOptions = require("../babel/babel.dev");

const fonts = path.resolve("src/fonts");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'nodeModule... Remove this comment to see the full error message
const nodeModules = path.resolve("node_modules");

const devConfig = {
  mode: "development",
  devtool: "eval",
  output: {
    pathinfo: true,
    filename: "static/js/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: babelOptions,
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2|otf)$/i,
        loader: "file-loader",
        include: [nodeModules, fonts],
        query: {
          name: "static/assets/[name].[ext]",
          // (thuang): This is needed to make sure @font url path is '/static/assets/'
          publicPath: "/",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve("index.html"),
    }),
    new FaviconsWebpackPlugin({
      logo: "./favicon.png",
      prefix: "static/img/",
      favicons: {
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: "static/[name].css",
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      __REACT_DEVTOOLS_GLOBAL_HOOK__: "({ isDisabled: true })",
    }),
    new webpack.DefinePlugin({
      "process.env.CXG_SERVER_PORT": JSON.stringify(
        process.env.CXG_SERVER_PORT
      ),
    }),
    new ScriptExtHtmlWebpackPlugin({
      async: "obsolete",
    }),
  ],
};

module.exports = merge(sharedConfig, devConfig);
