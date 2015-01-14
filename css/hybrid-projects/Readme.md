# Hybrid App Projects

## Structuring App Styles For a Legacy Mobify Site

CSS written specifically for webviews contained in a Native application should follow all normally prescribed [best practices](https://github.com/mobify/mobify-code-style/tree/master/css/css-best-practices). This page will outline how to start a new app project, avoid adhering to legacy CSS code style, and provide a minimally sized CSS file to the web.

A hybrid project has a stylesheet specific to the OS. So a typical app project for a legacy Mobify project would be structured as such:

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

``android.css`` will include all of the web styles and override them as needed. Building on top of whats there with all the styles specific to that OS will help in keeping the system maintainable. The system used to build out an example ``android.css`` would look something like this:

```scss
// Android Styles
// ===


// Web Base Styles
// ---

@import stylesheet.scss


// Components
// ---

@import 'android/components/arrange';
@import 'android/components/card';
@import 'android/components/stack';


// Templates
// ---

@import 'android/templates/login';
@import 'android/templates/store-finder';
@import 'android/templates/store-details';
@import 'android/templates/search-error';
```

Stylesheets will be generated and served to the page depending on the context. If it’s an android app it gets ``android.css``, if its a website it gets ``stylesheet.css``, etc. 

## Structuring App Styles For a New Mobify Site

The current intended strategy in mind for future new builds is to have a single stylesheet for all platforms. Incorporating platform-specific theming and components into our existing CSS system.

This could serve to decrease the complexity associated with the system we use for legacy Mobify sites and potentially make hybrid projects easier to maintain.
