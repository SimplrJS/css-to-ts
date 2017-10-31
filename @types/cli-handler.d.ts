import { Options } from "./contracts";
export declare class CLIHandler {
    private options;
    constructor(options: Options);
    private handleGlob();
    private getFilesArray(pattern);
    private watchCss();
    private onWatchChange;
    private onWatchError;
    private emitWatchMessage();
    private convertFile(filePath);
    private resolveVarName(fileName);
    private constructFileName(fileName, extension?);
    private snakeCaseToCamelCase(fileName);
}
