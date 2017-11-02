export interface Options extends CssToTsOptions {
    removeSource?: boolean;
    pattern: string;
    watch?: boolean;
    cwd?: string;
    delimiter?: string;
    exclude?: Array<string>;
}
export interface CssToTsOptions {
    rootDir: string;
    outDir: string;
    suffix?: string;
    prefix?: string;
    header?: string;
    varName?: string | boolean;
}
