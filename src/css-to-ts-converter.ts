import { fs } from "mz";
import * as path from "path";
import * as mkdirp from "mkdirp";
import { ConvertCssToTs } from "./css-to-ts";
import { EmitError } from "./helpers";

export class CssToTsConverter {
    constructor(
        private tsDir: string,
        private tsFileName: string,
        private cssDir: string,
        private cssFileName: string,
        private varName: string,
        private header?: string,
        private removeSource?: boolean
    ) { }

    public async Convert() {
        const tsPath = path.join(this.tsDir, this.tsFileName);
        const cssPath = path.join(this.cssDir, this.cssFileName);

        console.log(`Reading css from ${cssPath}.`);
        const stringifiedCss = await fs.readFile(cssPath, "utf-8");
        const tsContent = ConvertCssToTs(stringifiedCss, this.varName, this.header);

        try {
            const dirStats = await fs.stat(this.tsDir);
            if (!dirStats.isDirectory()) {
                EmitError(`Output directory ${this.tsDir} is not a directory.`);
                return;
            }
        } catch (error) {
            const exception = error as NodeJS.ErrnoException;
            switch (exception.errno) {
                case -4058:
                    await this.makeDirRecursively(this.tsDir);
                    break;
                default: {
                    throw new Error(error);
                }
            }
        }

        await fs.writeFile(tsPath, tsContent);

        if (this.removeSource === true) {
            await fs.unlink(cssPath);
        }

        console.log(`TS file ${tsPath} successfully emitted.`);
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
