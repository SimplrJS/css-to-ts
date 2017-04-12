import { Options } from "./contracts";

export const CLI_ERROR_PREFIX = "CssToTs";
export const DEFAULT_IGNORED_GLOB = "node_modules/**/*.css";

export function EmitError(message: string) {
    console.log(`${CLI_ERROR_PREFIX}: ${message}`);
}

export var CLIDefaults: Options = {
    pattern: "**/*.css",
    rootDir: "./",
    outDir: "./",
    delimitter: "-"
};

export function IsNodeError(error: any): error is NodeJS.ErrnoException {
    return (error != null && error.errno != null);
}
