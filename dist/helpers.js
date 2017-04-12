Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI_ERROR_PREFIX = "CssToTs";
exports.DEFAULT_IGNORED_GLOB = "node_modules/**/*.css";
function EmitError(message) {
    console.log(`${exports.CLI_ERROR_PREFIX}: ${message}`);
}
exports.EmitError = EmitError;
exports.CLIDefaults = {
    pattern: "**/*.css",
    rootDir: "./",
    outDir: "./",
    delimitter: "-"
};
function IsNodeError(error) {
    return (error != null && error.errno != null);
}
exports.IsNodeError = IsNodeError;
