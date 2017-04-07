// import * as glob from "glob";
import * as path from "path";
import * as fs from "fs";
import { Options } from "./contracts";

export type ReadCallback = (err: NodeJS.ErrnoException, data: Buffer) => void;

export class CssToTs {
    constructor(options: Options) {
        this.options = options;
        this.main();
    }

    private options: Options;

    private main() {
        this.emitTs();

        if (this.options.watch === true) {

        } else {

        }

        // if (this.options.pattern != null) {
        //     this.handleGlobActions();
        // } else {
        //     this.handleFileActions();
        // }
    }

    // private handleGlobActions() {

    // }

    // private handleFileActions() {

    // }

    async emitTs() {
        try {
            let rootPath = this.options.rootDir;

            console.log(`Reading css from ${rootPath}.`);
            let stringifiedCss = await this.getStringifiedCss(rootPath);

            let pathData = path.parse(rootPath);

            let varName = this.formVarName(pathData.name, this.options.prefix, this.options.suffix);
            console.log(this.options);
            let outputTs = this.formTs(stringifiedCss, varName, this.options.header);

            let fileName = this.formFileName(pathData.name, this.options.prefix, this.options.suffix, ".ts");
            console.log("Emmiting TS");
            await this.emitFile(fileName, this.options.outDir, outputTs);
            console.log(`TS file ${fileName} successfully emitted.`);
        } catch (error) {
            console.log(error);
        }
    }

    private async emitFile(fileName: string, outDir: string, content: string) {
        console.log(content);
        return new Promise((resolve, reject) => {
            fs.writeFile(outDir + fileName, content, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });
    }

    private async getStringifiedCss(path: string) {
        return new Promise<string>((resolve, reject) => {
            fs.readFile(path, "utf8", (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }

    private formTs(stringifiedCss: string, variableName: string, headerComment?: string) {
        let tsContent = "";

        if (headerComment) { tsContent += `// ${headerComment} \r\n`; }

        tsContent += `export var ${variableName} = \`${stringifiedCss}"\`; \r\n`;

        return tsContent;
    }

    private formFileName(fileName: string, prefix?: string, suffix?: string, extension?: string) {
        let newName = "";

        if (prefix) { newName += prefix; }
        newName += fileName;
        if (suffix) { newName += suffix; }
        if (extension) { newName += extension; }

        return newName;
    }

    private formVarName(fileName: string, prefix?: string, suffix?: string) {
        let newName = this.formFileName(fileName, prefix, suffix);
        return this.kebabCaseToCamelCase(newName);
    }

    private kebabCaseToCamelCase(fileName: string) {
        let regex = /(\w*)(\-*)/g;
        return fileName.replace(regex, (match: string, word: string, delimitter: string) => {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        });
    }
}
