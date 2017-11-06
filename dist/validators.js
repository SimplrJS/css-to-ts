Object.defineProperty(exports, "__esModule", { value: true });
const contracts_1 = require("./contracts");
function IsVarNameValid(varName) {
    const startsWithNumberRegex = new RegExp("^[0-9]", "ig");
    return (varName.length > 0 && !startsWithNumberRegex.test(varName));
}
exports.IsVarNameValid = IsVarNameValid;
function IsVarTypeValid(varType) {
    const values = Object.values(contracts_1.VarType);
    return (values.indexOf(varType) !== -1);
}
exports.IsVarTypeValid = IsVarTypeValid;
