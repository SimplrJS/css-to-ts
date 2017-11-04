var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const css_to_ts_1 = require("./css-to-ts");
const helpers_1 = require("./helpers");
class CssToTsConverter {
    constructor(outputDir, outputFileName, cssDir, cssFileName, varName, header, removeSource, varType) {
        this.outputDir = outputDir;
        this.outputFileName = outputFileName;
        this.cssDir = cssDir;
        this.cssFileName = cssFileName;
        this.varName = varName;
        this.header = header;
        this.removeSource = removeSource;
        this.varType = varType;
    }
    Convert() {
        return __awaiter(this, void 0, void 0, function* () {
            const outputPath = path.join(this.outputDir, this.outputFileName);
            const cssPath = path.join(this.cssDir, this.cssFileName);
            console.log(`Reading css from ${cssPath}.`);
            const stringifiedCss = yield fs.readFile(cssPath, "utf-8");
            const content = css_to_ts_1.ConvertCssToTs(stringifiedCss, this.varName, this.header, this.varType);
            try {
                const dirStats = yield fs.stat(this.outputDir);
                if (!dirStats.isDirectory()) {
                    helpers_1.EmitError(`Output directory ${this.outputDir} is not a directory.`);
                    return;
                }
            }
            catch (error) {
                if (!helpers_1.IsNodeError(error)) {
                    throw error;
                }
                switch (error.errno) {
                    case -4058:
                        yield fs.mkdirp(this.outputDir);
                        break;
                    default: {
                        throw error;
                    }
                }
            }
            yield fs.writeFile(outputPath, content);
            if (this.removeSource === true) {
                yield fs.unlink(cssPath);
            }
            console.log(`Output file ${outputPath} successfully emitted.`);
        });
    }
}
exports.CssToTsConverter = CssToTsConverter;
