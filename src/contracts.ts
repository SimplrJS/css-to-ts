export interface Options extends CssToTsOptions {
    removeSource?: boolean;
    pattern: string;
    watch?: boolean;
    cwd?: string;
    delimiter?: string;
    exclude?: string[];
}

export interface CssToTsOptions {
    rootDir: string;
    outDir: string;
    suffix?: string;
    prefix?: string;
    header?: string;
    varName?: string | boolean;
    varType?: string | boolean;
}

export interface BasePackage {
    name: string;
    version: string;
    description?: string;
    main: string;
    author?: string;
    license?: string;
}

export type VarType = "var" | "let" | "const";
