import { Options } from "./contracts";
export declare class Main {
    private options;
    constructor(options: Options);
    private run();
    private handleGlob();
    private getFilesArray(pattern);
    private watchCss();
    private onWatchChange;
    private onWatchError;
    private emitWatchMessage();
    private handleFile(filePath);
    private formVarName(fileName);
    private formFileName(fileName, extension?);
    private kebabCaseToCamelCase(fileName);
}
