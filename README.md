# css-to-ts

Compiles css files to importable TypeScript files.

## Instalation
```sh
$ npm install css-to-ts
```

## Features
- Takes css files and output TypeScript files with exported string containing content of your css file.
- CLI tool for watching and files compilation.
- Works with [node-glob](https://github.com/isaacs/node-glob) pattern.

## Command line

### Usage
```sh
    $ css-to-ts -h
```

### Arguments
| Argument                      | Type      | Default           | Description                                                                   |
|-------------------------------|-----------|-------------------|-------------------------------------------------------------------------------|
| -h, --help                    | boolean   | `false`           | Show help.                                                                    |
| -v, --version                 | boolean   | `false`           | Show current version.                                                         |
| --rootDir                     | string    | `./`              | Specifies the root directory of input files.                                  |
| --outDir                      | string    | `./`              | Redirect output structure to the directory.                                   |
| --pattern                     | string    | `**/*.css`        | Files glob pattern.                                                           |
| -w, --watch                   | boolean   | `false`           | Watch for changes of input files.                                             |
| --prefix                      | string    |                   | Prefix added to ouput file name.                                              |
| --suffix                      | string    |                   | Suffix added to output file name.                                             |
| --delimitter                  | string    | `-`               | Specifies delimitter for prefix and suffix. Required if one of these are set. |
| --removeSource                | boolean   | `false`           | Remove all source files specified by glob pattern.                            |
| --header                      | string    |                   | Specifies header comment in generated TS file.                                |
| --cwd                         | string    | `process.cwd()`   | Specifies current working directory.                                          |

## Example

```sh
$  css-to-ts --rootDir "./src" --outDir "./dist" --pattern "*.css" --header "File generated with css-to-ts"
```

Input file `./src/orange.css`:
```css
.orange {
    color: orange;
    border: 1px solid yellow;
}
```

Generated `./dist/orange.ts`:
```ts
// File generated with css-to-ts
export var Orange = `.orange {
    color: orange;
    border: 1px solid yellow;
}`;

```

## API

### `ConvertCssToTs(stringifiedCss: string, variableName: string, headerComment?: string): string`

Takes stringified css and outputs TypeScript code with exported string containing content of your css file.

Usage:
```ts
import { ConvertCssToTs } from "css-to-ts";
```



| Argument          | Type   | Required | Description                                               |
|-------------------|--------|----------|-----------------------------------------------------------|
| `stringifiedCss`  | string | *        | Stringified css to be exported in TypeScript file.        |
| `variableName`    | string | *        | Name of variable to be exported in TypeScript file.       |
| `headerComment`   | string |          | Comment placed in the top of exported TypeScript file.    |

### `new CssToTsConverter(tsDir, tsFileName, cssDir, cssFileName, varName, header, removeSource)`

Compiles css files to importable TypeScript files.

Usage:
```ts
import { CssToTsConverter } from "css-to-ts";

const converter = new CssToTsConverter(
    tsDir,
    tsFileName,
    cssDir,
    cssFileName,
    varName,
    header,
    removeSource
);

try {
    await converter.Convert();
} catch(error) {
    console.error(error);
}
```

| Constructor argument  | Type      | Required  | Description                                                   |
|-----------------------|-----------|-----------|---------------------------------------------------------------|
| `tsDir`               | string    | *         | Directory of TypeScript file.                                 |
| `tsFileName`          | string    | *         | File name of TypeScript file.                                 |
| `cssDir`              | string    | *         | Directory of css file.                                        |
| `cssFileName`         | string    | *         | File name of css file.                                        |
| `varName`             | string    | *         | Name of variable to be exported in TypeScript file.           |
| `header`              | string    |           | Comment placed in the top of exported TypeScript file.        |
| `removeSource`        | boolean   |           | Should css file be deleted after TypeScript file emmitted.    |



## License
Released under the [MIT license](LICENSE).
