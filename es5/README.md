# Linting

This folder includes a default ESLint configuration, `mobify-es5.yml`, compatible with ESLint 2.x and 3.x. Many of the formatting issues identified by ESLint can be fixed automatically with `eslint <source-files> --fix`.

# General

## ESLint and Atom

Find out how to integrate [ESLint and Atom Text](../javascript/atom.md).

##Comments

Please comment code extensively. More comments are always better than fewer comments. Comments should describe the why of your code - not what the code is doing:

````javascript
// bad!
// Shows footer if shopping bag is absent
var showFooter = !$('.shopping-bag').length;

// good
// PROJ-12: As per client request, we hide the footer if
// the shopping bag is not visible on the page.
var showFooter = !$('.shopping-bag').length;
````

Place comments that explain conditionals above the condition. This saves you four precious spaces of indent:

````javascript

if (condition) {
    // BAD! ☠
    // When `condition` is set we really need to `doSomething()`.
    doSomething();
}

// GOOD ☆
// When `condition` is set we really need to `doSomething()`.
if (condition) {
    doSomething();
}
````

In general, always favour comment placement that leads to less indenting.

Don't commit commented out sections of code back into the repository. Just delete the code. That's what git's history is for!

If a piece of code is very temporarily being removed, and will be reinserted shortly, you might decide to do this anyway. Please leave a detailed comment explaining exactly why. Sorta like those post-its we leave on boxes in the fridge with our name and date so that we know when to chuck 'em out!

Comments should have whitespace beginning the comment:

````javascript
//This is a bad comment 👎

// This is a good comment 👍

/*This is
*a bad multi-
*line comment 👎 */

/* This is a good
 * multi-line comment 👍 */
````

##Use single quotes

````javascript
// good
$('.footer')

// bad
$(".footer")
````

##Don't use magic numbers

````javascript
// bad: what was 3 again? Text node? Comment?
if (el.nodeType === 3) { ... }

// bad: The reader doesn't know why we chose 7, and if we change 7 with 8, we'll have to carefully search and replace all occurrences
if ($('.blah').length === 7) { ... }

// good

if (el.nodeType === Node.TEXT_NODE) { ... }

// good
if ($('.blah').length === defaultRoomCount) { ... }
````

##Declare variables with var

Separate declarations with a semicolon and a line break.

````javascript
// bad: these are all in the global scope and is hard to read
items = {}, length = items.length, name = 'foo';

// bad: if you comment out the first line, the subsequent declarations
// become global variables
// additionally, these do not beautify in DevTools nicely (semi-colons do)
var items = {},
    length = items.length,
    name = 'foo';

// good: easiest to read/edit, and because we run our code through uglify,
// it will be optimized at compile-time anyways
var items = {};
var length = items.length;
var name = 'foo';
````

##Use semi-colons

There are many more ways that things can break *without* semi-colons than *with* semi-colons.
Use semi-colons!

```javascript
// bad
var x
a = b
(f()) // this will evaluate to `a = b(f())`, which is not what we intended.

// good
var x;
a = b;
(f());
```

##Use trailing commas

For multi-line lists or object properties place the commas separating items at the end of the line of the previous item.

```javascript
// bad
var foo = ["apples"
           , "oranges"
           , "bananas"];

var foo = {
    "fruit": "apple"
    , "vegetable": "arugula"
};

// good
var foo = ["apples",
           "oranges",
           "bananas"];

var foo = {
    "fruit": "apple",
    "vegetable": "arugula"
};
```

##Use function expressions over function declarations

The function expression is clearly recognisable as what it really is (a variable with a function value). Additionally, it helps organize code so that all variable declarations appear at the top of a file, and invocations follow. This gives some predictablity when others are reading your code, allowing for a more consistent structure.

Function expressions are not subject to [hoisting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function#Function_declaration_hoisting). This encourages developers to declare functions before invoking them.


````javascript
// bad
function foo () {
	...
}

// good
var foo = function() {
	...
}
````

##Use a space before the opening curly brace for function calls

But no space before the opening argument parenthesis.

````javascript
// bad
var foo = function(){...}

// good: whitespace improves readability here
var foo = function() {
    ...
}
````

##No preceding space before the opening parenthesis for function calls

````javascript
// bad: we want to differentiate between operations (see below) and function calls
doStuff ();

// good
doStuff();
````

##Cache the length in 'for' loops

````javascript
// bad: we are recalculating items.length every time
for (var i = 0; i < items.length; i++)

// good
for (var i = 0, length = items.length; i < length; i++)
````

##Use a space before the opening parenthesis for conditions

````javascript
// bad: we want to differentiate between function calls (see above) and conditions
if(true)

// good
if (true)
````

##Use a space between operands

````javascript
// bad
var c=a+b;

// good: yay whitespace!
var c = a + b;
````

##Don’t use a newline before 'else' or 'else if' statements

````javascript
// bad
if (true) {
    ...
}
else {
    ...
}

// good
if (true) {
    ...
} else {
    ...
}
````

##Use a space after colons

````javascript
// bad
'footer':{
}

// good
'footer': {
}
````

##Use curly braces, even if the block only has one line

````javascript
// bad: it's more work to add a line to this block
if (isVisible) return true;

// good: this will get minified anyways
if (isVisible) {
    return true;
}
````

##Return early when possible

````javascript
if (condition) {
    return;
}
// rest of codes
````

##Don't use the object type in your variable name

Use a descriptive variable name instead.

````javascript
// bad: what is this supposed to be?
var arr = [];

// bad: why is the object type so important that it needs to be in the name?
var itemsArray = [];
var computerObj = {};

// good
var items = [];
var computer = {};
````

##Use camel case for function names

````javascript
// bad: underscores shouldn’t be used in identifiers
function recalculate_item_height() { ... }

// bad: this is our constructor name convention
function RecalculateItemHeight() { ... }

// good
function recalculateItemHeight() { ... }
````

##Use camel case for variable names

````javascript
// bad
var is_visible = true;

// good
var isVisible = true;
````

##Use PascalCase only for constructors or modules


### Constructors

````javascript
// bad
var Router = new Router();

// good
var router = new Router();
````

````javascript
// bad
function awesomemovie(options) {
    this.title = options.title;
}

var titanic = new awesomemovie({ title: 'Titanic' });

// good
function AwesomeMovie(options) {
    this.title = options.title;
}

var fiftyShades = new AwesomeMovie({ title: '50 Shades Of Grey' });
````

### Modules

[What is a module pattern?](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)

````javascript
// bad
var utils = {
    foo: function(){ return "bar" }
};

// good
var Utils = {
    foo: function(){ return "bar" }
};

````

##Declare methods for objects on the prototype, not in the object constructor

````javascript
// bad
// each method declared in the object constructor will allocate memory per instance for that method
function BadExample(name, value) {
    this.name = name;
    this.value = value;

    this.doSomeStuff = function() {
        // some stuff done
    }
}

// good
// methods declared with the prototype will be shared across all instances, reducing memory footprint
function GoodExample(name, value) {
    this.name = name;
    this.value = value;
}

GoodExample.prototype.doSomeStuff = function() {
    // some stuff done
};
````

##Cache variables if you use them more than once

````javascript
// bad: we're creating the same Zepto object multiple times
$('.items').on('click', function() {
    $(this).addClass('active');
    $(this).find('h3').remove();
});

// good
$('.items').on('click', function() {
    var $items = $(this);
    $items.addClass('active');
    $items.find('h3').remove();
});
````

##Prepend jQuery/Zepto variables with $

````javascript
// bad
var title = $('h1');

// good: later on in the code, people will know that they can use jQuery/Zepto on this object
var $title = $('h1');
````

##Always use `===` over `==`

`==` does [implicit coercions](http://dorey.github.io/JavaScript-Equality-Table/), which can
cause a number of unexpected issues.
We always prefer `===` over `==`

```javascript
// bad
if ("0" == false) {console.log('foo')} // this will console log! bad!

// good
if ("0" === false) {console.log('foo')}
```

##Calling array methods on array-like objects

You can use functions from `Array.prototype` on array-like objects. (eg. 'arguments' is not an array, but
is array-like).

###Prefer using methods from `[]` over `Array.prototype`

Prefer the short, more succinct version.

[Performance between the two styles is almost identical](http://jsperf.com/foreach-vs-array-prototype-foreach).

```javascript
// Good
[].forEach.call(arguments, function(arg) { console.log(arg); });

// Bad!
Array.prototype.forEach.call(arguments, function(arg) { console.log(arg); });
```

##Prefer `self` to `bind(this)`

```javascript
// Good
AiBot.prototype.answer = function(questionPromise) {
    var self = this;
    return questionPromise.then(function(question) {
        return self.determineResponse(question);
    });
};

// Bad
AiBot.prototype.answer = function(questionPromise) {
    return questionPromise.then(function(question) {
        return this.determineResponse(question);
    }.bind(this));
};
```

###Don't mix `bind(this)` and `self`

```javascript
// Good
UIService.prototype.addEventing = function(eventEmitter) {
    var self = this;

    eventEmitter.on('someEvent', function() {
        self.uiController.once('uiEvent', function() {
            self.handleUiEvent();
        });
    });
};

// Bad - too confusing
UIService.prototype.addEventing = function(eventEmitter) {
    var self = this;

    eventEmitter.on('someEvent', function() {
        this.uiController.once('uiEvent', function() {
            self.handleUiEvent();
        });
    }.bind(this));
};
```

##Method and promise chains

With method-chaining or promise APIs, we may have a long chain of
method calls in a single statement. It is important to format these so
that they are readable and flow as clearly as possible.

###Place each call on its own line, beginning with the period, and indented

The sequence of operations is clearer if each 'step' in the process
begins at the start of the line. Indenting relative to the previous
line makes the chain distinct.

```javascript
// Good
return functionThatReturnsAPromise()
    .then(preprocessTheResult)
    .catch(handleErrors)
    .then(logSomething);

// Bad
return functionThatReturnsAPromise.then(preprocessTheResult)
    .catch(handleErrors).then(logSomething);
```

###Avoid multiple function expressions in a single function call

The break between two function expressions passed as arguments can be
quite awkward. It is clearer to use named functions, or to change your
use of the API to split them up.

```javascript
// Bad
functionThatReturnsAPromise()
    .then(function() {
        // code here!
    }, function() {
        // other code here!
    });

// Good
var resolveFunction = function() {
    // code here!
};
var rejectFunction = function() {
    // other code here!
};

functionThatReturnsAPromise().then(resolveFunction, rejectFunction);

// Also Good
functionThatReturnsAPromise()
    .then(function() {
        // code here!
    })
    .catch(function() {
        // other code here!
    });
```

## Module Definition

When building a module that can be consumed by a number of different sources, we prefer
to use [Universal Module Definition (UMD)](https://github.com/umdjs/umd), so that the
module will be compatible with AMD, CommonJS, or plain script inclusion.
For modules that are not shared across projects, UMD is not required.

For example:

```
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.LibFoo = factory();
    }
}(this, function() {

    var LibFoo = {};
    return LibFoo;
}));
```

If it's not intended to be used in multiple sources (for example if it's a project-specific
utils file), please follow the module definition that the project follows.
