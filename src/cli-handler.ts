import { Glob } from "glob";
import * as path from "path";
import { watch } from "chokidar";
import { Options } from "./contracts";
import { CssToTsConverter } from "./css-to-ts-converter";
import {
    EmitError,
    CLIDefaults,
    IsNodeError
} from "./helpers";

export class CLIHandler {
    constructor(private options: Options) {
        this.options.cwd = this.options.cwd || process.cwd();
        this.options.rootDir = this.options.rootDir || CLIDefaults.rootDir;
        this.options.outDir = this.options.outDir || CLIDefaults.outDir;
        this.options.pattern = this.options.pattern || CLIDefaults.pattern;
        this.options.delimiter = this.options.delimiter || CLIDefaults.delimiter;
        this.options.exclude = this.options.exclude || CLIDefaults.exclude;

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
            EmitError(error);
        }
    }

    private async getFilesArray(pattern: string) {
        return new Promise<Array<string>>((resolve, reject) => {

            // this.options.cwd resolved in `private async run()`
            let cwd = path.join(this.options.cwd!, this.options.rootDir);
            new Glob(pattern,
                {
                    ignore: this.options.exclude,
                    cwd: cwd
                },
                (error, filesArray) => {
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
            ignored: this.options.exclude,
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
        const filePathData = path.parse(filePath);

        // this.options.cwd resolved in `private async run()`
        const cssDir = path.join(this.options.cwd!, this.options.rootDir, filePathData.dir);
        const tsDir = path.join(this.options.cwd!, this.options.outDir, filePathData.dir);

        const varName = this.resolveVarName(filePathData.name);
        const tsFileName = this.constructFileName(filePathData.name, ".ts");

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
            if (!IsNodeError(error)) {
                EmitError(error);
                return;
            }

            switch (error.errno) {
                case -4058: {
                    EmitError("File or directory not found. Please check rootDir or pattern. " +
                        `Message: ${error.message}`);
                    break;
                }
                case -4075: {
                    EmitError("Cannot create directory that already exists. " +
                        `Please Check TSDir and outDir. Message: ${error.message}`);
                    break;
                }
                default: EmitError(error.message);
            }
        }
    }

    private resolveVarName(fileName: string) {
        if (this.options.varName && typeof this.options.varName === "string") {
            return this.options.varName;
        }

        const newFileName = this.constructFileName(fileName);
        const variableName = this.snakeCaseToCamelCase(newFileName);

        if (variableName.length === 0) {
            throw new Error(`Cannot construct TypeScript variable name from file name "${fileName}".` +
                "If you cannot change variable name, please use --varName argument to define a valid TypeScript variable name.");
        }

        return variableName;
    }

    private constructFileName(fileName: string, extension?: string) {
        if ((this.options.prefix || this.options.suffix) && !this.options.delimiter) {
            throw new Error("You MUST define a delimiter when using prefix or suffix. -h for more information.");
        }

        let newName = "";

        if (this.options.prefix) {
            newName += this.options.prefix + this.options.delimiter;
        }

        newName += fileName;

        if (this.options.suffix) {
            newName += this.options.delimiter + this.options.suffix;
        }

        newName += extension || "";
        return newName;
    }

    private snakeCaseToCamelCase(fileName: string) {
        const regex = /(\w*)(\-*)/g;
        const camelCasedFileName = fileName.replace(regex, (match: string, word: string, delimiter: string) => {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        });

        return camelCasedFileName.replace(/[^0-9a-z]/gi, "");
    }
}
