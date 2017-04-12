export interface Options extends CSSToTsOptions {
    removeSource?: boolean;
    pattern: string;
    watch?: boolean;
    cwd?: string;
    delimitter?: string;
    ignore?: Array<string>;
}
export interface CSSToTsOptions {
    rootDir: string;
    outDir: string;
    suffix?: string;
    prefix?: string;
    header?: string;
}
