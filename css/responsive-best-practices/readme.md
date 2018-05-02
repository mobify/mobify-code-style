# Responsive Best Practices

## Table of Contents

* [Mobile First](#mobile-first)
* [Use 4 or Less Major Breakpoints](#use-4-or-less-major-breakpoints)
* [Keep Your Queries With Their Components](#keep-your-queries-with-their-components)

## Mobile First

Our philosophy is that _the first breakpoint is no breakpoint_.

There are plenty of good reasons to approach [design](https://www.lukew.com/ff/entry.asp?933) and [content strategy](https://alistapart.com/article/your-content-now-mobile) from this perspective, and the same goes for styling. An experience shouldn't depend on a specific viewport width to work well.

When writing your CSS, a mobile-first mindset will help keep your code DRY. *Using `min-width` only queries is the key.*

Instead of:

```scss
// Button
// ===

.c-button {
    @media screen and (max-width: 460px) {
        padding: 10px;
        font-size: 12px;
    }

    @media screen and (min-width: 461px) and (max-width: 768px) {
        padding: 10px;
        font-size: 14px;
    }
}
```

Try:

```scss
// Button
// ===

.c-button {
    padding: 10px;
    font-size: 12px;

    @media screen and (min-width: 461px) {
        font-size: 14px;
    }
}
```

Now instead of re-writing styles at each breakpoint, we're only adding on what we need to!

Exceptions obviously exist. If you are styling markup that gets replaced at a specific breakpoint (a drawer style navigation that switches to a mega-menu for wider screens is a good example), it is best to use media queries that are scoped to a particular range.


## Use 4 or Less Major Breakpoints

Good designs are based on content and context, not specific device sizes, and our styles should be as well. Work with the designers on your team to figure out what these breakpoints are, and use 4 or less. Remember, if you have 4 _major_ breakpoints, you'll have 5 different layout changes because the first breakpoint is _no_ breakpoint.

_Major_ breakpoints are project-wide variables, and follow the naming convention `$small-breakpoint`, `$medium-breakpoint`, `$large-breakpoint`, and `$x-large-breakpoint`. Keep the number of _major_ breakpoints small and consistent–it makes code easier to understand and maintain, and reduces the element of surprise.

_Minor_ breakpoints are one-offs that are used for smaller design changes, such as font-sizing, in between _major_ breakpoints. They are not ideal, but often necessary. Keep them to a minimum if possible.


## Keep Your Queries With Their Components

SCSS allows you to write media queries inside a declaration. This has several advantages, especially with more complicated components or in larger SCSS files:

1. All component and sub-component styles, including modifiers, are in one place
1. You can easily see what you are building on top of
1. Less scrolling and reduced cognitive overhead
1. Debugging is simpler

Instead of:

```scss
// Some Component
// ===

.c-some-component {
    padding: 10px;
    display: inline;
    border: 1px solid red;
    font-size: 16px;

    &.c--some-modifier {
        font-weight: bold;
    }
}

.c-component__thing {
    display: none;
}

.c-component__other-thing {
    ...
}

...

@media screen and (min-width: $small) {
    .c-some-component {
        padding: 15px;
        font-size: 18px;

        &.c--some-modifier {
            font-color: red;
        }
    }

    .c-component__thing {
        display: block;
        background-color: blue;
    }
}
```

Try:

```scss
// Some Component
// ===

.c-some-component {
    padding: 10px;
    display: inline;
    border: 1px solid red;
    font-size: 16px;

    &.c--some-modifier {
        font-weight: bold;
    }

    @media screen and (min-width: $small-breakpoint) {
        padding: 15px;
        font-size: 18px;

        &.c--some-modifier {
            font-color: red;
        }
    }
}

.c-component__thing {
    display: none;

    @media screen and (min-width: $small-breakpoint) {
        display: block;
        background-color: blue;
    }
}

.c-component__other-thing {
    ...
}
```

Continue on to [Localization and Theming Best Practices →](../localization-and-theming-best-practices/readme.md)
