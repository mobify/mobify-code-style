# CSS Best Practices


## Table of Contents

* [Code Like it's 2020](#code-like-its-2020)
* [Selector Specificity](#selector-specificity)
    * [Dos](#dos)
    * [Do Nots](#do-nots)
* [A Note On Attribute Selectors](#a-note-on-attribute-selectors)
* [Class Naming Convention](#class-naming-convention)
* [Self Documenting Selectors](#self-documenting-selectors)
* [Single Direction Rule](#single-direction-rule)
* [Name Spacing](#name-spacing)
* [Size Units](#size-units)
* [Format](#format)
* [Declaration Order](#declaration-order)
    * [Exceptions and variations](#exceptions-and-variations)


## Code Like it's 2020

Because we use Autoprefixer, we are able to write our code as if all our properties are fully supported. When compiled, Autoprefixer will of course convert any properties that have special requirements as far as compatibility is concerned and add prefixes to them as needed.

That includes things like Flexbox, CSS3 properties, and many more! This also means that we *should not* be using mixins for prefixing. Remember that Autoprefixer uses data from caniuse.com to determine what will be output — so properties that don't have enough browser support should probably still be avoided (or at least used with extreme caution).


## Selector Specificity

We strive to write performant, portable, selectors whenever possible. In short, [keep your CSS selectors short](http://csswizardry.com/2012/05/keep-your-css-selectors-short/).

To help do that, it might be helpful to know how to measure specificity which [Smashing Magazine has an article just for that](http://www.smashingmagazine.com/2007/07/27/css-specificity-things-you-should-know/)!

### Dos:

* Use class names for specificity because it improves performance.
* Use the component oriented naming conventions outlined below.
* If you have no other choice and you must select an ID, use the attribute selector instead

### Do Nots:

* Avoid using IDs. They decrease portability.
* Avoid using tag selectors. They both impact performance and portability.
* Never over qualify selectors because it impacts performance.

```scss
// NO
ul.button-group li.button {
}

// Yes
.button-group__button {
}

// NO
#something {
}

// Yes (Only as a last resort!)
[id="something"] {
}
```


## A Note On Attribute Selectors

A common use case is to target input types. For example `input[type="text"]`.

It's important to realize that the element selector is not necessary here. If you think about it, we are actually increasing the specificity needlessly. Attribute selectors have the same specificity as a class. The above example has the same specificity as `input.someClass`

All we really need is `[type="text"]`, because that is sufficient for targeting text inputs.

In summary: *attribute selectors should be used alone*, just like classes.


## Class Naming Convention

We use a modified version of BEM that we call CSM (Component, Sub-component, Modifier). At it's core, it's virtually identical to BEM, but our exact syntax is slightly different. Basically:

```
.c-component
.c-component__sub-component
.c-component.c--modifier
```

We cover this convention in greater detail [here](../class-naming-conventions#class-naming-conventions).


## Self Documenting Selectors

When authoring CSS, you should be always aware of the selectors that you are creating.

Strive to create selectors that actually fully describe where it is authored. Put another way, any given selector should tell you which file and where in the file it is written.

This can be down by following this simple rule: the first class in a selector is the file it can be found

For example `.t-pdp .c-product` would be written in `_pdp.scss` and NOT `_product.scss`.

The exception to this rule are when a base or root class is dependant on a global state.

For example `.x-landscape .t-about .c-contact-form` would be found in `_about.scss` and NOT a `_landscape.scss` file (modifier classes alone don't have their own files).


## Single Direction Rule

Not actually a rule, but a suggestion: when adding margins and paddings, only apply them to their designated direction.

*Margins* should be added to the *right* and *bottom*.

*Paddings* should be added to the *top* and *left*.

This principle is talked about in depth by [Harry Roberts on csswizardy.com](http://csswizardry.com/2012/06/single-direction-margin-declarations/).


## Name Spacing

The first thing you'll notice when going through Customer Success's CSS is that all of our class names are prefixed (aka: name-spaced) to one of two letters: `c-` or `t-`, meaning `_component_` or `_template_` respectively. See the [below table](../class-naming-conventions#class-prefix-conventions) for more details on Mobify's namespacing practices.

Because we work on top of our client's markup and javascript, we need to make sure our class names will never conflict with their class names. By prefixing/namespacing our classes with `c-` or `t-`, we can be assured that 99.9% of those situations are avoided.


## Size Units

* Use pixels for fixed-width elements.
* Use percentages for fluid-width elements.
* Use pixels for font-size because it offers absolute control over text.
* Use unitless line-height in conjunction with font-size because it acts as a multiplier of the pixel value.


## Format

We want our CSS to be written consistently no matter who the code author is. In order to do so, please follow these below rules.

Note that we use [SCSS-Lint](https://github.com/causes/scss-lint) to make this easier — see our linting rules [here](https://github.com/mobify/mobify-code-style/blob/update-css-style/css/.scss-lint.yml).

* One selector per line
* Use a soft indent of four spaces
* Use one space between selector and first brackets
* Use one space between property and value after :
* Always add a semicolon after property value
* Use single quotes
* Do not specify units for a zero value
* Include a space after each comma in a comma separated property list
* User lowercase and shorthand hex values, e.g., #aaa
* Always use hex values unless you are declaring rgba.
* Separate each ruleset by an empty line
* Separate each declaration block by an empty line
* Use `//` for comment blocks (instead of `/* */`)

```scss
.c-selector1,
.c-selector2 {
    // This is a comment
    display: block;
    margin: 0 auto;

    background: #bada55 url('icon.png') center no-repeat;
}

.c-selector-a,
.c-selector-b {
    padding: 10px;

    background: rgba(255, 255, 255, 0.25);
}
```


## Declaration Order

Following our practice of writing consistent code, we also want all properties to be consistently ordered according to the bellow standard.

And as before, we use [SCSS-Lint](https://github.com/causes/scss-lint) to help ensure property order is consistent - see our linting rules [here](https://github.com/mobify/mobify-code-style/blob/update-css-style/css/.scss-lint.yml).

1. Extends
1. Mixins/Includes (except for property specific mixins)
1. Position
1. Display & Box Model
1. Visual Styles
1. Text Styles
1. Vendor Prefixed Styles
1. Animations & Transitions
1. Pseudo-classes
1. Pseudo-elements
1. Modifier elements
1. Child elements

```scss
.c-selector {
    // Extends
    @extend %x-extend;

    // Includes
    @include mixin();

    // Content
    content: '\25B6';

    // Positioning
    position: absolute;
    left: 10px;
    z-index: 10;

    // Display & Box Model
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    margin: 10px;
    padding: 10px;
    border: 1px solid #333;

    // Visual styles
    background: #000;
    border-radius: 10px;
    @include box-shadow(5px 5px 0 rgba(0, 0, 0, 0);

    // Text styles
    color: #fff;
    font-family: sans-serif;
    font-size: 16px;
    text-align: right;

    // Vendor prefixed styles
    -webkit-user-select: none;
    -webkit-tap-highlight: rgba(0, 0, 0, 0);

    // Styles that don't fall under any of the above categories
    pointer-events: none;

    // Animations & Transitions
    transition: all 0.2s;

    // Pseudo-classes
    &:active {
        background: blue;
    }
    &:last-child {
        border-top: 1px solid blue;
    }

    // Pseudo-elements
    &::before {
        content: 'CSS Rules!';
    }

    // Modifier Elements
    &.x--light {
        background: #999;
    }

    // Child Elements
    span {
        font-weight: bold;
    }
}
```


### Exceptions and variations

Sometimes we break out of this convention to add to the readability of our stylesheets. This occurs especially often with long comma separated property values like gradients, shadows, transitions, or includes. These can be arrange across multiple lines and indentation levels to help with diffs and readability.

```scss
.x-selector {
    @include icon(
        home,
        $color: blue,
        $size: 15px
    );

    transition:
        opacity 0.2s ease-in-out,
        width 0.5s linear;
}
```

Continue on to [Sass (SCSS) Best Practices →](../sass-best-practices#sass-scss-best-practices)
