#HTML Code Style

## Table of Contents

* [HTML Formatting](#)
    * [General Formatting](#)
    * [Doctype](#)
    * [HTML Tags](#)
    * [Entity Reference](#)
* [Attributes and Tags](#)
    * [Values](#)
    * [Attribute Order](#)
    * [Type Attributes](#)
* [Tables](#)
    * [When to Use a Table](#)
    * [Formatting a Table](#)
    * [Multiple <tbody> Elements](#)

These documents outlines how the Mobify team is expected to write their HTML markup. Following these guidelines ensures that everyone writing HTML is using best practices and keeping accessibility in mind.

This document borrows ideas and rules from Google's HTML Style Guide and Github's Markup & Template Styleguide.

## HTML Formatting
### General Formatting

- Use a new line for every [block-level element](https://developer.mozilla.org/en/docs/Web/HTML/Block-level_elements).
- Indent all block-level child elements.
- Inline styles such as `span` can remain on the same line as block content.
- Use double quotation marks `' '` for all attributes and tags.
- Indent your markup with 4 spaces, not tabs.
- Maximum line-length should be 80 columns.


```html
<blockquote>
    <p><em>Space</em>, the final frontier.</p>
</blockquote>

<ul class='c-list'>
    <li>Moe</li>
    <li>Larry</li>
    <li>Curly</li>
</ul>
```

### Doctype

All our HTML documents should be using the HTML5 doctype

```html
<!DOCTYPE html>
```

### Close All the HTML Tags

Even though HTML5 will automatically close tags, we prefer to close them ourselves.

```html
<!-- Instead of: -->
<p>Lorem ipsum dolor sit amet.
<ul>
    <li>Foo
    <li>Bar
    <li>Baz
</ul>

<!-- Try: -->
<p>Lorem ipsum dolor sit amet.</p>
<ul>
    <li>Foo</li>
    <li>Bar</li>
    <li>Baz</li>
</ul>
```

Self-contained elements (e.g. `<meta charset='utf-8'> or <img src='...'>`) don't need a trailing slash at the end.


### Entity Reference
There is no need to use entity references like `&mdash;`, `&rdquo;`, `&#x263a;`, since we should be using the [same encoding](link to ...) for all files and editors.

The exception to this is for characters with special meaning in HTML such as `<` and `&`, and "invisible" characters like `&nbsp;`.

```html
<!-- Instead of: -->
The currency symbol for the Euro is &ldquo;&eur;&rdquo;.

<!-- Try: -->
The currency symbol for the Euro is '€'s.
```
