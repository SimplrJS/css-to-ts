Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const contracts_1 = require("./contracts");
function ConvertCssToTs(stringifiedCss, variableName, headerComment, varType = contracts_1.VarType.Const) {
    const newLineSplitterLength = os_1.EOL.length;
    const newLineLastAppearance = stringifiedCss.lastIndexOf(os_1.EOL);
    const endsWithNewLine = (newLineLastAppearance + newLineSplitterLength) === stringifiedCss.length;
    const cssContent = endsWithNewLine ? stringifiedCss.slice(0, newLineLastAppearance) : stringifiedCss;
    let content = "";
    if (headerComment) {
        content += `// ${headerComment}${os_1.EOL}`;
    }
    content += `export ${varType} ${variableName}: string = \`${cssContent}\`;${os_1.EOL}`;
    return content;
}
exports.ConvertCssToTs = ConvertCssToTs;
