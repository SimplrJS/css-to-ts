export interface CLIOptions extends CssToTsOptions {
    removeSource?: boolean;
    pattern: string;
    watch?: boolean;
    cwd?: string;
    delimiter?: string;
    exclude?: string[];
    outExt?: string;
}
export interface CssToTsOptions {
    rootDir: string;
    outDir: string;
    suffix?: string;
    prefix?: string;
    header?: string;
    varName?: string | boolean;
    varType?: string;
}
export interface BasePackage {
    name: string;
    version: string;
    description?: string;
    main: string;
    author?: string;
    license?: string;
}
export declare enum VarType {
    Var = "var",
    Let = "let",
    Const = "const",
}
