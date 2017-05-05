# Mobify Copyright Headers

This tool reads from the `headers/copyright-header.extension` files to select what header to insert, where `extension` is the target file extension

For any new `copyright-header.extension` files, write `Copyright (c) year` instead of writing the numerical year, as the tool will find and replace `year` with the current year.

## Quick Start

Add the following to your `package.json` under `"scripts": { ... }`

```json
    "copyright:lint": "copyright 'glob'",
    "copyright:fix" "copyright 'glob' --fix",
    "copyright:update" "copyright 'glob' --update"
```

**NOTE**: The glob must be wrapped in single quotes to ensure that the globbing is handled by the copyright tool.

Without wrapping the glob pattern in single quotes, your shell will expand the glob, and may not return the same directories across different environments.


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
npm run copyright:fix
```

This will add copyright headers to _all_ `.js` files in the `src` directory in the root of your project.

## Options

Without any flags, the tool is run in lint mode, which will exit the process if any of the target files do not contain the header.

### Fix Mode

Passing the `--fix` flag to this tool will enable fix mode.

With fix mode enabled, the copyright headers will be added to each file that matches the glob and does not contain the headers.

### Update Mode

Passing the `--update` flag to this tool will enable update mode.

With update mode enabled, the copyright headers will be updated to the current year in each file that matches the glob and already contains headers.

### Developing

`node --inspect --debug-brk copyright.js '../../some-project/source-folder/**/*.js'`
