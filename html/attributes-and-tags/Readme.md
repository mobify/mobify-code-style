# Attributes and Tags
## Values

When writing attribute or tag values, always use wrap their values with quotation marks. All attributes and tags should be lowercase.

```html
<!-- Instead of: -->
<input type=text>
<a href="/" class="button"></a>

<!-- Try: -->
<input type='text'>
<a class='button' href='/'></a>
```

## Attribute Order

HTML attributes should be listed in an order that puts the most commonly-used attributes first:

1. class
2. id
3. data-*
4. Mandatory attributes (e.g. `href` on `<a>`, `type` on `<input>`)
5. Everything else


### Omit `[type]` on `<link>` and `<script>`

Do not use type attributes for style sheets (unless not using CSS) and scripts (unless not using JavaScript).

Specifying type attributes in these contexts is not necessary as HTML5 implies text/css and text/javascript as defaults. This can be safely done even for older browsers.

```html
<!-- Instead of: -->
<link rel='stylesheet' href='//www.google.com/css/maia.css' type='text/css'>
<script src='//www.google.com/js/gweb/analytics/autotrack.js' type='text/javascript'></script>

<!-- Try: -->
<link rel='stylesheet' href='//www.google.com/css/maia.css'>
<script src='//www.google.com/js/gweb/analytics/autotrack.js'></script>
```
