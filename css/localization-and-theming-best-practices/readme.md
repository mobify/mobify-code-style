# Best Practices for Localization & Internationalization

## Table of Contents

* [For Non-Componentized Projects](#for-non-componentized-projects)
* [For Componentized Projects](#for-componentized-projects)
* [Best Practices for Theming](#best-practices-for-theming)


Otherwise known as l10n and i18n, we sometimes must author CSS that targets certain nationalities. Below we describe two methodologies for tackling this particular challenge:


## For Non-Componentized Projects

Projects that don't follow Mobify's modern CSS best practices aren't likely to have component classes. As such, targeting changes is most likely going to be entirely through template class names and desktop class names.

As such, our preferred method for apply l10n and i18n styles is as follows.

1. Create a localization or internationalization folder
2. Create a SCSS file for each l10n or i18n that is to be targetted (i.e. english, french, deutch, etc.)
3. Write your SCSS in the following format...

```scss
.x-deutsch {

    .t-template-name {
        // ...
    }

    .client-class-name {
        // ...
    }
}
```


## For Componentized Projects

Projects that do follow Mobify's modern CSS best practices have component classes. As such, our preferred method of applying l10n and i18n changes is as follows.

1. Identify whether a l10n or i18n change applies to a component or template class
2. Open that component or class in your editor
3. Apply the l10n or i18n change in the same way we treat global state classes (see below)

```scss
// If it's a component class
.c-component-name {

    .x-deutsch & {
        // ...
    }
}

.c-component-name__sub-component {

    .x-deutsch & {
        // ...
    }
}


// If it's a template class...
.t-page-name {

    .x-deutsch & {
        // ...

        .desktop-class {
            // ...
        }

        .more-desktop-classes {
            // ...
        }
    }
}

.t-page-name__sub-template {

    .x-deutsch {
        // ...
    }
}
```


## Best Practices for Theming

When creating theme styles, it is best practice to...

1. Create a themes.scss in the /scss directory
2. Create a /theme directory, in which you will...
3. Create the following directory: /component, /templates, and any other directories you deem necessary

So your newly created files and directories should look like the follow (existing files excluded):


```
/scss
    themes.scss
    /themes
        /components
        /templates
```

Any theme styles you write should go in their appropriate directory in /themes. For example, if a product-list component is themed, it would belong in `/scss/themes/components/_product-list.scss`.

Any SCSS files created in the /themes directory should be formatted as follows:

```scss
// In the case of component styles...
.x-theme-class-name {

    .c-component-class-name {
        // ...
    }
}


// In the case of template styles
.x-theme-class-name {

    .t-template-class-name {
        // ...
    }
}
```

The .x-theme-class-name is basically a global state that we are expecting to be applied on either the HTML, body, or other top level container.

Continue on to [Block Comment Documentation Guide →](../comments/Readme.md)
