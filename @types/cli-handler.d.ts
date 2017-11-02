import { Options } from "./contracts";
export declare class CLIHandler {
    private options;
    constructor(options: Options);
    private handleGlob();
    private watchCss();
    private onWatchChange;
    private onWatchError;
    private emitWatchMessage();
    private convertFile(filePath);
    private resolveVarName(fileName);
    private isVarNameValid(varName);
    private constructFileName(fileName, extension?);
    private snakeCaseToCamelCase(fileName);
}
