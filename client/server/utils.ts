import chalk from "chalk";

var friendlySyntaxErrorLabel = "Syntax error:";

function isLikelyASyntaxError(message: any) {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

function formatMessage(message: any) {
  return message
    .replace("Module build failed: SyntaxError:", friendlySyntaxErrorLabel)
    .replace(
      /Module not found: Error: Cannot resolve 'file' or 'directory'/,
      "Module not found:"
    )
    .replace(/^\s*at\s.*:\d+:\d+[\s\)]*\n/gm, "")
    .replace("./~/css-loader!./~/postcss-loader!", "");
}
var clearConsole = () => {
  process.stdout.write("\x1bc");
};

var formatStats = (stats: any, port: any) => {
  clearConsole();
  var hasErrors = stats.hasErrors();
  var hasWarnings = stats.hasWarnings();
  if (!hasErrors && !hasWarnings) {
    console.log(chalk.green("Compiled successfully!"));
    console.log();
    console.log("The app is running at http://localhost:" + port + "/");
    console.log();
    return;
  }

  var json = stats.toJson();
  var formattedErrors = json.errors.map(
    (message: any) => "Error in " + formatMessage(message)
  );
  var formattedWarnings = json.warnings.map(
    (message: any) => "Warning in " + formatMessage(message)
  );

  if (hasErrors) {
    console.log(chalk.red("Failed to compile."));
    console.log();
    if (formattedErrors.some(isLikelyASyntaxError)) {
      formattedErrors = formattedErrors.filter(isLikelyASyntaxError);
    }
    formattedErrors.forEach((message: any) => {
      console.log(message);
      console.log();
    });
    return;
  }

  if (hasWarnings) {
    console.log(chalk.yellow("Compiled with warnings."));
    console.log();
    formattedWarnings.forEach((message: any) => {
      console.log(message);
      console.log();
    });

    console.log("You may use special comments to disable some warnings.");
    console.log(
      "Use " +
        chalk.yellow("// eslint-disable-next-line") +
        " to ignore the next line."
    );
    console.log(
      "Use " +
        chalk.yellow("/* eslint-disable */") +
        " to ignore all warnings in a file."
    );
  }
};

export default { formatStats: formatStats, clearConsole: clearConsole };
