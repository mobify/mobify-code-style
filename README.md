# Mobify Code Style

A repo to document code standards for different languages and provide tools for linting Mobify projects.

[![NPM version](https://badge.fury.io/js/mobify-code-style.svg)](http://badge.fury.io/js/mobify-code-style)

## JavaScript

Typically, we lint our javascript files using [Grunt](http://gruntjs.com/) and [grunt-eslint](https://github.com/sindresorhus/grunt-eslint). grunt-eslint is a Grunt helper for the [ESLint](http://eslint.org/) linter.

To add javascript linting to your project:

 1. Install the NPM `mobify-code-style` and `grunt-eslint` modules.
 2. Create a [Gruntfile](http://gruntjs.com/sample-gruntfile) if you don't have one already.
 3. In the initConfig of your gruntfile, add a section for eslint pointing to the correct linting file.

Sample eslint config:

```javascript
eslint:{
    dev: {
        src: ['src/**/*.js'],
        options: {
            // When true, eslint will test _only_ the rules set in the provided
            // configuration file
            reset: false,
            config: 'node_modules/mobify-code-style/javascript/.eslintrc'
        }
    }
}
```
## CSS
Our Client Services team's [CSS Style Guide](/css/Readme.md). Written with a lot of tender care by @kpeatt and @jeffkamo.
