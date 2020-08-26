// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require("path");
const historyApiFallback = require("connect-history-api-fallback");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'chalk'.
const chalk = require("chalk");
const express = require("express");
const favicon = require("serve-favicon");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'webpack'.
const webpack = require("webpack");
const devMiddleware = require("webpack-dev-middleware");
const config = require("../configuration/webpack/webpack.config.dev");
const utils = require("./utils");

process.env.NODE_ENV = "development";

const CLIENT_PORT = process.env.CXG_CLIENT_PORT;

// Set up compiler
const compiler = webpack(config);

compiler.plugin("invalid", () => {
  utils.clearConsole();
  console.log("Compiling...");
});

compiler.plugin("done", (stats: any) => {
  utils.formatStats(stats, CLIENT_PORT);
});

// Launch server
const app = express();

app.use(historyApiFallback({ verbose: false }));

app.use(
  devMiddleware(compiler, {
    logLevel: "warn",
    publicPath: config.output.publicPath,
  })
);

app.use(favicon("./favicon.png"));

app.get("*", (req: any, res: any) => {
  res.sendFile(path.resolve("index.html"));
});

app.listen(CLIENT_PORT, (err: any) => {
  if (err) {
    console.log(err);
    return;
  }

  utils.clearConsole();
  console.log(chalk.cyan("Starting the development server..."));
  console.log();
});
