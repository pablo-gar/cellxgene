import path from "path";
import historyApiFallback from "connect-history-api-fallback";
import chalk from "chalk";
import express from "express";
import favicon from "serve-favicon";
import webpack from "webpack";
import devMiddleware from "webpack-dev-middleware";
import config from "../configuration/webpack/webpack.config.dev";
import utils from "./utils";

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
