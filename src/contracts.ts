export interface Options extends CSSToTsOptions {
    removeSource?: boolean;
    pattern?: string;
    watch?: boolean;
}

export interface CSSToTsOptions {
    rootDir: string;
    outDir: string;
    suffix?: string;
    prefix?: string;
    header?: string;
}
