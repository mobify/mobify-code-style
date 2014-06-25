> This document outlines the way Customer Success team is expected to write their CSS. Following this document ensures that everyone is writing markup that feels familiar and can be maintained by anyone with little overhead.
>
> We follow a mixture of various methodologies include, but not limited to: SMACSS' seperation of concerns, OOCSS' modularity, Topcoat's coding guidelines, BEM-ish naming conventions, and others.

# Tools & Frameworks

* [SCSS](http://sass-lang.com/)
* [Autoprefixer](https://github.com/ai/autoprefixer)
* [Vellum](https://github.com/mobify/vellum)
* [Spline](https://github.com/mobify/spline)
* [Stencil](https://github.com/mobify/stencil)
* [SCSS-Lint](https://github.com/causes/scss-lint) (Our custom linting rules are found [here](https://github.com/mobify/mobify-code-style/blob/update-css-style/css/.scss-lint.yml))

# Philosophy & Structure

We strive to write modular, component driven CSS with a clear seperation of concerns, structured so they are reuseable and findable. In the end, our code should be easy to maintain by anyone - even for new people entering a project.

These guidelines are a summary of our base principles: Our code bases should all...

* Be written like a single person typed it
* Be components first
* Be page specific only as a last resort
* Be written with nesting no deeper than 2 levels
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
> Familiarity with these concepts is cruicial! If you are not, then we urge that you at least learn the basics: [Andy Hume's "CSS For Grown Ups"](http://lanyrd.com/2012/sxsw-interactive/spmqc/) is a good place to start.

# Coding Style

## Name Spacing

The first thing you'll notice when going through Customer Success's CSS is that all of our class names are prefixed (aka: name-spaced) to one of two letters: `c-` or `t-`, meaning _component_ or _template_ respectively. See the [below table](#class-prefix-conventions) for more details on Mobify's namespacing practices.

Because we work on top of our client's markup and javascript, we need to make sure our class names will never conflict with their class names. By prefixing/namespacing our classes with `c-` or `t-`, we can be assured that 99.9% of those situations will be avoided.

## Format

We want our CSS to be written consistently no matter who the code author is. In order to do so, please follow these below rules.

Note that we use [SCSS-Lint](https://github.com/causes/scss-lint) to make this easier - see our linting rules [here](https://github.com/mobify/mobify-code-style/blob/update-css-style/css/.scss-lint.yml).

* One selector per line
* Use a soft indent of four spaces
* Use one space between selector and first bracketa
* Use one space between property and value after :
* Always add a semicolon after property value
* Use single quotes
* Do not specify units for a zero value
* Include a space after each comma in a comma separated property list
* User lowercase and shorthand hex values, e.g., #aaa
* Always use hex values unless you are declaring rgba.
* Separate each ruleset by an empty line
* Separate each declaration block by an empty line
* Use // for comment blocks (instead of /* */)

```scss
.x-selector1,
.x-selector2 {
    // This is a comment
    display: block;
    margin: 0 auto;
    
    background: #bada55 url('icon.png') center no-repeat;
}
 
.x-selector-a,
.x-selector-b {
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
.x-selector {
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

## Sass (SCSS) Best Practices

As mentioned earlier, we use [SASS](http://sass-lang.com/) using the `SCSS` syntax and [Autoprefixer](https://github.com/ai/autoprefixer) to build our CSS. We have some guidelines when using these guys.

### Nest Only When Necessary

Limit nesting as much as possible. Assess every single level of nesting that you use. This prevents increasing specificity and impacting performance.

Before nesting, ask yourself "will this work without nesting?"

Just because you CAN nest does not mean you should, or that it makes the code maintainable (it really, really doesn't).

At most, go no more than 4 levels deep.

### Code Like it's 2020

Because we use Autoprefixer, we are able to write our code as if all our properties are fully supported. When compiled, Autoprefixer will of course convert any properties that have special requirements as far as compatibility is concerned and add prefixes to them as needed.

That includes things like Flexbox, CSS3 properties, and many more!

This also means that we SHOULD NOT be using mixins for prefixing!

Remember that Autoprefixer uses data from caniuse.com to determine what will be output - so properties that don't have enough browser support should probably still be avoided (or at least used with extreme caution).

### Global vs. Local Variables/Mixins

Any `$variable` that is used in more than one file should be placed in the `/vellum/variables.scss` file. Others should be placed at the top of the file in which they're used.

Any `@mixin` that is used in more than one file should be placed in the `/utilities` folder.

### @extends

__Avoid extends when possible__. It's always preferable to add a class to the markup than it is to use an extend.

If unavoidable, __never directly extend a standard class__. This can easily lead to enormous bloat in the generated CSS.

When using @extends, __only extend a placeholder class__. This avoids the most problematic issues of Sass `@extend`s.

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

## Size Units

* Use pixels for fixed-width elements.
* Use percentages for fluid-width elements.
* Use pixels for font-size because it offers absolute control over text.
* Use unitless line-height in conjunction with font-size because it acts as a multiplier of the pixel value.

# Selectors

We should strive to write performant, portable, selectors whenever possible.

## Specificity

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

## Component Oriented Naming

We follow a very similar structure to the platform team with some minor differences. Our convention uses the [BEM philosophy](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) to denote types of classes while still maintaining full use of the cascade.

> While BEM stands for Block, Element, Modifier, we use a slightly different language. Block and Element have meaning in CSS already so we use the terms Component and Subcomponent.

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

**.c-blog** — This is a component. It describes a high level module or component. In this instance, it describes the container for all of our blog posts.

**.c-blog__title** — This is a sub-component. It's always a child of a module or component. In this instance, it is a title for our blog post container

**.c-blog-post** — This is another component. This one describes a specific blog post. We make this its own component because a blog post is not necessarily a child of the blog container. It can and should be able to live independently.
.c--featured — This is a modifier. It is always chained to a component or sub-component. In this instance, it describes a different way of displaying a component.

**.c-blog-post__time** — Like before, this is another sub-component. This time it belongs to the c-blog-post. It's still a subcomponent even though it is not a direct child of the component.

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

* Prefixed with the namespace of the affected element and two dashes (`c--`, `t--`, and `x--`) 
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

# Class Prefix Conventions

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

#### Always wrap the module with our naming scheme

```scss
// Do
.x-blog-post {
    .title {
    }
} 

// Don't
.blogpost {
    .title {
    }
} 
```

#### Subcomponents should be directly inside their parent component where possible. Constantly evaluate your nest in this situation.

```scss
// Do
.x-blog-post {
	.content {
	}
	.image {
	}
} 
 
// Don't
.x-blog-post {
	.content {
		.image {
		}
	}
} 
```

#### Use their modifiers the same way you would use our modifiers. Chain it to the component or subcomponent it directly affects.

```scss
// Do
.x-blog-post {
	&.darkpost {
	}
} 
 
// Don't
.darkpost {
} 

// Don't
.x-blog-post {
    .darkpost & {
    }
} 
```

> If they use their modifiers in weird or unexpected ways, consider using the konf or templating to add our modifier classes instead.
