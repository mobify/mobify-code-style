Block Comment Documentation Guide
=================================

This is a guide that outlines how to format comment documentation in SCSS files.


Headings
--------

Headings in CSS comments should follow the following format:

* Level 1 headings use the `=` underline
* Level 2 headings use the `-` underline
* Level 3 headings and beyond use the `#` version

```
// Heading Level 1
// ===============
//
// Heading Level 2
// ---------------
//
// ### Heading Level 3 and beyond
```

All headings should be written with ordinary [title case](http://www.titlecase.com/).

For line spacing before and after headings, follow these rules:

1. One line after a heading
2. Two lines before a heading, except...
3. If headings are adjacent, then use only one line between them
4. Omit slashes when there is more than one line between comments

For example...

```
// Documentation Headings Example
// ==============================
//
// The First Example
// -----------------
//
// Notice how there is only a single line between the level 1 and 2 headings above.


// The Second Example
// ------------------
//
// All headings that don't immediately follow another heading will have two spaces
// above, like the heading directly above.
//
// Also notice that there are no `//` characters between the end of The First Example
// paragraph and The Second Example heading.

```


Lists
-----

Lists should be written using ordinary markdown syntax. When breaking to new lines,
add the necessary space to make the new lines line up with the rest of the content.

```
// * This is an example list whose content is just too long for one line, so we
//   are going to break to a new line
// * A nice full list of things
// * More things
//
// 1.  This is an example list whose content is just too long for one line, so we
//     are going to break to a new line
// 2.  A nice full list of things
// 3.  More things
//
//     ...
//
// 8.  Wow, so many things
// 9.  Uh oh, I see changes ahead...
// 10. Look at that, the next digit!
// 11. Let's keep all previous items in line with the next set of digits please
```


Line Comments
-------------

Instead of adding comments beside properties, create a "Notes" section using a
numbered list of comments and place the number beside the relevant property, or
properties, as needed.

The reasons for this are:

1. Keeps lines shorter
2. Can fit more detailed comments without crowding the code itself
3. Can apply the same comment to multiple lines more easily
4. One line can have multiple comments, if needed

Bad example:

```
// Buttons
// =======

.button {
    display: block; // This must be a block because reasons. Reasons like because
                    // that's just how I decided to do things, etc. etc. etc.
    width: auto; // Buttons are people too. Let them be who they want to be! Stop
                 // the oppression!
}
```

Better example:

```
// Buttons
// =======
//
// Notes:
//
// 1. This must be a block because reasons. Reasons like because that's just how
//    I decided to do things, etc. etc. etc.
// 2. Buttons are people too. Let them be who they want to be! Stop the oppression!

.button {
    display: block; // 1
    width: auto; // 2
}
```

Notice how we can apply the same line comment to multiple lines:

```
// Modal
// =====
//
// Notes:
//
// 1. Absolutely position `.modal__inner` relative to the parent `.modal`

.modal {
    position: relative; // 1
}

.modal__inner {
    position: absolute; // 1
}
```


Template SCSS Files
-------------------

It is preferable that a URL is included in the description of template SCSS files.

Example:

```
// Checkout
// ========
//
// @url http://www.website.com/checkout
```

Try to split up your template files into logical chunks. Ideally, these chunks
should roughly match the layout of the page as it appears in mockups/wireframes.

Example:

```
// Checkout
// ========
//
// @url http://www.website.com/checkout

.t-checkout {

    // Global
    // ------
    //
    // ...


    // Your Details
    // ------------
    //
    // ...


    // Credit Card Info
    // ----------------
    //
    // ...
}
```

Alternatively:

```
// Checkout
// ========
//
// @url http://www.website.com/checkout


// Global
// ------
//
// ...

.t-checkout {
}


// Your Details
// ------------
//
// ...

.t-checkout__details {
}


// Credit Card Info
// ----------------
//
// ...

.t-checkout__credit-card-info {
}
```

Note that if sub-template classes are required, they should be included OUT of
the base template scope and with a level 2 heading. Example:

```
// Checkout
// ========
//
// @url http://www.website.com/checkout

.t-checkout {
}


// Checkout: Form
// --------------

.t-checkout__form {
}


// Checkout: Sidebar
// -----------------

.t-checkout__sidebar {
}
```


Component SCSS Files
--------------------

Components typically contain three types of styles:

1. Component Styles
2. Sub-Component Styles
3. Modifier Styles

Each one is distinct and should be documented in the following way:


### Component Styles

This is most often either the main set of styles for a given component, or the
component wrapper styles. This should be the first thing declared in a component
SCSS file.

```
// Breadcrumbs
// ===========

.c-breadcrumbs {
}
```


### Sub-Component Styles

Sub-Components are mini components that live inside its parent component wrapper.
However, they need to be documented separately from the main component. As such,
use a level 2 heading for each sub-component.

```
// Breadcrumbs: Link
// -----------------

.c-breadcrumbs__link {
}
```

Note that if there is a relavent sub-component that can't have it's own section
(perhaps it's a really tiny set of styles, or it's tightly related with an
existing sub-component) then group it together with it's closest
related sub-component.

Notice the lack of any "Link Arrow" heading in the following example:

```
// Breadcrumbs: Link
// -----------------

.c-breadcrumbs__link {
}

.c-breadcrumbs__link-arrow {

}
```


### Modifier Styles

Modifiers are the styles that are added or modified on top of an existing component
or sub-component. These should be grouped together with their relavent component
or sub-component in one of two ways.

Choose *one* method and *stick to it*!

Method 1: Nested

```
// Breadcrumbs: Link
// -----------------

.c-breadcrumbs__link {

    &.c--current {
    }
}
```

Method 2: Unnested

```
// Breadcrumbs: Link
// -----------------

.c-breadcrumbs__link {
}

.c-breadcrumbs__link.c--current {
}
```

Either way, only include a comment heading if the modifier is important enough
to require one. In the above example, it could be argued that a current link is
very close to being it's own sub-component as it could easily change most of the
breadcrumb link styles. That could be enough to warrant a heading:

```
// Breadcrumbs: Link
// -----------------

.c-breadcrumbs__link {
}


// Breadcrumbs: Current Link
// -------------------------

.c-breadcrumbs__link.c--current {
}
```


Functions & Mixins
------------------

`@function` and `@mixin` code have the same rules as most everything mentioned
above, as well as some unique requirements as well.


### Doc Block

In addition to the standard definition documentation, there is what we call a
doc block section that documents all the parameters: what data type is expected,
and what purpose they serve.

Lastly, the doc block records the return value; mainly just what the data
type is.

Parameters and return values are defined in the following format:

`@param` identifies the parameters.

`@return` identifies the return value.


### Dependencies

The dependencies section lists any functions, mixins or variables that is
required. If any of these are missing, then your code will likely not work.

An example of both the doc block and dependencies can be seen here:

```
// My Function
// ===========
//
// Standard definition section goes here.
//
// @param $value [integer] : This is the initial integer that will be modified
// @param $modifier [integer] : This is the modifying value, added to $value
// @return [integer]

@function add($value, $modifier) {
    @return $value + $modifier;
}
```

Continue on to [Hybrid App Projects →](../hybrid-projects#hybrid-app-projects)
