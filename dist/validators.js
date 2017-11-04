Object.defineProperty(exports, "__esModule", { value: true });
const contracts_1 = require("./contracts");
function IsVarNameValid(varName) {
    const startsWithNumberRegex = new RegExp("^[0-9]", "ig");
    return (varName.length > 0 && !startsWithNumberRegex.test(varName));
}
exports.IsVarNameValid = IsVarNameValid;
function IsVarTypeValid(varType) {
    return (varType === contracts_1.VarType.Const || varType === contracts_1.VarType.Let || varType === contracts_1.VarType.Var);
}
exports.IsVarTypeValid = IsVarTypeValid;
