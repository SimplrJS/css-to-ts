import * as path from "path";
import { Glob } from "glob";
import { Options } from "./contracts";
import { CssToTs } from "./css-to-ts";

export class Main {
    constructor(private options: Options) {
        this.run();
    }

    private async run() {
        if (this.options.watch) {
            
        } else {
            await this.handleFiles();
        }
    }

    private async handleFiles() {
        if (this.options.pattern) {
            try {
                let filesArray = await this.getFilesArray(this.options.pattern);
                for (let index in filesArray) {
                    if (index != null) {

                        let file = filesArray[index];
                        let pathData = path.parse(file);
                        let varName = this.formVarName(pathData.name, this.options.prefix, this.options.suffix);
                        let fileName = this.formFileName(pathData.name, this.options.prefix, this.options.suffix, ".ts");

                        let rootDir = (this.options.rootDir) ? this.options.rootDir + "/" : "";
                        let dir = (pathData.dir) ? pathData.dir + "/" : "";
                        let outDir = rootDir + dir + fileName;

                        new CssToTs(rootDir + filesArray[index], outDir, varName, this.options.header);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            let pathData = path.parse(this.options.rootDir);
            let varName = this.formVarName(pathData.name, this.options.prefix, this.options.suffix);
            new CssToTs(this.options.rootDir, this.options.outDir, varName, this.options.header);
        }
    }

    private formVarName(fileName: string, prefix?: string, suffix?: string) {
        let newName = this.formFileName(fileName, prefix, suffix);
        return this.kebabCaseToCamelCase(newName);
    }

    private formFileName(fileName: string, prefix?: string, suffix?: string, extension?: string) {
        let newName = "";

        if (prefix) { newName += prefix; }
        newName += fileName;
        if (suffix) { newName += suffix; }
        if (extension) { newName += extension; }

        return newName;
    }

    private kebabCaseToCamelCase(fileName: string) {
        let regex = /(\w*)(\-*)/g;
        return fileName.replace(regex, (match: string, word: string, delimitter: string) => {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        });
    }

    private async getFilesArray(pattern: string) {
        return new Promise<Array<string>>((resolve, reject) => {
            new Glob(pattern, (error, filesArray) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(filesArray);
            });
        });
    }
}
