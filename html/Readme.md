This document outlines the way Customer Success team is expected to write their HTML markup. Following this document ensures that everyone is writing markup is doing so with good practices and accessibility in mind.

This document borrows ideas and rules from Google's HTML Style Guide and Github's Markup & Template Styleguide.

## HTML Formatting

### Doctype

All our HTML documents should be using the HTML5 doctype

```html
<!DOCTYPE html>
```

Do we have a preference for uppercase vs, e.g. `<!doctype html>`?

### General Formatting

Use a new line for every block, list or table element and indent every such child element.

```html
<blockquote>
    <p><em>Space</em>, the final frontier.</p>
</blockquote>

<ul>
    <li>Moe</li>
    <li>Larry</li>
    <li>Curly</li>
</ul>
```

### Indentation Spaces

Indent your markup with 4 spaces, not tabs.

```html
<!-- Preferred Method is 4 spaces -->
<div>
    <p>This is indented with four spaces</p>
</div>

<!-- NOT Recommended -->
<div>
  <p>This is indented with two spaces</p>
</div>

<!-- NOT Recommended -->
<div>
	<p>This is indented with an tab</p>
</div>
```

### Table Format

If the content being marked up is tabular data (key-value or multidimensional data), use a table. Make use of the caption, `<thead>`, `<tfoot>`, `<tbody>` and `<th>` tags when necessary. In general, all `<th>` elements should always have a scope attribute associating them with a row or column, for accessibility reasons.

```html
<table>
    <caption>Income and Taxes for 2014</caption>
    <thead>
        <tr>
            <th scope="col">Income</th>
            <th scope="col">Taxes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>$ 5.00</td>
            <td>$ 4.50</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Table Data 1</td>
            <td>Table Data 2</td>
        </tr>
    </tfoot>
</table>
```

If data is grouped, tables may have more than one `<tbody>`. Columns may also have more than one `<th>`, representing a hierarchy of column labels, with the topmost `<th>` elements able to span several secondary headers using the `colspan` attribute. The same is true of table rows, using multiple `<th>` and the `rowspan` attribute.

```html
<table>
    <caption>Results for growth variables of mountain birches subjected to fertilization-shade (FS) treatment (two year) and previous-season manual defoliation, D (50% of leaf area).</caption>

    <thead>
        <tr>
            <th scope="col" colspan="2">Growth variables</th>
            <th scope="col">MS</th>
            <th scope="col">F</th>
            <th scope="col">df</th>
            <th scope="col">P</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row" rowspan="3">Long-shoot length</th>
            <th scope="row">FS</th>
            <td>1.242</td>
            <td>6.45</td>
            <td>3,12</td>
            <td>0.075</td>
        </tr>
        <tr>
            <th scope="row">D</th>
            <td>1.2342</td>
            <td>14.8</td>
            <td>6, 8</td>
            <td>0.005</td>
        </tr>
        <tr>
            <th scope="row">FS × D</th>
            <td>1.3445</td>
            <td>18.6</td>
            <td>2, 3</td>
            <td>0.455</td>
        </tr>
    </tbody>
    <tbody>
        <tr>
            <th scope="row" rowspan="3">Leaf Area</th>
            <th scope="row">FS</th>
            <td>0.745</td>
            <td>5.45</td>
            <td>2,12</td>
            <td>0.435</td>
        </tr>
        <tr>
            <th scope="row">D</th>
            <td>2.76</td>
            <td>12.1</td>
            <td>7,77</td>
            <td>0.234</td>
        </tr>
        <tr>
            <th scope="row">FS × D</th>
            <td>23.335</td>
            <td>13.0</td>
            <td>1,10</td>
            <td>1.865</td>
        </tr>
    </tbody>
</table>
```

### Close All HTML Tags

Even though HTML5 can automatically close tags, we prefer to close them ourselves.

```html
<!-- BAD -->
<p>Lorem ipsum dolor sit amet.
<ul>
    <li>Foo
    <li>Bar
    <li>Baz
</ul>

<!-- Good -->
<p>Lorem ipsum dolor sit amet.</p>
<ul>
    <li>Foo</li>
    <li>Bar</li>
    <li>Baz</li>
</ul>
```

Self-contained elements (e.g. `<meta charset="utf-8">`) should not have a trailing slash at the end.

### Attribute Values

When writing attribute values, always quote their value, even when writing HTML5. Use double quotation marks `"` rather than single quotation marks `'`.

```html
<!-- NOT Recommended -->
<input type=text>
<a href='/' class='button'></a>

<!-- Recommended -->
<input type="text">
<a href="/" class="button"></a>
```

### Attribute Order

> _Do we want to do something like this? See https://github.com/necolas/idiomatic-html_

> HTML attributes should be listed in an order that puts the most commonly-used attributes first:
>
> 1. class
> 2. id
> 3. data-*
> 4. Mandatory attributes (e.g. `type` on <input>)
> 5. Everything else

### Entity Reference

There is no need to use entity references like `&mdash;`, `&rdquo;`, `&#x263a;`, assuming the same encoding is used for all files and editors.

The exception to this is for characters with special meaning in HTML (like `<` and `&`) as well as control or "invisible" characters (like no-break spaces).

```html
<!-- NOT recommended -->
The currency symbol for the Euro is &ldquo;&eur;&rdquo;.

<!-- Recommended -->
The currency symbol for the Euro is “€”.
```

### Omit `[type]` on `<link>` and `<script>`

Do not use type attributes for style sheets (unless not using CSS) and scripts (unless not using JavaScript).

Specifying type attributes in these contexts is not necessary as HTML5 implies text/css and text/javascript as defaults. This can be safely done even for older browsers.

```html
<!-- NOT recommended -->
<link rel="stylesheet" href="//www.google.com/css/maia.css"
    type="text/css">

<!-- Recommended -->
<link rel="stylesheet" href="//www.google.com/css/maia.css">

<!-- NOT recommended -->
<script src="//www.google.com/js/gweb/analytics/autotrack.js"
    type="text/javascript"></script>

<!-- Recommended -->
<script src="//www.google.com/js/gweb/analytics/autotrack.js"></script>
```
