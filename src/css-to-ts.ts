import { EOL } from "os";

export function CssToTs(stringifiedCss: string, variableName: string, headerComment?: string) {
    let tsContent = "";
    if (headerComment) { tsContent += `// ${headerComment}${EOL}`; }
    tsContent += `export var ${variableName} = \`${stringifiedCss}\`;${EOL}`;

    return tsContent;
}
