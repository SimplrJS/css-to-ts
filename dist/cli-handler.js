var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = require("glob");
const path = require("path");
const chokidar_1 = require("chokidar");
const css_to_ts_converter_1 = require("./css-to-ts-converter");
const helpers_1 = require("./helpers");
class CLIHandler {
    constructor(options) {
        this.options = options;
        this.onWatchChange = (changedPath) => __awaiter(this, void 0, void 0, function* () {
            console.log(`${changedPath} changed.`);
            yield this.convertFile(changedPath);
            this.emitWatchMessage();
        });
        this.onWatchError = (error) => {
            console.log(error);
            this.emitWatchMessage();
        };
        this.options.cwd = this.options.cwd || process.cwd();
        this.options.rootDir = this.options.rootDir || helpers_1.CLIDefaults.rootDir;
        this.options.outDir = this.options.outDir || helpers_1.CLIDefaults.outDir;
        this.options.pattern = this.options.pattern || helpers_1.CLIDefaults.pattern;
        if (this.options.watch) {
            this.watchCss();
        }
        else {
            this.handleGlob();
        }
    }
    handleGlob() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let filesArray = yield this.getFilesArray(this.options.pattern);
                for (let i = 0; i < filesArray.length; i++) {
                    yield this.convertFile(filesArray[i]);
                }
            }
            catch (error) {
                helpers_1.EmitError(error);
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
    convertFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let filePathData = path.parse(filePath);
            // this.options.cwd resolved in `private async run()`
            let cssDir = path.join(this.options.cwd, this.options.rootDir, filePathData.dir);
            let tsDir = path.join(this.options.cwd, this.options.outDir, filePathData.dir);
            let varName = this.constructVarName(filePathData.name);
            let tsFileName = this.constructFileName(filePathData.name, ".ts");
            const converter = new css_to_ts_converter_1.CssToTsConverter(tsDir, tsFileName, cssDir, filePathData.base, varName, this.options.header, this.options.removeSource);
            try {
                yield converter.Convert();
            }
            catch (error) {
                if (!helpers_1.IsNodeError(error)) {
                    helpers_1.EmitError(error);
                    return;
                }
                switch (error.errno) {
                    case -4058: {
                        helpers_1.EmitError("File or directory not found. Please check rootDir or pattern. " +
                            `Message: ${error.message}`);
                        break;
                    }
                    case -4075: {
                        helpers_1.EmitError("Cannot create directory that already exists. " +
                            `Please Check TSDir and outDir. Message: ${error.message}`);
                        break;
                    }
                    default: helpers_1.EmitError(error.message);
                }
            }
        });
    }
    constructVarName(fileName) {
        let newName = this.constructFileName(fileName);
        return this.snakeCaseToCamelCase(newName);
    }
    constructFileName(fileName, extension) {
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
    snakeCaseToCamelCase(fileName) {
        let regex = /(\w*)(\-*)/g;
        return fileName.replace(regex, (match, word, delimitter) => {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        });
    }
}
exports.CLIHandler = CLIHandler;
