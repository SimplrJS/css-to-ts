export declare class CssToTsConverter {
    private tsDir;
    private tsFileName;
    private cssDir;
    private cssFileName;
    private varName;
    private header;
    private removeSource;
    constructor(tsDir: string, tsFileName: string, cssDir: string, cssFileName: string, varName: string, header?: string, removeSource?: boolean);
    Convert(): Promise<void>;
    private makeDirRecursively(dirPath);
}
