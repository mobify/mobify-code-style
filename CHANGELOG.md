## v2.8.1 (May 8, 2017)
- Fixes whitespace / newline management in copyright tool
- Fix to additional space added when --update flag passed into copyright tool

## v2.8.0 (May 5, 2017)
- Adds new copyright-header management tool

## v2.7.4 (February 2, 2017)
- Add new classname prefixes to CSS documentation: `pw-` and `qa-`
- Add links to alternative CSSComb text editor plugins
- Fix `lint-md` to work properly on Node.js v6+

## v2.7.3
- Temporarily disable `spaced-comment` errors, until Astro release builds comply
  with this rule.

## v2.7.2
- Temporarily downgrade `spaced-comment` errors to warning level, until Astro
  release builds comply with this rule.

## v2.7.1
- Re-organized and cleaned up markdown linting files
- Switched to using `no-duplicate-headings-in-section` (instead of
  `no-duplicate-headings`)
- Add `spaced-comment` rule enforcement to ES5 and legacy (ESLint 1.x or lower)
  linting [#132](https://github.com/mobify/mobify-code-style/pull/132)

## v2.7.0
- Remove `variable-for-property` rule from sass-lint
- Adds markdown linting via `lint-md` script
- Add ESLint and Atom Text integration how-to doc

## v2.6.0
- Remove `variable-for-property` rule from sass-lint
  [#126](https://github.com/mobify/mobify-code-style/pull/126)
- Add the eslint jsx-a11y plugin through a new `mobify-es6-react-a11y`
  configuration [#129](https://github.com/mobify/mobify-code-style/pull/129)

## v2.5.3
- Fix #123 by using react/jsx-wrap-multilines rule
- Migrate CSSComb documentation from Confluence to code style repo

## v2.5.2
- Fix #43 by updating all underlines in Sass code examples
- Fix #114 by removing invalid options from CSSComb config file
- Add a React rule to make sure propTypes are ordered, required ones declared
  first and callbacks (e.g. onChange) declared last.
- Update ES6 indent rule on switch statements
- Add ignore patterns for unused vars/args to the React configuration
- Ignore non-JS files and node\_modules in the ES6 import module
- Add a new ES5 configuration ported to ESLint 2 and up

## v2.5.1
- Update line length to 200
- Remove rule for no-unresolved import
- Remove 'strict' rule for modules

## v2.5.0
- Add an ES6 and JSX standard with lint rules.

## v2.4.4
- Add a template for code-style PRs
- Go meta! Add some templates of GitHub templates for contributing, issues, and
  PRs that can be used on other Mobify repos

## v2.4.3
- Add eslint rule + doc entry regarding trailing commas

## v2.4.2
- Add/update documentation for Sass-Lint

## v2.4.1
- Fix some bugs with sass-lint config

## v2.4.0
- Add a sass-lint config file

## v2.3.7
- Add Writing Checklist
- Fix doc error wrt function expression hoisting
- Add some more JS code style to the docs

## v2.3.6
- Change CSScomb rule: null leading-zero rule due to CSScomb bug

## v2.3.5
- Add Sass documentation about placeholders and `@extends`
- Add CSS documentation on l10n and i18n best practices

## v2.3.4
- Patch CSSComb and scss-lint rules for compatibility
- LeadingZero aligned to enabled
- Tweaked property ordering
- NameFormat to match BEM
- NestingDepth upped to 4
- color and background-color properties no longer require explicit Sass
  variables

## v2.3.3
- Change scss-lint rule: disable the quotes rules
- Change CSScomb rule: disable the quotes rules

## v2.3.2
- Update documentation: "Tools & Frameworks" section in the CSS introduction

## v2.3.1
- Add an eslint config file for production-ready JS

## v2.3.0
- Add CSSComb
- Update documentation
- Update SCSS-lint to 0.42.2

## v2.2.4
- Remove the unnecessary parens rule

## v2.2.3
- Restrict the unnecessary parens rule to functions

## v2.2.2
- Remove enforcement of 'max-statements' and 'max-params' JS rules

## v2.2.1
- Cumulative patch release
- Update SCSS-lint to 0.40.1

## v2.2.0
- Fixes eslint config to play nicely with Atom's linter-eslint package
- Adds an eslint config reset file so that our ruleset is an override

## v2.1.1
- Re-publish to work-around NPM issue

## v2.1.0
- Add new rules to .eslintrc to closer match our JS style guidelines.

## v2.0.1
- Adds .eslintrc to allow usage of ESLint
- Adds Java code style guide
- Updates to CSS hybrid project conventions
