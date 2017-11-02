/// <reference types="node" />
import { Options } from "./contracts";
export declare const CLI_ERROR_PREFIX = "CssToTs";
export declare function EmitError(message: string): void;
export declare const CLIDefaults: Options;
export declare function IsNodeError(error: any): error is NodeJS.ErrnoException;
