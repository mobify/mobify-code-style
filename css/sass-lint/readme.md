# Sass-Lint

Sass-Lint is a pure node.js-only tool to help you write clean and consistent SCSS and Sass. Newly generated Adaptive.js projects use this tool by default, leveraging a Grunt task wrapper to invoke it. You can also run it manually from the command line, which will output any problems with your SCSS, including the filename and line number(s).

When enabled in an Adaptive.js project, Sass files may be linted by invoking `grunt sasslint` or `grunt scsslint`.

## Requirements
- Node.js v4.X LTS and NPM v2.X (installed via NVM as directed in the [Adaptive.js docs](http://adaptivejs.mobify.com/v2.0/docs/install/))
- Files must be written in SCSS syntax

## Important Links

[Sass-Lint GitHub Repo](https://github.com/sasstools/sass-lint)

[Mobify's Sass-Lint rules in the Code Style GitHub Repo](https://github.com/mobify/mobify-code-style/blob/master/css/.sass-lint.yml)

## Getting Started
Make sure you have all the requirements.
Install Sass-Lint by running this command in your Terminal:

`npm install -g sass-lint`

Install the Mobify Code Style by running this command in your Terminal:

`npm install -g mobify-code-style`

Note that the above npm install commands shouldn't need `sudo` if you are using NVM (as recommended in the [Adaptive.js docs](http://adaptivejs.mobify.com/v2.0/docs/install/))

Follow the steps below for your preferred text editor.

### Using Sass-Lint with Atom

1. Install the following packages:
    - [Linter](https://atom.io/packages/linter)
    - [Linter-sass-lint](https://atom.io/packages/linter-sass-lint)
1. Configure your Atom settings for linter-sass-lint:
    - .sass-lint.yml Config File path:
    Run `npm config get prefix` and append `/lib/node_modules/mobify-code-style/css/.sass-lint.yml` to the result
    - Global Node Installation Path:
    Run `npm get prefix` and insert the result
    - Enable "Use global sass-lint installation"
1. Restart Atom
1. Check a SCSS file to make sure that sass-lint is working

### Using Sass-Lint with Sublime Text

Before you start, make sure you have [Package Control](https://packagecontrol.io/installation) installed for Sublime Text.

1. Using Package Control, install [SublimeLinter](https://packagecontrol.io/packages/SublimeLinter)
1. Using Package Control, install [SublimeLinter-sass-lint](https://packagecontrol.io/packages/SublimeLinter-contrib-sass-lint)
1. In the directory where you have all your Mobify and Adaptive projects, create a symlink named `.sass-lint.yml` that is linked to your machine's global version of the "mobify-code-style" that you installed above:
    - `ln -s path/to/your/local/mobify-code-style/css/.sass-lint.yml ./.sass-lint.yml`
    - Your local path can be found by running `npm config get prefix` and appending `/lib/node_modules/`
1. Restart Sublime Text
1. Check a SCSS file to make sure that sass-lint is working
