/// <reference types="node" />
import { CLIOptions } from "./contracts";
export declare const CLI_ERROR_PREFIX = "CssToTs";
export declare function EmitError(message: string): void;
export declare const CLIDefaults: CLIOptions;
export declare function IsNodeError(error: any): error is NodeJS.ErrnoException;
export declare function SnakeCaseToCamelCase(fileName: string): string;
