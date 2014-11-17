# General
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

##Use function expressions over function declarations

The function expression is clearly recognisable as what it really is (a variable with a function value). Additionally, it helps organize code so that all variable declarations appear at the top of a file, and invocations follow. This gives some predictablity when others are reading your code, allowing for a more consistent structure.

Function expressions are subject to [hoisting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting), and as such declaring functions as expressions will result in their being hoisted to the top of their enclosing function or global code.


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

##Use Pascal case for constructors

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
