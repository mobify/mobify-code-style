Strings
=======

Prefer interpolation over concatenation:

```swift
let name = "John"
let messsage = "Hello \(name)"
```

Optionals
=========

Use `as` for type coercion if possible (this is enforced statically). Otherwise use `as?`.

DO NOT use `as!` or `value!` because Xcode told you so. Stop. Think. You probably want to use `if let value = value`.

You should use `!` only if you just assigned to an object, you know initialization can not fail, or you are initializing an object during init() but need to pass `self` to another object's init():

```swift
let regex = NSRegularExpression(pattern: "[a-z]", options: NSRegularExpressionOptions.allZeros, error: nil)!
```

init() example:
```swift
class Component {
    var controller: CustomViewController! // We want to use it as a non-optional but have to initialize after super.init()
    
    init() {
        // controller = CustomViewController(component: self) <-- compiler error
        super.init()
        controller = CustomViewController(component: self) 
    }
}
```

How do I handle errors in Swift?
================================

As of Swift 2.0 exceptions have been introduced into the language and the APIs that formerly used `someMethod(..., error: *NSError)` make use of them. We have decided to stick with our existing pattern for returning errors.

You have a couple options:

- Return a tuple (similar to Go)
- Use a result/error enumeration type

We typically use an enumeration type:

```swift
public enum ParseResult {
    case Result(AST)
    case Error(String)
}
```

```swift
func parse(string: String) -> ParseResult
```

Properties
==========

Use `let` and initialize values when defining properties, if possible:

```swift
class Component {
    let viewController = UIViewController()  // Assign here instead of the in the initializer
}
```

Use calculated properies instead of getter and setter functions:

```swift
class Component {
    let viewController = UIViewController()

    var view: UIView {
        return viewController.view
    }
}
```

Dictionary and Array types
==========================

Use shorthand type specifications:

```swift
let names: [String]
var names = [String]()  // Creates the array of String as well
```

```swift
let populations: [String: Int]
var populations = [String: Int]()
```

Instead of:

```swift
let names: Array<String>  // No!
```

White space
===========

Indent: 4 spaces

In Xcode preferences under "Text Editing" select "Automatically trim trailing
whitespace" and "Including whitespace-only lines".

Line lengths
============

You are going to have long lines in Swift. Deal with it.

Try to wrap comments to 100 characters, though.

For Dictionary and Array literals, use python-style indentation:

```swift
let nameMap: [String: String] = [
    "George": "Jetson",
    "Astro": "Boy",
    // etc.
]
```

Blocks / Closures
=================

The common iOS name is "block".

Don't use types for parameters if not required:

```swift
let callback: RpcMethodCallback = { result in
    // Do something with the result here
}
```

Place the block outside of the parenthesis when it is the last argument:

```swift
// Calling UIView.animateWithDuration(duration: NSTimeInterval, animations: () -> Void)
UIView.animateWithDuration(1.0) {
    label.alpha = 0.0 // Fade out the label
}
```

Place the closing `}` on the same line if the body of the block if empty:

```swift
let callback: RpcMethodCallback = { result in }  // Do nothing
```

Place bodies of a block on a new line
=====================================

No single line `if...else` statements

```swift
// bad
if condition { return }

// good
if condition {
    return
}

// bad
guard let x = x else { return }

// good
guard let x = x else {
    return
}
```

Objective-C interop
===================

Do not use `@objc` or inherit from `NSObject` unless absolutely necessary.

Singletons
==========

Avoid this design pattern.

`let` vs `var`
==============

Use `let` unless the variable will be mutated.

delegates
=========

Use the `weak` modifier for `delegate` properties.  

Name the delegate property `delegate` unless your class supports multiple different delegates.  

Protocols (aka Interfaces)
==========================

Protocols are awesome. Use them to restrict the API surface area of an object
being passed around.

typealiases
===========

`typealias` standard types if used in specific contexts.

```swift
typealias MessageAddress = String
```

Also, you will often find it useful to typealias function types:

```swift
typealias RpcMethodCallback = (RpcMethodResult) -> Void
```

Access Control
==============

Use either `private` or nothing (which defaults to module/framework internal).
Only use `public` once you've written a feature and need to expose it outside
of a module. Most things do not need to be exposed.  Let the compiler guide
you on what to make `public`.

Comments
========

If you want your comments to be picked up by the documentation generation tool,
[jazzy](https://github.com/Realm/jazzy), you must use a triple slash comment: `///`

Tests
=====

This is the order of actual and expected values:

```swift
XCTAssertEqual(actualValue, expectedValue)
```

`if`/`else`
===========

This is the style:

```swift
if condition {

} else {

}
```

`if let` variables
==================

Use shadowing:

```swift
let message: String?

if let message = message {
    // message is now a non-Optional String
    println(message)
}
```

**Don't** use variable names like `optionalMessage` or `unwrappedMessage`.

Favour `guard...else` to nested `if...let`
==============================================
Swift allows use of the `guard` keyword to leave a scope quickly if a required condition isn't met. Everything you unwrap with a `guard` is then available for the rest of the block. This pattern allows for easier to read code with less nesting.

```swift
// Bad (pre Swift 2.0 way)
func myFunc(key: String?) {
    if let key = key {
        if let queue = dict[key] {
            for queueMessage in queue {
                if let address = queueMessage["address"] as? MessageAddress,
                    requestJson = queueMessage["requestJson"] as? String {
                        // do stuff with everything we unwrapped
                }
            }
        }
    } else {
        // log an error
    }
}
```

```swift
// Good (Swift 2.0 way using guards)
func myFunc(optionalKey: String?) {
    guard let key = key else {
        // log an error
        return
    }
    guard let queue = dict[key] else {
        return
    }
    for queueMessage in queue {
        guard let address = queueMessage["address"] as? MessageAddress else {
            continue
        }
        guard let requestJson = queueMessage["requestJson"] as? String else {
            continue
        }
        // do stuff with everything we unwrapped
    }
}
```

Global variables and functions
==============================

Swift allows variables and functions to be defined in global scope.  DO NOT USE THEM...unless you really need to.

Helper functions
================

Group helper functions into a `struct` rather than a `class`.  

Extensions
==========

Create `extension`s to classes when you will use those functions in alot of places.  Otherwise use [Helper functions](#Helper functions).  

Layout
======

Prefer Autolayout over springs+struts (autoresizing mask).  Autolayout automatically handles many things that springs+struts doesn't (status bar hiding/showing, device rotation)

Other useful patterns
=====================

Generic functions:

https://developer.apple.com/library/mac/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-ID181

```swift
func getValue<T>(dictionary: [String: AnyObject], key: String, errorHandler: String -> Void)) -> T? {
    if let value = dictionary[key] {
        if let value = value as? T {
            return value
        } else {
            errorHandler("\(key) is not a \(T.self)")
        }
    } else {
        errorHandler("\(key) is not present")
    }

    return nil
}
```

Note that the type T is inferred by what you assign `getValue()` to.  So in this case getValue() infers String? because `message` is a String?.

```swift
let message: String? = getValue(dictionary, "message") { error in
    println(error)
}
```
