import { CLIOptions } from "./contracts";
export declare class CLIHandler {
    private options;
    constructor(options: CLIOptions);
    private handleGlob();
    private watchCss();
    private onWatchChange;
    private onWatchError;
    private emitWatchMessage();
    private convertFile(filePath);
    private resolveVarName(fileName);
    private constructFileName(fileName, extension?);
}
