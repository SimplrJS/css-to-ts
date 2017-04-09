import * as fs from "fs";

export type ReadCallback = (err: NodeJS.ErrnoException, data: Buffer) => void;

export class CssToTs {
    constructor(
        private rootPath: string,
        private outPath: string,
        private varName: string,
        private header?: string
    ) {
        this.main();
    }

    async main() {
        try {
            console.log(`Reading css from ${this.rootPath}.`);
            let stringifiedCss = await this.getStringifiedCss(this.rootPath);

            let tsContent = this.formTs(stringifiedCss, this.varName, this.header);

            await this.emitFile(this.outPath, tsContent);
            console.log(`TS file ${this.outPath} successfully emitted.`);
        } catch (error) {
            console.log(error);
        }
    }

    private async emitFile(outDir: string, content: string) {
        return new Promise((resolve, reject) => {
            fs.writeFile(outDir, content, (error) => {
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
