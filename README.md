# Mobify Code Style

A repo to document code standards for different languages and provide tools for linting Mobify projects.

[![NPM version](https://badge.fury.io/js/mobify-code-style.svg)](http://badge.fury.io/js/mobify-code-style)

## JavaScript

Typically we lint our javascript files using [Grunt](http://gruntjs.com/). We have two javascript linters with different features. [jshint](https://github.com/gruntjs/grunt-contrib-jshint) and [jscs](https://github.com/gustavohenke/grunt-jscs).

To add javascript linting to your project:

 1. Install the NPM `mobify-code-style`, `grunt-contrib-jshint`, and `grunt-contrib-jscs` modules.
 2. Create a [Gruntfile](http://gruntjs.com/sample-gruntfile) if you don't have one already.
 3. In the initConfig of your gruntfile, add sections for jshint and/or jscs pointing to the correct linting file.

Sample jshint config:

```javascript
jshint:{
    dev: {
        src: ['src/**/*.js'],
        options: {
            // The task fails if force is set to false. With true, it shows the
            // linting errors, but continues
            force: false,
            jshintrc: 'node_modules/mobify-code-style/javascript/.jshintrc'
        }
    }
}
```

Sample jscs config:

```javascript
jscs: {
    options: {
        config: 'node_modules/mobify-code-style/javascript/.jscsrc'
    },
    src: ['src/**/*.js']
}
```
## CSS
Our Client Services team's [CSS Style Guide](/css/Readme.md). Written with a lot of tender care by @kpeatt and @jeffkamo.
