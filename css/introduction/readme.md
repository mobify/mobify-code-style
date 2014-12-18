# Introduction

This document outlines the way Customer Success team is expected to write their CSS. Following this document ensures that everyone is writing markup that feels familiar and can be maintained by anyone with little overhead.

We follow a mixture of various methodologies include, but not limited to: SMACSS' seperation of concerns, OOCSS' modularity, Topcoat's coding guidelines, BEM-ish naming conventions, and others.

## Table of Contents

* [Tools & Frameworks](#tools--frameworks)
* [Philosophy & Structure](#philosophy--structure)

## Tools & Frameworks

* [Sass](http://sass-lang.com/)
* [Autoprefixer](https://github.com/ai/autoprefixer)
* [Vellum](https://github.com/mobify/vellum)
* [Spline](https://github.com/mobify/spline)
* [Stencil](https://github.com/mobify/stencil)
* [SCSS-Lint](https://github.com/causes/scss-lint) (Our custom linting rules are found [here](https://github.com/mobify/mobify-code-style/blob/update-css-style/css/.scss-lint.yml))


## Philosophy & Structure

We strive to write modular, component driven CSS with a clear seperation of concerns, structured so they are reuseable and findable. In the end, our code should be easy to maintain by anyone - even for new people entering a project.

These guidelines are a summary of our base principles: Our code bases should all...

* Be written like a single person typed it
* Be components first
* Be page specific only as a last resort
* Be written with nesting no deeper than 4 levels
* Be written with selectors that self documents its location

Our seperation of concerns is reflected by our style directory structure as follows:

```
/styles
    /vellum
    /components
    /partials
    /pages
```

Note that Vellum represents our "Base" styles.

> You may notice the heavy influence of methodologies like [SMACSS](http://smacss.com/) and [OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/).
>
> Familiarity with these concepts is cruicial! If you are not, then we urge that you at least learn the basics: [Jonathan Snook's "CSS is a Mess"](http://vimeo.com/99877232) and [Andy Hume's "CSS For Grown Ups"](http://lanyrd.com/2012/sxsw-interactive/spmqc/) is a good place to start.

Continue on to [CSS Best Practices →](../css-best-practices#css-best-practices)
