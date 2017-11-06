import { EOL } from "os";
import { VarType } from "./contracts";

export function ConvertCssToTs(
    stringifiedCss: string,
    variableName: string,
    headerComment?: string,
    varType: VarType = VarType.Const
): string {
    let content = "";

    if (headerComment) {
        content += `// ${headerComment}${EOL}`;
    }

    content += `export ${varType} ${variableName} = \`${stringifiedCss}\`;${EOL}`;

    return content;
}
