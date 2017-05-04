# Mobify Copyright Headers

This tool reads from the `headers/copyright-header.extension` files to select what header to insert, where `extension` is the target file extension

## Quick Start

Add the following to your `package.json` under `"scripts": { ... }`

```json
    "copyright:lint": "copyright 'glob'"
    "copyright:fix" "copyright 'glob' --fix"
```

```bash
npm install mobify-code-style --save
npm run copyright:lint
```

## Example

Add the following to your `package.json` file

```json
"copyright:fix": "copyright './src/**/*.js' --fix",
```

Then run

```bash
npm run copyright:lint
```

This will add copyright headers to _all_ `.js` files in the `src` directory in the root of your project.

## Lint Mode

Passing the `--fix` flag to this tool will disable lint mode.

With lint mode enabled, the process will exit if any of the target directories contain files which do not have copyright headers.

In fix mode, the tool will add the copyright headers to any targetted files.

### Developing

`node --inspect --debug-brk copyright.js '../../some-project/source-folder/**/*.js'`
