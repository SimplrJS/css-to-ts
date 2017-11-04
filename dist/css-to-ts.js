Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const contracts_1 = require("./contracts");
function ConvertCssToTs(stringifiedCss, variableName, headerComment, varType = contracts_1.VarType.Const) {
    let content = "";
    if (headerComment) {
        content += `// ${headerComment}${os_1.EOL}`;
    }
    content += `export ${varType} ${variableName} = \`${stringifiedCss}\`;${os_1.EOL}`;
    return content;
}
exports.ConvertCssToTs = ConvertCssToTs;
