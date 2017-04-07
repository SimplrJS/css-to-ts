import * as yargs from "yargs";

function GetVersion() {
    let packageJson = require("../package.json");
    return packageJson.version || "";
}

export var Arguments = yargs
    .help("h", "Show help")
    .alias("h", "help")
    .version(() => {
        return `CurrentVersion: ${GetVersion()}`;
    })
    .alias("v", "version")
    .option("r", {
        alias: "rootDir",
        describe: "Specifies the root directory of input file / files",
        type: "string"
    })
    .require("rootDir", "rootDir is required")
    .option("o", {
        alias: "outDir",
        describe: "Redirect output or structure to the file or directory."
    })
    .require("outDir", "outDir is required")
    .option("p", {
        alias: "pattern",
        describe: "Files glob pattern",
        type: "string"
    })
    .option("w", {
        alias: "watch",
        describe: "Watch file or files structure.",
        type: "boolean"
    })
    .option("prefix", {
        describe: "Specifies prefix of an output file.",
        type: "string"
    })
    .option("suffix", {
        describe: "Specifies suffix of an output file.",
        type: "string"
    })
    .option("removeSource", {
        describe: "Specifies should the source CSS file should be removed"
    })
    .option("header", {
        describe: "Specifies header comment in generated TS file",
        type: "string"
    })
    .argv;