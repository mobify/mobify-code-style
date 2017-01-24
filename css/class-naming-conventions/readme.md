# Class Naming Conventions


## Table of Contents

* [Basic Conventions](#basic-conventions)
* [CSM](#csm)
    * [Components](#components)
    * [Sub-Components](#sub-components)
    * [Modifiers](#modifiers)
    * [Component modifiers that affect sub-components](#component-modifiers-that-affect-sub-components)
    * [State](#state)
    * [Components That Style Components](#components-that-style-components)
* [Class Prefix Conventions](#class-prefix-conventions)
* [Us versus Them](#us-versus-them-aka-theres-an-x-ception-to-every-rule)
    * [When to use our selector naming scheme](#when-to-use-our-selector-naming-scheme)
    * [When to use their existing selectors](#when-to-use-their-existing-selectors)
    * [How to use their existing selectors in our components](#how-to-use-their-existing-selectors-in-our-components)


## Basic Conventions

* Class names are kebab-case (*words-are-dash-separated*)
* Subclasses are indicated with double underscore, such as `root-name__sub-component-name`
* Each class is prefixed with either `c-`, `t-` or `u-` ([consult this table](#class-prefix-conventions) for details and other rarer prefixes)


## CSM

Our CSS class naming convention (which we call CSM or Component, Sub-Component, Modifier) uses [BEM principles](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) to denote types of classes while still maintaining full use of the cascade.

> BEM stands for Block, Element, Modifier. Because Block and Element already have meaning in CSS, we use the terms Component and Sub-Component instead.

```html
<div class="c-blog">
    <h1 class="c-blog__title">Blog Title</h1>
    <div class="c-blog-post c--featured">
        <h2 class="c-blog-post__title">Blog Post Title</h2>
        <div class="c-blog-post__date">
            <p class="c-blog-post__time">12:03pm</p>
        </div>
    </div>
</div>
```

This example may seem confusing at first but if we break down each of the selectors that we have, it begins to make more sense.

`.c-blog` This is a high-level component. In this example, it describes a wrapper that may contain blog content.

`.c-blog__title` This is a sub-component. In this example, it is a title for a blog.

`.c-blog-post` This is another high-level component. In this example, it describes the blog post itself. Notice that it is its own component instead of a sub-component of `c-blog` because a blog post does not need to be child of the blog container. This way the component is able to live anywhere.

`c-blog-post.c--featured` This is a modifier. Notice that the `c--featured` class is paired with the component or sub-component it belongs to. In this example, it describes a different way of displaying the `c-blog-post` component.

`.c-blog-post__time` Like before, this is another sub-component this time belonging to the `c-blog-post` component. It is still a sub-component even though it is not a **direct** child of the component. In other words, sub-components are not required to be direct children of its parent component.

### Components

Components are independent and self-contained units of UI. Styles belonging to a component should only affect the component itself, and any of its sub-components. They should not affect anything external to them, or any other components that might be nested within them.

* Prefixed with our component namespace `c-`
* Kebab-cased
* Not nested, these classes should be declared at the root level of the file

```scss
.c-blog-post {
}
```

### Sub-components

Sub-components are elements that are child to its parent component. The classname should be formatted as such: `c-[parent-component-name]__[sub-component-name]`. Sub-components do not, and should not, have sub-components of their own. If you find you need to write a sub-sub-component, instead just treat it as a sub-component – sub-components are only ever child to the parent component.

Like components, these should always live at the root level of a file. Avoid nesting these within the parent component or another sub-component.

* Prefixed by the parent component and two underscores `c-[component-name]__[sub-component-name]`
* Lives below the parent component in the root of the file, un-nested
* Subcomponents do not have to be direct children of the component in the markup

```scss
// Good!
.c-blog-post__title {
}

// Bad!
//
// Note how .c-blog-post__title is nested inside it's parent class? It should
// not be nested, instead it should live at the root level of the file
.c-blog-post {
    .c-blog-post__title {
    }
}

// Bad!
.c-blog-post__title__emote {
}

// Good!
.c-blog-post__emote {
}
```

### Modifiers

Modifiers, as their name suggests, modify components or sub-components. They are always chained to the component or sub-component they belong to.

* Prefixed with the namespace of the affected element and two dashes (`c--`, `t--`)
* Contained to the scope of a single component
* Always declared as a chained selector to a component or sub-component.
* Never declared as a stand-alone rule.

```scss
// Good!
//
// Note how we use the parent selector (&) to chain the modifier class to .c-blog-post
.c-blog-post {
    &.c--featured {
    }
}

// Also Good!
//
// Use your discretion and decide for yourself whether this option, or the above
// option makes most sense. See below for more some common scenarios.
.c-blog-post.c--featured {
}

// Bad!
//
// Note how .c--featured is a selector all by itself? That's bad! It
// must be chained to it's parent selector!
.c--featured {
}
```

### Component modifiers that affect sub-components

Sometimes a component modifier will affect its sub-components. There are several methods you can use to accomplish this. As much as possible, stick to one method in your project.

```html
<div class="c-blog-post c--featured">
    <h2 class="c-blog-post__title">Blog Post Title</h2>
    <div class="c-blog-post__date">
        <p class="c-blog-post__time">12:03pm</p>
    </div>
</div>
```


#### 1. Styles grouped with modifier
Nest the `.c-component__sub-component` elements inside the `.c-component` SCSS.

This method allows you to quickly update or edit the styles for all elements affected by a modifier.

```scss
.c-blog-post {
    &.c--featured {
        ...

        .c-blog-post__title {
            ...
        }
    }
}
```

*or*


```scss
.c-blog-post.c--featured {
    ...

    .c-blog-post__title {
        ...
    }
}
```

In larger files, adding a comment in the `.c-component__sub-component` notes can be helpful:
```scss
// Blog Post Title
// ---
//
// Modified by .c-blog-post.c--featured

.c-blog-post__title {
    ...
}
```

#### 2. Styles grouped with sub-component
Nest the modifier code inside the sub-component using `.c-component.c--modifier &`.

This method makes it easier to visualize the differences between a sub-component and its modified states.

```scss
.c-blog-post__title {
    ...

    .c-blog-post.c--featured & {
        ...
    }
}
```

In larger files, adding a comment in the `.c--modifier` notes can be helpful:
```scss
// Blog Post
// ===
.c-blog-post {
    ...

    // Featured Post
    // ---
    //
    // Also modifies .c-blog-post__title

    &.c--featured {
        ...
    }
}
```

### State

When a component or sub-component changes state (in response to a user action or other dynamic behaviour), we often add a class so the state can be styled and made visible to the user. These are almost always added and removed by UI scripts as the user interacts with the page. If a class is being added or removed via JS, chances are it’s a state. Name these state classes similarly to modifiers but with an additional prefix of `is`. Since states will have the same CSS specificity as modifiers, define your states after modifiers in source-order to avoid modifiers accidentally overriding states.

```html
<ul class="c-select">
    <li class="c-select__option c--is-selected">Item 1</li>
    <li class="c-select__option">Item 2</li>
    <li class="c-select__option">Item 3</li>
</ul>
```

```scss
.c-select {}

.c-select__option {}
.c-select__option.c--tall {} // modifier

.c-select__option.c--is-selected {} // state
.c-select__option.c--tall.c--is-selected {} // state
```

An alternative construction using the `has` prefix is reserved for marking a parent component with a sub-component that is in a particular state. These cases should be rare, but when necessary, would look like this:

```html
<ul class="c-select c--has-selection">
    <li class="c-select__option c--is-selected">Item 1</li>
    <li class="c-select__option">Item 2</li>
    <li class="c-select__option">Item 3</li>
</ul>
```

```scss
.c-select {}
.c-select--large {} // modifier
.c-select.c--has-selection {} // state
```

An exception is the use of ARIA roles for styling state. Where an ARIA role maps exactly to the state to be styled, it should be preferred over a class, since the attribute being styled carries additional value to users. For example, the custom select element being built above should be marked up with ARIA roles to be understood by screen readers as a select control. In this case, styling on `aria-selected`is preferred to `c--is-selected`. *CAUTION*: don’t add ARIA attributes in order to style a component. Only use them in stylesheets where they are needed for accessibility and make a state class redundant.

```html
<ul class="c-select" role="listbox">
    <li class="c-select__option" role="option" aria-selected>Item 1</li>
    <li class="c-select__option" role="option">Item 2</li>
    <li class="c-select__option" role="option">Item 3</li>
</ul>
```

```scss
.c-select__option {}
.c-select__option[aria-selected] {} // state, using `[aria-selected]` instead of `.c--is-selected`
```


## Class Prefix Conventions

You'll have probably noticed by now that our class names have a variety of prefixes. If not, I will describe their usages now:

Prefix | Purpose | Location |
------ | ------- | ------------------ |
`.c-` | Component classes: this includes the root component (typically the class that defines the component itself), sub-component class, and the modifier class. [See above](#component-oriented-naming) | Project's component directory |
`.t-` | Template classes: These class names are declared as the `template` in the corresponding [view](https://mobify.atlassian.net/wiki/display/PLAT/Views). Example template classes include: `.t-pdp`, `.t-home`, `.t-category`. | Project's template directory |
`.u-` | Utility classes: these are meant as one-off, strongly opinionated, high specificity overrides for very narrowly defined styles. | Project's `/styles/utilities` directory |
`.pw-` | Progressive Web classes: these classes are reserved as styling hooks for React components built into Mobify's [Progressive Web SDK](https://github.com/mobify/progressive-web-sdk) | These classes are located either in the SDK component's source directory in the SDK, or in a Project's theme directory. |
`.qa-` | QA classes: these classes are reserved for, and used as selector hooks for tests (unit tests, integration tests, etc.). These classes are **not meant as styling hooks**, so no CSS should be applied to any `qa-` classes! | In a project's test directories. |
`.x-` | Classes that start with `x-` are considered global states or document states. That means these classes should only be applied to the `html` or `body` element. Example states include `x-ios`, `x-portrait`, `x-retina`, `x-header-is-sticky`, etc. | *varies* |
`.m-` (*) | Desktop embedded mobile markup classes: these are classes that we will use if we author Markup that is intended for clients to embed onto their desktop pages, but is for mobile content. | *n/a* |
`.js-` | Javascript classes are used exclusively by scripts and should never have CSS styles applied to them. Repeat: **Do NOT** style Javascript classes. | *n/a*

> \* The `m-` class prefix has an old, deprecated use: Mobify Modules. However, Mobify Modules have been replaced with third part plugins, and are treated as third party libraries with their own conventions.


## Components That Style Components

Sometimes there are situations when a component makes use of other components, and in so doing needs to style them for within its context. Let's take a simple example of a button and icon component being tightly coupled in this manner:

> **Note:** the examples in this section will use React JSX syntax for sake of brevity.

```jsx
<button className="c-button">
    <Icon name={icon} />
    {children}
</button>
```

In situations like this it is tempting to just style the icon's class inside of the button. However, this practice is poor and creates tight coupling between the Button and Icon components that shouldn't exist. As a rule of thumb, a component should only know about what it's responsible for; it should be unaware of anything external to itself. Continuing with this example, the Icon is an external component, therefore the Button component should be completely unaware there there is even such thing as icon classes, like `c-icon`.

The solution to this challenge is to instead give the external component a new class that our new component can know about, like `c-button__icon`. By doing it in this way the external Icon component is, for all intents and purposes, being treated as a sub-component of the Button component. This method also has the benefit of being free of any (tight) coupling between the components. Both components can change, be added or removed, without really effecting the other in an unpredictable way.

So, to summarize...

```jsx
/* Bad! */
<button className="c-button">
    <Icon name={icon} />
    {children}
</button>
```

```scss
// Bad!
.c-button .c-icon {
    // ...
}
```

### Good Practice

```jsx
/* Good! */
<button className="c-button">
    <Icon className="c-button__icon" name={icon} />
    {children}
</button>
```

```scss
// Good!
.c-button__icon {
    // ...
}
```


## Parsing vs. Decorating

It's important to understand that we have a few different ways of authoring our CSS, and the way we do this is depends a lot on how we convert the desktop markup for mobile. Ideally, we parse the desktop markup and take full control of the final HTML. However, this isn't always possible, and sometimes we just output the desktop markup as is: untouched, or perhaps partially wrapped in order to control the appearance entirely through CSS.

If you find yourself wondering "should I be adding a new class, or should I use the classes from desktop?" consider the following: If we're using their class names, we obviously can't follow our CSM syntax. But that said, sometimes we just have no choice; perhaps there are engineering requirements that force us to retain the markup structure. Under such circumstances, we must stick to the desktop classes.

Below is laid out some situational advice that should clarify when to use desktop classes and when to author our own. We also talk about ways to adjust the code style when using their class names.

### When to use our class naming convention

* When writing your own markup in a template
* When decorating (adding, moving, or wrapping) markup in a View, Parser, Decorator or UI-Script
* When adding custom classes to existing markup
* When you find yourself using @extend

### When to use their existing selectors

* When it's fastest, easiest or most efficient to use their markup than it is to add our own.
* When their markup is too inconsistent, or makes parsing too difficult.
* When mobile functionality is tightly coupled to desktop's markup structure.
* When intercepting AJAXed content or content added after a page is too costly, unperformant, or inefficent.

### How to use their existing selectors in our components

This is a list of rules to use when you're mixing desktop selectors with our selectors.

> Remember, it's okay to mix our class naming convention with the desktop selectors. If you have to add a class to a sub-component, use our sub-component naming scheme and place it in the standard spot in the file.

Always component classes should always be structured with our naming conventions.

```scss
// Do
.c-blog-post {
    .title {
    }
}


// Don't
.blogpost {
    .title {
    }
}
```

Desktop classes can be added inside their parent component, but adding our own classes should be your FIRST approach so as to avoid nesting.

Constantly evaluate your nesting in situation like this.

```scss
// Okay
.c-blog-post {
    .content {
    }

    .image {
    }
}


// Better
.c-blog-post {
}

.c-blog-post__content {
}

.c-blog-post__image {
}


// Bad!
.c-blog-post {
    .content {
        .image {
        }
    }
}
```

Use their modifiers the same way you would use our modifiers. Chain it to the component or sub-component it directly affects.

```scss
// Okay
.c-blog-post {
    &.darkpost {
    }
}


// Better
.c-blog-post {
    &.c--dark-post {
    }
}


// Don't
.darkpost {
}


// Don't
.c-blog-post {
    .darkpost & {
    }
}
```

Continue on to [Block Comment Documentation Guide →](../localization-and-theming-best-practices/readme.md)
