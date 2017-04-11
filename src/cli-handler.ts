import { Glob } from "glob";
import * as path from "path";
import { watch } from "chokidar";
import { Options } from "./contracts";
import { CssToTsConverter } from "./css-to-ts-converter";
import { EmitError } from "./helpers";

export class CLIHandler {
    constructor(private options: Options) {
        this.options.cwd = this.options.cwd || process.cwd();

        if (!this.options.pattern) {
            EmitError("Pattern cannot be undefined, null or empty string.");
            return;
        }

        if (!this.options.rootDir) {
            EmitError("rootDir cannot be undefined, null or empty string.");
            return;
        }

        if (!this.options.outDir) {
            EmitError("outDir cannot be undefined, null or empty string.");
        }

        if (this.options.watch) {
            this.watchCss();
        } else {
            this.handleGlob();
        }
    }

    private async handleGlob() {
        try {
            let filesArray = await this.getFilesArray(this.options.pattern);
            for (let i = 0; i < filesArray.length; i++) {
                await this.convertFile(filesArray[i]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    private async getFilesArray(pattern: string) {
        return new Promise<Array<string>>((resolve, reject) => {

            // this.options.cwd resolved in `private async run()`
            let cwd = path.join(this.options.cwd!, this.options.rootDir);

            new Glob(pattern, { cwd: cwd }, (error, filesArray) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(filesArray);
            });
        });
    }

    private watchCss() {
        this.emitWatchMessage();

        // this.options.cwd resolved in `private async run()`
        let cwd = path.join(this.options.cwd!, this.options.rootDir);
        let watcher = watch(this.options.pattern, {
            cwd: cwd
        });

        watcher.on("change", this.onWatchChange);
        watcher.on("error", this.onWatchError);
    }

    private onWatchChange = async (changedPath: string) => {
        console.log(`${changedPath} changed.`);
        await this.convertFile(changedPath);
        this.emitWatchMessage();
    }

    private onWatchError = (error: string) => {
        console.log(error);
        this.emitWatchMessage();
    }

    private emitWatchMessage() {
        console.log(`Watching for ${this.options.pattern}`);
    }

    private async convertFile(filePath: string) {
        let filePathData = path.parse(filePath);

        // this.options.cwd resolved in `private async run()`
        let cssDir = path.join(this.options.cwd!, this.options.rootDir, filePathData.dir);
        let tsDir = path.join(this.options.cwd!, this.options.outDir, filePathData.dir);

        let varName = this.constructVarName(filePathData.name);
        let tsFileName = this.constructFileName(filePathData.name, ".ts");

        const converter = new CssToTsConverter(
            tsDir,
            tsFileName,
            cssDir,
            filePathData.base,
            varName,
            this.options.header,
            this.options.removeSource
        );

        try {
            await converter.Convert();
        } catch (error) {
            const exception = error as NodeJS.ErrnoException;

            switch (exception.errno) {
                case -4058: {
                    EmitError("File or directory not found. Please check rootDir or pattern. " +
                        `Message: ${exception.message}`);
                    break;
                }
                case -4075: {
                    EmitError("Cannot create directory that already exists. " +
                        `Please Check TSDir and outDir. Message: ${exception.message}`);
                    break;
                }
                default: EmitError(error);
            }
        }
    }

    private constructVarName(fileName: string) {
        let newName = this.constructFileName(fileName);
        return this.snakeCaseToCamelCase(newName);
    }

    private constructFileName(fileName: string, extension?: string) {
        if ((this.options.prefix || this.options.suffix) && !this.options.delimitter) {
            throw new Error("You MUST define a delimitter when using prefix or suffix. -h for more information.");
        }

        let newName = "";

        if (this.options.prefix) {
            newName += this.options.prefix + this.options.delimitter;
        }

        newName += fileName;

        if (this.options.suffix) {
            newName += this.options.delimitter + this.options.suffix;
        }

        newName += extension || "";
        return newName;
    }

    private snakeCaseToCamelCase(fileName: string) {
        let regex = /(\w*)(\-*)/g;
        return fileName.replace(regex, (match: string, word: string, delimitter: string) => {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        });
    }
}
