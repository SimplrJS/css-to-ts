import { EOL } from "os";

export function ConvertCssToTs(stringifiedCss: string, variableName: string, headerComment?: string): string {
    let tsContent = "";
    if (headerComment) { tsContent += `// ${headerComment}${EOL}`; }
    tsContent += `export var ${variableName} = \`${stringifiedCss}\`;${EOL}`;

    return tsContent;
}
