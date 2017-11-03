Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const contracts_1 = require("./contracts");
function ConvertCssToTs(stringifiedCss, variableName, headerComment, varType = contracts_1.VarType.Var) {
    let tsContent = "";
    if (headerComment) {
        tsContent += `// ${headerComment}${os_1.EOL}`;
    }
    tsContent += `export ${varType} ${variableName} = \`${stringifiedCss}\`;${os_1.EOL}`;
    return tsContent;
}
exports.ConvertCssToTs = ConvertCssToTs;
