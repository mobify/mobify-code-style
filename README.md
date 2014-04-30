# Mobify Code Style

A repo to document code standards for different languages and provide tools for linting Mobify projects.

## JavaScript

Typically we lint our javascript files using [Grunt](http://gruntjs.com/). We have two javascript linters with different features. [jshint](https://github.com/gruntjs/grunt-contrib-jshint) and [jscs](https://github.com/gustavohenke/grunt-jscs-checker).

To add javascript linting to your project:

 1. add `mobify-code-style` to your package.json, or `npm install` it
 2. Create a [Gruntfile](http://gruntjs.com/sample-gruntfile) if you don't have one already
 3. In the initConfig of your gruntfile, add sections for jshint and/or jscs pointing to the correct linting file

Sample jshint config:

```javascript
jshint:{
    dev: {
        src: ['src/**/*.js'],
        options: {
            force: false,
            jshintrc: 'node_modules/mobify-code-style/javascript/jshint.js'
        }
    }
}
```

Sample jscs config:

```javascript
jscs: {
    options: {
        config: 'node_modules/mobify-code-style/javascript/jscsrc.js'
    },
    src: ['src/**/*.js']
}
```
