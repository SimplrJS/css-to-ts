var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
class CssToTs {
    constructor(tsDir, tsFileName, cssDir, cssFileName, varName, header) {
        this.tsDir = tsDir;
        this.tsFileName = tsFileName;
        this.cssDir = cssDir;
        this.cssFileName = cssFileName;
        this.varName = varName;
        this.header = header;
        this.main();
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tsPath = path.join(this.tsDir, this.tsFileName);
                const cssPath = path.join(this.cssDir, this.cssFileName);
                console.log(`Reading css from ${tsPath}.`);
                const stringifiedCss = yield this.getStringifiedCss(cssPath);
                const tsContent = this.formTs(stringifiedCss, this.varName, this.header);
                const isDirExist = yield this.doesDirExist(this.tsDir);
                if (isDirExist === false) {
                    yield this.makeDirRecursively(this.tsDir);
                }
                yield this.emitFile(tsPath, tsContent);
                console.log(`TS file ${this.cssDir} successfully emitted.`);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    doesDirExist(dirPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.stat(dirPath, (error, stats) => {
                    if (error) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        });
    }
    makeDirRecursively(dirPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                mkdirp(dirPath, (error, made) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(made);
                    }
                });
            });
        });
    }
    emitFile(outPath, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.writeFile(outPath, content, (error) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve();
                });
            });
        });
    }
    getStringifiedCss(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.readFile(path, "utf8", (err, data) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(data);
                });
            });
        });
    }
    formTs(stringifiedCss, variableName, headerComment) {
        let tsContent = "";
        if (headerComment) {
            tsContent += `// ${headerComment} \r\n`;
        }
        tsContent += `export var ${variableName} = \`${stringifiedCss}\`;\r\n`;
        return tsContent;
    }
}
exports.CssToTs = CssToTs;
