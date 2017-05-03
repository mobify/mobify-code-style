## Mobify Copyright Headers

This tool reads from the `headers/copyright.extension.txt` text files to select what header to insert, where `extension` is the target file extension

## Quick Start

- Clone this repo
- `cd` into the `copyright` directory, and run `node copyright.js PATTERN` where `PATTERN` is any standard glob pattern

## Example

If this repo was cloned in the same directory as `some-project`

```bash
node copyright.js ../../some-project/bin/**/*.js
```

This command would add the copyright header from `headers/copyright.js.txt` to all `.js` files in the  `some-project/bin` directory

## Lint Mode

Passing the `--lint` flag to this tool will enable lint mode.

With lint mode enabled, the process will exit if any of the target directories contain files which do not have copyright headers.

`copyright.js` can be integrated into the `npm run lint` step of a project by pulling the script into the project, and adding `node copyright.js PATTERN --lint` into the `lint` npm command

### Developing

`node --inspect --debug-brk copyright.js ../../some-project/source-folder/**/*.js`
