Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI_ERROR_PREFIX = "CssToTs";
function EmitError(message) {
    console.log(`${exports.CLI_ERROR_PREFIX}: ${message}`);
}
exports.EmitError = EmitError;
exports.CLIDefaults = {
    pattern: "**/*.css",
    rootDir: "./",
    outDir: "./",
    delimiter: "-",
    exclude: ["**/node_modules/**"]
};
function IsNodeError(error) {
    return (error != null && error.errno != null);
}
exports.IsNodeError = IsNodeError;
function SnakeCaseToCamelCase(fileName) {
    const regex = /(\w*)(\-*)/g;
    const camelCasedFileName = fileName.replace(regex, (match, word, delimiter) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());
    return camelCasedFileName.replace(/[^0-9a-z]/gi, "");
}
exports.SnakeCaseToCamelCase = SnakeCaseToCamelCase;
