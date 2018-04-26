# Introduction

This document outlines the way Customer Success team is expected to write their CSS. Following this document ensures that everyone is writing markup that feels familiar and can be maintained by anyone with little overhead.

We follow a mixture of various methodologies include, but not limited to: SMACSS' seperation of concerns, OOCSS' modularity, Topcoat's coding guidelines, BEM-ish naming conventions, and others.


## Table of Contents

* [Tools & Frameworks](#tools--frameworks)
* [Philosophy & Structure](#philosophy--structure)


## Tools & Frameworks

* [Sass](http://sass-lang.com/) is our preprocessor of choice
* [Susy](http://susy.readthedocs.io/) is used for our SASS-based grid system
* [PostCSS](https://github.com/postcss/postcss) for its [Autoprefixer](https://github.com/postcss/autoprefixer) plugin
* [Sass-Lint](https://github.com/sasstools/sass-lint) is our preferred linter for `SCSS`. Our custom linting rules are found [here](https://github.com/mobify/mobify-code-style/blob/master/css/.sass-lint.yml)). Find out how to integrate Sass-Lint with your text editor [here](../sass-lint/readme.md).
* [CSScomb](http://csscomb.com/) is a tool that can be plugged into most popular text editors that automatically formats your code! Our formatting ruleset can be found [here](https://github.com/mobify/mobify-code-style/blob/master/css/.csscomb.json). Find out how to integrate CSSComb with your text editor [here](../csscomb/readme.md).


## Philosophy & Structure

We strive to write modular, component driven CSS with a clear separation of concerns, structured so they are re-useable and findable. In the end, our code should be easy to maintain by anyone.

These guidelines are a summary of our base principles: Our code bases should all...

* Be written like a single person typed it
* Be mobile-first
* Be modular–components are better than page specific styles
* Be page specific only as a last resort
* Be written with nesting no deeper than 4 levels
* Be written with selectors that self document their location

> You may notice the heavy influence of methodologies like [SMACSS](http://smacss.com/) and [OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/).
>
> Familiarity with these concepts is crucial! We urge that you at least learn the basics: [Jonathan Snook's "CSS is a Mess"](http://vimeo.com/99877232) and [Andy Hume's "CSS For Grown Ups"](http://lanyrd.com/2012/sxsw-interactive/spmqc/) are good places to start.

Continue on to [CSS Best Practices →](../css-best-practices#css-best-practices)
