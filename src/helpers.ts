export const CLI_ERROR_PREFIX = "CssToTs";

export function EmitError(message: string) {
    console.log(`${CLI_ERROR_PREFIX}: ${message}`);
}
