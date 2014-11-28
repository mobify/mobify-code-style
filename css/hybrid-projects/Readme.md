# Hybrid App Projects

CSS written specifically for webviews contained in a Native application should follow all normally prescribed best practices. Occasionally you will start a hybrid project for a Mobify site that was previously developed using outdated best practices, this page will outline how to start a new project and provide a minimally sized CSS file to the app.

## Structuring Your Styles
A hybrid project has a stylesheet specific to the OS. So in a typical android app project you might have what looks like this:

```
/styles
    /vellum
    /components
    /partials
    /pages

    /android
        /components
        /partials
        /pages

    stylesheet.scss
    android.scss
```

``android.css`` will include only the components, partials, and page styles that are necessary for the app. Typically removing styles related to high-level navigation and other items that are not controlled with the native code, as well as all the styles specific to that OS. ``android.css`` would look something like this:

```scss
//
// Including only the necessary styles for the app.
//
@charset "UTF-8";

// Default
@import “/vellum“;
@import “/components/componentOne.scss“;
@import “/components/componentTwo.scss“;
@import “/pages/pageOne.scss”
@import “/pages/pageTwo.scss”

// Modules
@import “android/components/_loginModal.scss";
@import “android/components/_pushModal.scss";
@import “android/components/_contextNav.scss";
@import “android/components/_checkoutCards.scss";

// Pages
@import “android/pages/_cart.scss";
@import “android/pages/_pdp.scss";
```

``android.css`` will be generated and served to the page depending on the context. If it’s an android app it gets ``android.css``, if its a website it gets ``stylesheet.css``.
