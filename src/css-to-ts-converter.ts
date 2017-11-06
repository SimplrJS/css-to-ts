import * as fs from "fs-extra";
import * as path from "path";
import { ConvertCssToTs } from "./css-to-ts";
import { EmitError, IsNodeError } from "./helpers";
import { VarType } from "./contracts";

export class CssToTsConverter {
    constructor(
        private outputDir: string,
        private outputFileName: string,
        private cssDir: string,
        private cssFileName: string,
        private varName: string,
        private header?: string,
        private removeSource?: boolean,
        private varType?: VarType
    ) { }

    public async Convert(): Promise<void> {
        const outputPath = path.join(this.outputDir, this.outputFileName);
        const cssPath = path.join(this.cssDir, this.cssFileName);

        console.log(`Reading css from ${cssPath}.`);
        const stringifiedCss = await fs.readFile(cssPath, "utf-8");
        const content = ConvertCssToTs(stringifiedCss, this.varName, this.header, this.varType);

        try {
            const dirStats = await fs.stat(this.outputDir);
            if (!dirStats.isDirectory()) {
                EmitError(`Output directory ${this.outputDir} is not a directory.`);
                return;
            }
        } catch (error) {
            if (!IsNodeError(error)) {
                throw error;
            }

            switch (error.errno) {
                case -4058:
                    await fs.mkdirp(this.outputDir);
                    break;
                default: {
                    throw error;
                }
            }
        }

        await fs.writeFile(outputPath, content);

        if (this.removeSource === true) {
            await fs.unlink(cssPath);
        }

        console.log(`Output file ${outputPath} successfully emitted.`);
    }
}
