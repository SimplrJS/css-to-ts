Object.defineProperty(exports, "__esModule", { value: true });
function IsVarNameValid(varName) {
    const startsWithNumberRegex = new RegExp("^[0-9]", "ig");
    return (varName.length > 0 && !startsWithNumberRegex.test(varName));
}
exports.IsVarNameValid = IsVarNameValid;
function IsVarTypeValid(varType) {
    return (varType === "const" || varType === "let" || varType === "var");
}
exports.IsVarTypeValid = IsVarTypeValid;
