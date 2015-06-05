Strings
=======

Prefer interpolation over concatenation:

```
let name = "John"
let messsage = "Hello \(name)"
```

Optionals
=========

Use `as` for type coercion if possible (this is enforced statically). Otherwise use `as?`.

DO NOT use `as!` or `value!` because Xcode told you so. Stop. Think. You probably want to use `if let value = value`

You should use `!` only if you just assigned to an object or you know initialization can not fail:

```
let regex = NSRegularExpression(pattern: "[a-z]", options: NSRegularExpressionOptions.allZeros, error: nil)!
```

How do I handle errors in Swift?
================================

Swift doesn't have exceptions, so errors must somehow be returned to your caller.

You have a couple options:

- Return a tuple (similar to Go)
- Use a result/error enumeration type

We typically use an enumeration type:

```
public enum ParseResult {
    case Result(NSObject)
    case Error(String)
}
```

```
func parse(string: String) -> ParseResult
```

Properties
==========

Initializes values when defining properties, if possible:

```
class Component {
    let viewController = UIViewController()  // Assign here instead of the in the initializer
}
```

Use calculated properies instead of getter and setter functions:

```
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

```
let names: [String]
var names = [String]()  // Creates the string as well
```

```
let populations = [String: Int]
var populations = [String: Int]()
```

Instead of:

```
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

```
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

```
let callback: RpcMethodCallback = { result in
    // Do something with the result here
}
```

Place the closing `}` on the same line if the body of the block if empty:

```
let callback: RpcMethodCallback = { result in }  // Do nothing
```


Objective-C interop
===================

Do not use `@objc` or inherit from `NSObject` unless absolutely necessary.

Singletons
==========

Avoid this design pattern

`let` vs `var`
==============

Use `let` unless the variable will be mutated

delegates
=========

Use the `weak` modifier `delegate` properties

Protocols
=========

Protocols are awesome. Use them to restrict the API surface area of an object
being passed around.

typealiases
===========

typealias standard types if used in specific contexts.

```
typealias MessageAddress = String
```

Also, you will often find it useful to typealias function types:

```
typealias RpcMethodCallback = (RpcMethodResult) -> Void
```

Access Control
==============

Use either `private` or nothing (which defaults to module/framework internal).
Only use `public` once you've written a feature and need to expose it outside
of a module. Most things do not need to be exposed.

Comments
========

If you want your comments to be picked up by the documentation generation tool,
jazzy, you must use a triple slash comment: `///`

Tests
=====

This is the order of actual and expected values:

```
XCTAssertEqual(actualValue, expectedValue)
```

`if`/`else` braces
==================

This is the style:

```
if condition {

} else {

}
```

`if let` variables
==================

Use shadowing:

```
let message: String?

if let message = message {
    // message is now a non-Optional String
    println(message)
}
```

**Don't** use variable names like `optionalMessage` or `unwrappedMessage`.

Other useful patterns
=====================

Generic functions:

https://developer.apple.com/library/mac/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-ID181

```
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

```
let message: String? = getValue(dictionary, "message") { error in
    println(error)
}
```
