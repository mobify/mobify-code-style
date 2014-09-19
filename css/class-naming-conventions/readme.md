# Class Naming Conventions


## Table of Contents

* [CSM](#csm)
    * [Components](#components)
    * [Sub-Components](#sub-components)
    * [Modifiers](#modifiers)
    * [Component modifiers that affect subcomponents](#component-modifiers-that-affect-subcomponents)
    * [State](#state)
* [Class Prefix Conventions](#class-prefix-conventions)
* [Us versus Them](#us-versus-them-aka-theres-an-x-ception-to-every-rule)
    * [When to use our selector naming scheme](#when-to-use-our-selector-naming-scheme)
    * [When to use their existing selectors](#when-to-use-their-existing-selectors)
    * [How to use their existing selectors in our components](#how-to-use-their-existing-selectors-in-our-components)


## CSM

Our convention (which we call CSM or Component, Sub-Component, Modifier) uses [BEM principles](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) to denote types of classes while still maintaining full use of the cascade.

> BEM stands for Block, Element, Modifier. Because Block and Element already have meaning in CSS, we use the terms Component and Subcomponent instead.

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

`.c-blog` This is a component. It describes a high level module or component. In this instance, it describes the container for all of our blog posts.

`.c-blog__title` This is a sub-component. It's always a child of a module or component. In this instance, it is a title for our blog post container

`.c-blog-post` This is another component. This one describes a specific blog post. We make this its own component because a blog post is not necessarily a child of the blog container. It can and should be able to live independently.

`.c--featured` This is a modifier. It is always chained to a component or sub-component. In this instance, it describes a different way of displaying a component.

`.c-blog-post__time` Like before, this is another sub-component. This time it belongs to the c-blog-post. It's still a subcomponent even though it is not a direct child of the component.

### Components

The highest level of a module — it should describe an independent module that you are creating. Components should be able to exist on their own or within other components. They should always live at the root level of a file.

* Prefixed with our component namespace `c`.
* Hyphenated naming.
* Not nested.

```scss
.c-blog-post {
}
```

### Sub-components

This is a secondary element inside of a component. It is always written as a chain of its parent component to avoid any inheritance issues. Your subcomponents should be named in a way that keeps them from having to have subcomponents of their own. If you find you need to write a subcomponent for a subcomponent, consider breaking the parent out into its own component.

Like components these should always live at the root level of a file. Do not nest these within the parent component or another subcomponent. The class name should do all the work necessary.

* Prefixed by the parent component and two underscores `c-component-name__`.
* Live below the parent component in the root of the file. Not nested.
* Are declared in the order they appear.
* Subcomponents do not have to be direct children of the component in the markup. They can be any descendent.

```scss
// Good!
.c-blog-post__title {
}

// Bad!
//
// Note how .c-blog-post__title is nested inside it's parent class
.c-blog-post {
    .c-blog-post__title {
    }
}
```

### Modifiers

These are used to modify components or subcomponents. They are always chained to a specific component and are declared in the component or subcomponent that they affect.

* Prefixed with the namespace of the affected element and two dashes (`c--`, `t--`)
* Contained to the scope of a single component
* Always declared as a chained selector to a component or subcomponent.
* Never declared as a stand-alone rule.

```scss
// Good!
//
// Note how we use the parent selector (&) to chain the modifier class to .c-blog-post
.c-blog-post {
    &.c--featured {
    }
}

// Bad!
//
// Note how .c--featured is a selector all by itself? That's bad! It
// must be chained to it's parent selector!
.c--featured {
}
```

### Component modifiers that affect subcomponents

Sometimes you'll write a modifier for a component and you want that modifier to affect the subcomponents in that component. There's a standard way to write this that will ensure compiled styles are easy to find while maintaining consistent selector placement.

```html
<div class="c-blog-post c--featured">
    <h2 class="c-blog-post__title">Blog Post Title</h2>
    <div class="c-blog-post__date">
        <p class="c-blog-post__time">12:03pm</p>
    </div>
</div>
```

```scss
.c-blog-post {
    &.c--featured {
        [STYLES]
    }
}

.c-blog-post__title {
    .c-blog-post.c--featured & {
        [STYLES]
    }
}
```

This might look a little weird at the outset but it's the best way to ensure that all of a components styles stay in the same place. It also ensures that no modifier styles are accidentally inherited where they shouldn't be.

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

Prefix | Purpose | Scaffold Directory |
------ | ------- | ------------------ |
`.c-` | Classes that start with `.c-` are one of the three possible Component classes: `Component Class` (typically the class that defines the component itself), `Sub-Component Class`, `Modifier Class`. [See above](#component-oriented-naming) | */src/scss/components* |
`.t-` | Classes that start with `.t-` are Template and Template Partial specific classes. The names of these classes are most often based on the template names defined by the konf. Example templates might include: `.t-pdp`, `.t-home`, `.t-category`. Example Template Partials might include: `.t-header`, `.t-footer`, `.t-sidebar`. | */src/scss/templates*
`.x-` | Classes that start with `.x-` are generic class names that are neither a component or template. Most commonly these classes are used to identify Mobify defined states (i.e. `.x-hide`) or a generic entity that is not a component or template (i.e. `.x-base-h1`). [See below](#us-versus-them-aka-theres-an-x-ception-to-every-rule) | */src/scss/globals/*
`.m-` | This class prefix is currently reserved for Mobify Modules. However, eventually we intend to deprecate this prefix entirely. At that time, our Mobify Modules will instead be prefixed by their module name. | */src/scss/components/vendor*


## Us versus Them (aka There's an x-ception to every rule)

It's important to remember that we don't write our own markup. We write a bastardized version of existing markup. In many cases, we're simply adding wrappers or class names to markup that already exists. Rarely, we'll completely re-template something.

Knowing that, how do we make the decision to use our class names or their class names in our styling and how does that affect the way we write our CSS? If we're using their class names, we obviously can't follow the CEM/BEM syntax laid out above. We've laid out some situational advice below on when to use their class names and when to use ours. We also talk about ways to adjust the code style laid out above when using their class names.

### When to use our selector naming scheme

* Whenever you're writing your own markup in a template.
* Whenever you're remixing or adding markup through the konf.
* Whenever you're adding classes to existing markup.
* Whenever you find yourself using @extend.

### When to use their existing selectors

* Whenever possible — when you're not required to do any of the things above. It's faster and easier to use their markup than it is to add our own.
* When their markup allows for it. For example, if they don't use classes or they don't use them with any consistency, it doesn't make sense to use their selectors.
* When their markup isn't easily changed. AJAXed content or content added after a page is loaded is an example of this.

### How to use their existing selectors in our components

This is a list of rules to use when you're using their selectors within our modules section.

> Remember, it's okay to mix our selector naming scheme with their selector naming scheme. If you have to add a class to a subcomponent, use our subcomponent naming scheme and place it in the standard spot in the file.

Always wrap the module with our naming scheme

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

Subcomponents can be directly inside their parent component, but adding your own classes should be your FIRST approach so as to avoid nesting.

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


// Don't
.c-blog-post {
    .content {
        .image {
        }
    }
}
```

Use their modifiers the same way you would use our modifiers. Chain it to the component or subcomponent it directly affects.

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

> If they use their modifiers in weird or unexpected ways, consider using the konf or templating to add our modifier classes instead.

Continue on to [Block Comment Documentation Guide →](../comments/Readme.md)
