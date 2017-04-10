/// <reference types="node" />
export declare type ReadCallback = (err: NodeJS.ErrnoException, data: Buffer) => void;
export declare class CssToTs {
    private tsDir;
    private tsFileName;
    private cssDir;
    private cssFileName;
    private varName;
    private header;
    constructor(tsDir: string, tsFileName: string, cssDir: string, cssFileName: string, varName: string, header?: string);
    main(): Promise<void>;
    private doesDirExist(dirPath);
    private makeDirRecursively(dirPath);
    private emitFile(outPath, content);
    private getStringifiedCss(path);
    private formTs(stringifiedCss, variableName, headerComment?);
}
