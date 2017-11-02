import { Options } from "./contracts";

export const CLI_ERROR_PREFIX = "CssToTs";

export function EmitError(message: string): void {
    console.log(`${CLI_ERROR_PREFIX}: ${message}`);
}

export const CLIDefaults: Options = {
    pattern: "**/*.css",
    rootDir: "./",
    outDir: "./",
    delimiter: "-",
    exclude: ["**/node_modules/**"]
};

export function IsNodeError(error: any): error is NodeJS.ErrnoException {
    return (error != null && error.errno != null);
}
