# Mobify Code Style

A repo to document code standards for different languages and provide tools for
linting Mobify projects.

[![NPM version](https://badge.fury.io/js/mobify-code-style.svg)](http://badge.fury.io/js/mobify-code-style)
[![CircleCI](https://circleci.com/gh/mobify/mobify-code-style/tree/develop.svg?style=svg)](https://circleci.com/gh/mobify/mobify-code-style/tree/develop)

## JavaScript (ES5) with Grunt

Typically, we lint our javascript files using
[Grunt](http://gruntjs.com/) and
[grunt-eslint](https://github.com/sindresorhus/grunt-eslint). grunt-eslint
is a Grunt helper for the [ESLint](http://eslint.org/) linter.

To add javascript linting to your project:

1. Install the NPM `mobify-code-style` and `grunt-eslint` modules.
2. Create a [Gruntfile](http://gruntjs.com/sample-gruntfile) if you don't have
   one already.
3. Create an `.eslintrc.yml` file in the root of your project directory
4. In the initConfig of your gruntfile, add a section for eslint pointing to the
   correct linting file.

The `.eslintrc.yml` file should contain, to begin with:
```yaml
extends:
  - './node_modules/mobify-code-style/es5/mobify-es5.yml'
```

Sample eslint Grunt config:

```javascript
eslint:{
    dev: {
        src: ['src/**/*.js'],
        options: {
            // When true, eslint will test _only_ the rules set in the provided
            // configuration file
            reset: false,
            configFile: './.eslintrc.yml'
        }
    }
}
```

### Migrating from ESLint 0.x or 1.x to ESlint 2.x or 3.x

If you upgrade the version of `grunt-eslint` you use from one that
pulls in ESLint 1.x or lower to one that pulls
in ESLint 2.x or greater, you must modify the configuration files to
include the new style of configuration.

If the Grunt config includes the default config
`./node_modules/mobify-code-style/javascript/.eslintrc`, replace that
with `./.eslintrc.yml`, and add an `.eslintrc.yml` to the project root
as described above.

If there are modifications to the lint configuration in the project,
please check the migration guides at [eslint.org](http://eslint.org/) to port
the modified lint config to ESLint 3.x.

## ES6/JSX

We use [ESLint](http://eslint.org/) to lint ES6 and React/JSX code. If ESLint is
installed in a project, we can use the configuration from this module by
creating a file in the project root named `.eslintrc.yml`. If the project does
not use JSX, the file contents should be

```yaml
extends:
  - './node_modules/mobify-code-style/es6/mobify-es6.yml'
```

and for a React/JSX project:

```yaml
extends:
  - './node_modules/mobify-code-style/es6/mobify-es6-react.yml'
```

If using a custom Webpack configuration, add the lines:
```yaml
settings:
  import/resolver:
    webpack:
      config: '<path-to-webpack-config>'
```
to the `.eslintrc.yml`

Make sure to install the following NPM modules:
- `eslint` > 3.0
- `eslint-plugin-import`
- `eslint-import-resolver-webpack`
- `eslint-plugin-react` (for React/JSX linting only)

## ESLint and Atom

Find out how to integrate [ESLint and Atom Text](./javascript/atom.md).

## CSS

Our Client Services team's [CSS Style Guide](/css/Readme.md). Written with a lot
of tender care by @kpeatt and @jeffkamo.

## Python

See the `python` directory of this repo for a standardized `pylintrc` file and
instructions on using `pep8`, `pylint` and `pyflakes` to check Python code.

## Documentation

See the [`docs`](docs) directory for setup and configuration of Markdown
linting.

## Copyright Headers

All Mobify source files should contain copyright headers at the beginning of the
file.

See the [`copyright`](copyright) directory for setup and configuration of the
copyright manager tool
