import { VarType } from "./contracts";

export function IsVarNameValid(varName: string): boolean {
    const startsWithNumberRegex = new RegExp("^[0-9]", "ig");
    return (varName.length > 0 && !startsWithNumberRegex.test(varName));
}

export function IsVarTypeValid(varType: string): varType is VarType {
    return (varType === VarType.Const || varType === VarType.Let || varType === VarType.Var);
}
