import * as fs from "fs";
import * as path from "path";
import * as mkdirp from "mkdirp";

export type ReadCallback = (err: NodeJS.ErrnoException, data: Buffer) => void;

export class CssToTs {
    constructor(
        private tsDir: string,
        private tsFileName: string,
        private cssDir: string,
        private cssFileName: string,
        private varName: string,
        private header?: string
    ) {
        this.main();
    }

    async main() {
        try {
            const tsPath = path.join(this.tsDir, this.tsFileName);
            const cssPath = path.join(this.cssDir, this.cssFileName);

            console.log(`Reading css from ${tsPath}.`);
            const stringifiedCss = await this.getStringifiedCss(cssPath);
            const tsContent = this.formTs(stringifiedCss, this.varName, this.header);

            const isDirExist = await this.doesDirExist(this.tsDir);

            if (isDirExist === false) {
                await this.makeDirRecursively(this.tsDir);
            }

            await this.emitFile(tsPath, tsContent);
            console.log(`TS file ${this.cssDir} successfully emitted.`);
        } catch (error) {
            console.log(error);
        }
    }

    private async doesDirExist(dirPath: string) {
        return new Promise<boolean>((resolve, reject) => {
            fs.stat(dirPath, (error, stats) => {
                if (error) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    private async makeDirRecursively(dirPath: string) {
        return new Promise<string>((resolve, reject) => {
            mkdirp(dirPath, (error, made) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(made);
                }
            });
        });
    }

    private async emitFile(outPath: string, content: string) {
        return new Promise((resolve, reject) => {
            fs.writeFile(outPath, content, (error) => {
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

        tsContent += `export var ${variableName} = \`${stringifiedCss}\`;\r\n`;

        return tsContent;
    }
}
