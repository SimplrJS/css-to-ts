import { EOL } from "os";
import { VarType } from "./contracts";

export function ConvertCssToTs(
    stringifiedCss: string,
    variableName: string,
    headerComment?: string,
    varType: VarType = VarType.Const
): string {
    const newLineSplitterLength = EOL.length;
    const newLineLastAppearance = stringifiedCss.lastIndexOf(EOL);
    const endsWithNewLine = (newLineLastAppearance + newLineSplitterLength) === stringifiedCss.length;
    const cssContent = endsWithNewLine ? stringifiedCss.slice(0, newLineLastAppearance) : stringifiedCss;

    let content = "";

    if (headerComment) {
        content += `// ${headerComment}${EOL}`;
    }

    content += `export ${varType} ${variableName}: string = \`${cssContent}\`;${EOL}`;

    return content;
}
