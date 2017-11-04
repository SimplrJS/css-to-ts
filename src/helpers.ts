import { CLIOptions } from "./contracts";

export const CLI_ERROR_PREFIX = "CssToTs";

export function EmitError(message: string): void {
    console.log(`${CLI_ERROR_PREFIX}: ${message}`);
}

export const CLIDefaults: CLIOptions = {
    pattern: "**/*.css",
    rootDir: "./",
    outDir: "./",
    delimiter: "-",
    exclude: ["**/node_modules/**"],
    outExt: "ts"
};

export function IsNodeError(error: any): error is NodeJS.ErrnoException {
    return (error != null && error.errno != null);
}

export function SnakeCaseToCamelCase(fileName: string): string {
    const regex = /(\w*)(\-*)/g;
    const camelCasedFileName = fileName.replace(
        regex,
        (match: string, word: string, delimiter: string) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
    );

    return camelCasedFileName.replace(/[^0-9a-z]/gi, "");
}
