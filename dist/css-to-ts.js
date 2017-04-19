Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
function ConvertCssToTs(stringifiedCss, variableName, headerComment) {
    let tsContent = "";
    if (headerComment) {
        tsContent += `// ${headerComment}${os_1.EOL}`;
    }
    tsContent += `export var ${variableName} = \`${stringifiedCss}\`;${os_1.EOL}`;
    return tsContent;
}
exports.ConvertCssToTs = ConvertCssToTs;
