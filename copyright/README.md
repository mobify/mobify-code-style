## Mobify Copyright Headers

This tool reads from the `headers/copyright.extension.txt` text files to select what header to insert, where `extension` is the target language

## Quick Start

- Clone this repo
- `cd` into the `copyright` directory, and run `node copyright.js GLOB` where `GLOB` is any standard glob pattern
- For example, if you cloned this repo in the same directory as the `progressive-web-sdk`, and needed to add copyright headers to all `.js` files in `progressive-web-sdk/bin`, you would write:

```bash
node copyright.js ../../progressive-web-sdk/bin/**/*.js
```

## Lint Mode

Passing the `--lint` flag to this tool will enable lint mode.

With lint mode enabled, the process will exit if any of the target directories contain files which do not have copyright headers.


### Developing

`node --inspect --debug-brk copyright.js ../../progressive-web-sdk/bin/**/*.js`
