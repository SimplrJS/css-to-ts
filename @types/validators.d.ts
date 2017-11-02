import { VarType } from "./contracts";
export declare function IsVarNameValid(varName: string): boolean;
export declare function IsVarTypeValid(varType: string | boolean | undefined): varType is VarType | undefined;
