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

## Fix Mode

Passing the `--fix` flag to this tool will enable fix mode.

With fix mode enabled, the copyright headers will be added to each file that matches the glob and does not contain the headers.

Without this flag, the tool is run in lint mode, which will exit the process if any of the target files do not contain the header.

### Developing

`node --inspect --debug-brk copyright.js '../../some-project/source-folder/**/*.js'`
