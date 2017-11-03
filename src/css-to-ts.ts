import { EOL } from "os";
import { VarType } from "./contracts";

export function ConvertCssToTs(
    stringifiedCss: string,
    variableName: string,
    headerComment?: string,
    varType: VarType = VarType.Var
): string {
    let tsContent = "";

    if (headerComment) {
        tsContent += `// ${headerComment}${EOL}`;
    }

    tsContent += `export ${varType} ${variableName} = \`${stringifiedCss}\`;${EOL}`;

    return tsContent;
}
