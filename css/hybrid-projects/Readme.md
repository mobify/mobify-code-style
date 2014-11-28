# Hybrid App Projects

## Structuring Your Styles

CSS written specifically for webviews contained in a Native application should follow all normally prescribed best practices. This page will outline how to start a new app project, avoid adhering to legacy CSS code style, and provide a minimally sized CSS file to the app.

A hybrid project has a stylesheet specific to the OS. So, for example, in a typical android app project, you might have what looks like this:

```
/styles
    /vellum
    /components
    /partials
    /templates

    /ios
        /components
        /partials
        /templates

    /android
        /components
        /partials
        /templates

    stylesheet.scss
    ios.scss
    android.scss
```

``android.css`` will include only the styles from the web that are necessary for the app. Typically removing styles related to high-level navigation and other items that are not controlled with the native code. Then builds on top of whats there with all the styles specific to that OS, extending the same system used to build out ``stylesheet.css``. ``android.css`` would look something like this:

```scss
//
// Including only the necessary styles for the app.
//
@charset 'UTF-8';

// Web Defaults
@import 'vellum';

// Web Components
@import 'components/heading';
@import 'components/link';
@import 'components/loading-overlay';

// Web Templates
@import 'templates/root';
@import 'templates/main';
@import 'templates/home';


//
// Android Styles
//

// Components
@import 'android/components/arrange';
@import 'android/components/card';
@import 'android/components/stack';

// Templates
@import 'android/templates/login';
@import 'android/templates/store-finder';
@import 'android/templates/store-details';
@import 'android/templates/search-error';

```

Stylesheets will be generated and served to the page depending on the context. If it’s an android app it gets ``android.css``, if its a website it gets ``stylesheet.css``, etc.
