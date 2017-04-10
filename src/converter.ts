import { fs } from "mz";
import * as path from "path";
import * as mkdirp from "mkdirp";
import { CssToTs } from "./css-to-ts";

export type ReadCallback = (err: NodeJS.ErrnoException, data: Buffer) => void;

export class Converter {
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

            console.log(`Reading css from ${cssPath}.`);
            const stringifiedCss = await fs.readFile(cssPath, "utf-8");
            const tsContent = CssToTs(stringifiedCss, this.varName, this.header);

            const dirExists = await fs.stat(this.tsDir);

            if (dirExists.isDirectory()) {
                await this.makeDirRecursively(this.tsDir);
            } else {
                // TODO: specify error
                throw new Error(`${this.tsDir} is not a directory.`);
            }

            await fs.writeFile(tsPath, tsContent);
            console.log(`TS file ${tsPath} successfully emitted.`);
        } catch (error) {
            console.log(error);
        }
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
}
