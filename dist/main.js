var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const chokidar_1 = require("chokidar");
const glob_1 = require("glob");
const css_to_ts_1 = require("./css-to-ts");
class Main {
    constructor(options) {
        this.options = options;
        this.onWatchChange = (changedPath) => {
            console.log(`${changedPath} changed.`);
            this.handleFile(changedPath);
            this.emitWatchMessage();
        };
        this.onWatchError = (error) => {
            console.log(error);
            this.emitWatchMessage();
        };
        this.run();
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.options.cwd = this.options.cwd || process.cwd();
            if (this.options.watch) {
                this.watchCss();
            }
            else {
                this.handleGlob();
            }
        });
    }
    handleGlob() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let filesArray = yield this.getFilesArray(this.options.pattern);
                for (let index in filesArray) {
                    if (index != null) {
                        this.handleFile(filesArray[index]);
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getFilesArray(pattern) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // this.options.cwd resolved in `private async run()`
                let cwd = path.join(this.options.cwd, this.options.rootDir);
                new glob_1.Glob(pattern, { cwd: cwd }, (error, filesArray) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(filesArray);
                });
            });
        });
    }
    watchCss() {
        this.emitWatchMessage();
        // this.options.cwd resolved in `private async run()`
        let cwd = path.join(this.options.cwd, this.options.rootDir);
        let watcher = chokidar_1.watch(this.options.pattern, {
            cwd: cwd
        });
        watcher.on("change", this.onWatchChange);
        watcher.on("error", this.onWatchError);
    }
    emitWatchMessage() {
        console.log(`Watching for ${this.options.pattern}`);
    }
    handleFile(filePath) {
        let filePathData = path.parse(filePath);
        // this.options.cwd resolved in `private async run()`
        let cssDir = path.join(this.options.cwd, this.options.rootDir, filePathData.dir);
        let tsDir = path.join(this.options.cwd, this.options.outDir, filePathData.dir);
        let varName = this.formVarName(filePathData.name);
        let tsFileName = this.formFileName(filePathData.name, ".ts");
        new css_to_ts_1.CssToTs(tsDir, tsFileName, cssDir, filePathData.base, varName, this.options.header);
    }
    formVarName(fileName) {
        let newName = this.formFileName(fileName);
        return this.kebabCaseToCamelCase(newName);
    }
    formFileName(fileName, extension) {
        if ((this.options.prefix || this.options.suffix) && !this.options.delimitter) {
            throw new Error("You MUST define a delimitter when using prefix or suffix. -h for more information.");
        }
        let newName = "";
        if (this.options.prefix) {
            newName += this.options.prefix + this.options.delimitter;
        }
        newName += fileName;
        if (this.options.suffix) {
            newName += this.options.delimitter + this.options.suffix;
        }
        newName += extension || "";
        return newName;
    }
    kebabCaseToCamelCase(fileName) {
        let regex = /(\w*)(\-*)/g;
        return fileName.replace(regex, (match, word, delimitter) => {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        });
    }
}
exports.Main = Main;
