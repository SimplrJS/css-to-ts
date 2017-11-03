import { VarType } from "./contracts";

export function IsVarNameValid(varName: string): boolean {
    const startsWithNumberRegex = new RegExp("^[0-9]", "ig");
    return (varName.length > 0 && !startsWithNumberRegex.test(varName));
}

export function IsVarTypeValid(varType: string): varType is VarType {
    return (varType === "const" || varType === "let" || varType === "var");
}
