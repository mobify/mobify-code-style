# Linting

Included is a default ESLint configuration, `mobify-es6.yml` written for ESLint 3.x. It requires the additional modules:

- `eslint-plugin-import`
- `eslint-import-resolver-webpack`

The lint configuration is the definitive source for rules; this document explains the most notable ones. `eslint <source-files> --fix` will fix most formatting issues, such as spacing.

If React/JSX is in use, use the React default configuration `mobify-es6-react.yml`, which also requires the `eslint-plugin-react` module.

JSX accessibility linting is available with the `mobify-es6-react-a11y.yml` configuration. It requires the additional modules:

- `eslint-plugin-react`
- `eslint-plugin-jsx-a11y`

## ESLint and Atom

Find out how to integrate [ESLint and Atom Text](../javascript/atom.md).

*NOTE*: While these instructions use the code style's ES5 config file, an ES6 file may be alternatively
substituted. Mobify's ES6-compatible projects will have their own `.eslintrc.yml` config file, which
will be enforced by Atom and `linter-eslint`.

## Global Names and Environments

By default, the lint configuration only assumes the standard set of
global names in the browser environment are defined. If writing a
script that runs in a different environment, such as a worker or Node,
add an `eslint-env` directive at the top of the file, e.g.:
```javascript
/* eslint-env node */
```

If you have defined or are using a global that is not associated with
any environment, you can define it for the linter in one of two
ways. If the global is only used in a single file or single place,
define it in that file by inserting a `global` directive at the top of
the file:
```javascript
/* global myGlobal anotherGlobal Mobify */
```

If, instead, it is used throughout your project, add it to the
`.eslintrc.yml` file for that project, with
```yaml
globals:
    myGlobal: true
    anotherGlobal: false
```
The boolean value indicates whether the global is to be treated as
read-only (`false`) or read-write (`true`).

## Overriding Lint Rules

Some of the lint rules disallow uncommon but valid behaviour that is easily confused with/typoed from much more common behaviour. If you need to use the disallowed behaviour on purpose, use an explicit lint override in the source.

For example, the `no-bitwise` rule disallows the bitwise operators `&` and `|` due to their unpredictable (but valid!) behaviour when substituted for the logical operators `&&` and `||`. To use bitwise operations in a situation that's approprate, do the following:

```javascript
// Mask off the bottom four bits of the octet
/* eslint-disable no-bitwise */
let maskedValue = rawValue & 0xf0
/* eslint-enable no-bitwise */
```

## Removing Lint Rules

These rules are extensive and a work in progress. If you find any of the rules to be a hindrance in your own work, open an issue in the `mobify-code-style` repository to discuss its removal or modification.

# Base Language

## Always use curly brackets with control statements
```javascript
//bad!
if (x > y)
    return x - y
else
    return y - x

for (let item of cartItems)
    console.log(item)

//good!
if (x > y) {
    return x - y
} else {
    return y - x
}

for (let item of cartItems) {
    console.log(item)
}

```

## Avoid 'Yoda' conditions
Conditions read better with the variable on the left and the constant on the right.

```javascript
// Bad
if (null !== x && 5 < y) {
    do(something)
}

// Good
if (x !== null && y > 5) {
    do(something)
}
```

## Use object shorthand when possible
ES6 allows us to not repeat ourselves when including a name from the current scope as an object property.

```javascript
// Bad
return {
    name: name,
    address: address,
    phone: phone,
}

// Good
return {
   name,
   address,
   phone
}
```

## Prefer dot notation

It is clearer to use dot notation instead of bracket notation when it is available (i.e. when the property name is a constant, identifier-legal string).

```javascript
// Bad
console.log(myObj['prop'])

// Good
console.log(myObj.prop)
```

## Use ES6 `import` rather than `require`

ES6 provides a module syntax that we can use rather than a `require` function. Babel's implementation of the ES6 module loader uses CommonJS under the hood, so we can `import` external CommonJS modules with no problem.

```javascript
// Bad
const Moment = require('moment')
const MyModule = require('./my-module')

// Good

import Moment from 'moment'
import * as MyModule from './my-module'

```

## Use ES6 `export` rather than CommonJS exports

```javascript
// Bad
const func1 = () => { console.log(1) }
const func2 = () => { console.log(2) }
const func3 = () => { console.log(3) }

module.exports = {
    func1,
    func2,
    func3
}

// Good

export const func1 = () => { console.log(1) }
export const func2 = () => { console.log(2) }
export const func3 = () => { console.log(3) }
```


## Don't use semicolons

With ES6 (and the current lint rules!) we have finally arrived at an environment where automatic semicolon insertion won't cause problems. So don't use them.

## Prefer template strings to string concatenation

Formatting output with string concatenation is verbose and requires care to space correctly. With an ES6 template string, this becomes much clearer.

```javascript
// Bad
return 'We saw ' + count + ' errors in the ' + category + ' category'

// Good

return `We saw ${count} errors in the ${category} category`
```

## Do not nest ternary expressions

Ternary expressions can be helpful, but can also lead to unclear code. If multiple ternary operators are used in a single expression, it is clearer to use explicit `if` and `else` blocks.

```javascript
// Bad
let name = (item
	? item.name
	: (defaultItem
		? defaultItem.name
		: defaultName
	)
)

// Good
let name
if (item) {
	name = item.name
} else if (defaultItem) {
	name = defaultItem.name
} else {
	name = defaultName
}
```


# Arrow Functions

## Always use parentheses in arrow function definitions

This makes the syntax consistent between single-argument arrow functions and multiple-argument (and zero-argument!) arrow functions.

```javascript
// bad!
a.map(item => { return item * 2; })

// good!
a.map((item) => { return item * 2; })
```

## Do not use a placeholder parameter in a zero-parameter arrow function

```javascript
// bad!
_ => console.log('This happened')

// good!
() => console.log('This happened')
```

## Space out the arrow function operator
```javascript
// Bad
(item)=>{ console.log(item) }

// Good
(item) => { console.log(item) }
```

## Prefer arrow functions for callbacks

If the callback does not use its *own* `this` value (as opposed to one from the enclosing scope), it should be an arrow function.

```javascript
// Bad
return fetch('http://mysite.com/api')
    .then(function(response) {
        return response.json()
    })

// Good
return fetch('http://mysite.com/api')
    .then((response) => {
        return response.json()
    })

// Also good
return fetch('http://mysite.com/api')
    .then((response) => response.json())

// Still fine
element.addEventListener('click', function(event) {
	console.log(this.id)
})
```

# Variable Declarations

## Prefer `let` and `const` to `var`

The new block-scoped declarations in ES6 are more predictable than the function-scoped `var` declaration in ES5. We should use them instead.

```javascript
// Bad
var stack = []
var item
var MAXIMUM_RETRY_COUNT = 5

// Good
let stack = []
let item
const MAXIMUM_RETRY_COUNT = 5
```

## Prefer `const` when possible

Make sure to declare values that are not to be modified as `const`. This will help ensure they are not modified inadvertently.

## Declare variables individually

This is more readable and prevents unexpected results when commenting out lines.

```javascript
// Bad
let x = 5,
    y = 10,
    z = 100

// Good
let x = 5
let y = 10
let z = 100
```

## Prefer rest parameters to `arguments`

ES6 provides rest parameter syntax as a Python-like method for collecting unbound function arguments into an array. This supersedes the `arguments` object which is not an `Array` and thus does not have any standard array methods.

```javascript
// Bad
// Notice that the `arguments` object has no `forEach` method
const myLogger = () => {
	for (let i = 0; i < arguments.length; i++) {
		console.log(arguments[i])
	}
}
// Good
// values is an Array so it has all the array methods
const myLogger = (...values) => {
	values.forEach((value) => console.log(value))
}


// Bad
// Any bound arguments remain in the `arguments` object
const myLogger2 = (name) => {
	let values = Array.prototype.slice.call(arguments, 1)
	values.forEach((value) => console.log(`${name}: ${value}`)
}

// Good
const myLogger2 = (name, ...values) => {
	values.forEach((value) => console.log(`${name}: ${value}`)
}
```

## Prefer spread operators to `Function.apply`

```javascript
// Bad
console.log.apply(console, items)

let myItems = [
	[obj, 'key', 'value']
	// etc
]
myItems.map((item) => mySetProperty.apply(undefined,  item))

// Good
console.log(...items)

let myItems = [
	[obj, 'key', 'value']
	// etc
]
myItems.map((item) => mySetProperty(...item))
```

# React

## Use ES6 classes for stateful components

React works well with ES6 class syntax. For consistency, let's use this.

```javascript
// Bad
let MyComponent = React.createClass({
	componentDidMount() {
		this.props.sendAnalytics()
	},
	render() {
		return <div>{this.props.content}</div>
	}
})

// 	Good

class MyComponent extends React.Component {
	componentDidMount() {
		this.props.sendAnalytics()
	}

	render() {
		return <div>{this.props.content}</div>
	}
}
```

## Use plain functions for stateless components

React now allows stateless components to be implemented as pure functions rather than classes. This is cleaner and allows destructuring of props.

```javascript
// Bad
class MyComponent extends React.Component {
	render() {
		return (
			<ul>
				{this.props.items.map((item) => <li>{item.content}</li>}
			</ul>
		)
	}
}

// Good
const MyComponent = ({items}) => {
	return (
		<ul>
			{items.map(({content}) => <li>{content}</li>}
		<ul>
	)
}

```

# JSX

## Self-close component elements if possible

```javascript
// Bad
<MyComponent prop1="test" prop2={10+2}>
</MyComponent>

// Good
<MyComponent prop1="test" prop2={10+2} />
```
