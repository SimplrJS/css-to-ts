/// <reference types="node" />
import { Options } from "./contracts";
export declare const CLI_ERROR_PREFIX = "CssToTs";
export declare const DEFAULT_IGNORED_GLOB = "node_modules/**/*.css";
export declare function EmitError(message: string): void;
export declare var CLIDefaults: Options;
export declare function IsNodeError(error: any): error is NodeJS.ErrnoException;
