export declare class CssToTsConverter {
    private tsDir;
    private tsFileName;
    private cssDir;
    private cssFileName;
    private varName;
    private header;
    private removeSource;
    private varType;
    constructor(tsDir: string, tsFileName: string, cssDir: string, cssFileName: string, varName: string, header?: string | undefined, removeSource?: boolean | undefined, varType?: "var" | "let" | "const" | undefined);
    Convert(): Promise<void>;
}
