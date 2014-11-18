# Sass (SCSS) Best Practices

As mentioned earlier, we use [Sass](http://sass-lang.com/) using the `SCSS` syntax and [Autoprefixer](https://github.com/ai/autoprefixer) to build our CSS. We have some guidelines when using these guys.


## Table of Contents

* [Nest Only When Necessary](#nest-only-when-necessary)
* [Global vs. Local Variables/Mixins](#global-vs-local-variablesmixins)
* [`@extends`](#extends)
* [Filename Naming Convention](#filename-naming-convention)
* [Note on Partials](#note-on-partials)
* [Commenting Best Practice](#commenting-best-practice)
    * [Common things to Comment](#common-things-to-comment)
* [Variable Naming Convention](#variable-naming-convention)
    * [Exceptions](#exceptions)


## Nest Only When Necessary

Limit nesting as much as possible. Assess every single level of nesting that you use. This prevents increasing specificity and impacting performance. Before nesting, ask yourself "will this work without nesting?" Just because you *can* nest does not mean you should, or that it makes the code maintainable (Hint: it doesn't).

At most, go no more than 4 levels deep.


## Global vs. Local Variables/Mixins

Any `$variable` that is used in more than one file should be placed in the `/vellum/variables.scss` file. Others should be placed at the top of the file in which they're used.

Any `@mixin` that is used in more than one file should be placed in the `/utilities` folder.


## `@extends`

__Avoid extends when possible__. It's always preferable to add a class to the markup than it is to use an extend.

If unavoidable, __never directly extend a standard class__. This can easily lead to enormous bloat in the generated CSS.

When using @extends, __only extend a placeholder class__. This avoids the most problematic issues of Sass `@extend`s. This technique is described in detail in Chris Lamb's article [Mastering Sass Extends and Placeholders](http://8gramgorilla.com/mastering-sass-extends-and-placeholders/).

```scss
// BAD

.c-some-class {
    // ...
}

.t-pdp .client-class {
    @extend .c-some-class;
}


// Better

.c-some-class,   // A placeholder should ALWAYS have a standard class to go with it. Add the placeholder
%c-some-class {  // AFTER the standard class. This makes the code easier to find based on the compiled selectors.
    // ...
}

.t-pdp .client-class {
    @extend %c-some-class;
}
```


## Filename Naming Convention

The file naming convention should be identical to the Class Naming convention as described below, but with the following difference:

Sass files (technical scss files) should be a Sass partial

* This means it's prepended with a underscore `_`

Sass files are named after it's root class name

* Vellum: the filename can be named after the grouping of elements
    * Example `ul`, `ol` and `li` can be grouped together in `_list.scss`
* Components: the base component will be the filename
    * `c-color-picker` makes `_color-picker.scss`
    * Sub-components and modifiers are ignored!
* Templates: the base template will be the filename
    * `t-my-account` makes `_my-account.scss`
    * Sub-templates and modifiers are ignored!
    * Note that this should ultimately match our template filename naming convention

## Note on Partials

Be aware that there are two kinds of partials:

*Template Partials* are dust template partials that are used specifically to hold small chunks of reusable code.

These partials live in the `/adaptation/templates/partials` directory.

*Sass Partials* are Sass or SCSS files that are appended with the underscore (`_`) character and is used for two reasons: First reason is to prevent the file from compiling into a CSS of the same name. The second is to simplify `@import` declarations by way of allowing you to reference the file without the file extension.

These partials live throughout the `/assets/styles` directory. In fact, most SCSS files are partials with the exception of the core `stylesheet.scss`.

When discussing partials, it should be clear which type is being talked about based on context. For example when discussing HTML, the structure of a document or a View then the Template Partial is what's relevant.

On the flip side, if discussing CSS, Sass or stylesheets then a Sass Partial is what's relevant.


## Commenting Best Practice

It is always better to over document your stylesheets than under document! That means writing lots of comments!

When writing comments, it is best to following a format that makes making changes easy, without having to clutter your code.

The first thing to keep in mind is that we section our styles based on components/templates and sub-components/templates.

*Each file* should have a main heading using a double underline (`=`) and *each sub-component/template* should have a second level heading using a single underline (`-`).

The second aspect of comments are the comments themselves! There are three types of comments...

1. General Comments

```
// My Component
// ============
//
// This is a general comment that applies to the whole of this section. It can contain
// any information that is important to the file, styles and classes inside.

.c-my-component {
}
```

2. Direct Comments

Direct comments are those that apply to a single line of code as denoted by the number in the note. So the first note (1) will apply anywhere you see `// 1`.

Be aware that these notes typically only refer to the code directly beneath it, as far as just before the next section (i.e. the next sub-component). That next section could have it's own Direct Notes, but they will only apply to that section despite using the same numbers.

```
// My Component
// ============
//
// Notes:
//
// 1. This is a direct comment about why we're using display: block
// 2. Absolutely positioned relative to the parent .c-my-component

.c-my-component {
    position: relative; // 2
    display: block; // 1

    .some-child {
        position: absolute; // 2
    }
}


// My Component: Inner
// -------------------
//
// Notes:
//
// 1. We see the number 1 again! But this note only counts for the code below and ignore the 1 above

.c-my-component__inner {
    display: block; // 1
}

```

3. Global Direct Comments

Global Direct Comments are used in the same way as normal Direct Comments with one crucial difference: these are declared once at the top of the file and can be used through any section!

So Note A will always refer to the same note.

This is a rare use case, but can be useful sometimes when you have the same set of changes that need to be applied across more than one section of code.

```
// My Component
// ============
//
// Notes:
//
// A. Hide these elements because it's unneeded desktop markup

.c-my-component {
    display: none; // A
}


// My Component: Inner
// -------------------

.c-my-component__inner {
    display: none; // A
}
```

### Common things to Comment

* The parent relative position to an absolutely positioned element
* Explicit dimensions like widths or heights that don't appear based on any meaninful unit (like `$v-space` or `$h-space` and even font sizes)

## Variable Naming Convention

Variable names should follow this pattern: `${modifer(s)}-{name}`.

The name of a variable should describe the application of the variable value. For example, instead of saying `$color` (which is too generic to be useful), you would write `$link-color` which gives the name meaning and purpose.

Similarly, the variable name can refer to specific properties such as `$border-radius` or `$border`.

Modifiers should be added before the name. So our above examples with modifiers prepended to them will look like `$dark-link-color`, `$large-border-radius` and `$dotted-border`.

Do note that variables without modifiers are implicitly the base version of that variable. As such, variables like `$base-link-color`, `$base-border-radius` and `$base-border-radius` are unnecessary.

### Exceptions

For color gradients, we follow a convention that looks like `{modifier}-{name}-{number}` where the number _roughly_ corresponds to some property level of that color, such as the greyscale level.

```
$grey-10 // 10% greyscale
$grey-20 // 20% greyscale
$grey-30 // 30% greyscale
$grey-40 // 40% greyscale
$grey-50 // 50% greyscale
// etc.
```

Keep in mind that `$grey-10` does not HAVE to be exactly 10% greyscale. The point is only to provide a rough approximation and simplify the need to remember color values.

Continue on to [Class Naming Conventions →](../class-naming-conventions#class-naming-conventions)
