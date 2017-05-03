## Mobify Copyright Headers

This tool reads from the `headers/copyright.extension.txt` text files to select what header to insert, where `extension` is the target file extension

## Quick Start

- Clone this repo
- `cd` into the `copyright` directory, and run `node copyright.js GLOB` where `GLOB` is any standard glob pattern

## Example

If this repo was cloned in the same directory as `progressive-web-sdk`

```bash
node copyright.js ../../progressive-web-sdk/bin/**/*.js
```

This command would add the copyright header from `headers/copyright.js.txt` to all `.js` files in the  `progressive-web-sdk/bin` directory

## Lint Mode

Passing the `--lint` flag to this tool will enable lint mode.

With lint mode enabled, the process will exit if any of the target directories contain files which do not have copyright headers.

### Developing

`node --inspect --debug-brk copyright.js ../../progressive-web-sdk/bin/**/*.js`
