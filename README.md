# jquery-advanced-data
Advanced data attribute handling for jQuery

## Usage

### Reading

Read data attributes by using `.data([key])` function and getting the value property.

```html
<div id="reading" data-foo="bar"></div>
```
```js
$('#reading').data("foo").value   // bar
```

Read all data if key is not specified.

```html
<div id="reading" data-foo="bar" data-hello="world"></div>
```
```js
$('#reading').data().value   // [foo: bar, hello: world]
```

### Writing

Set data attributes by specifying a `key` and `value` in the `.data([key], [value])` function.

```html
<div id="writing"></div>
```
```js
$('#writing').data("foo", "bar")
```

Result:
```html
<div id="writing" data-foo="bar"></div>
```

### Toggling

Toggle the value of a data attribute by using the `.toggle()` function after selecting the attribute.

```html
<div id="toggling" data-expression="true"></div>
```
```js
$('#toggling').data("expression").toggle()
```

Result:
```html
<div id="toggling" data-expression="false"></div>
```

### Chaining

It is possible to chain actions together like this:

```html
<div id="chaining"></div>
```
```js
$('#chaining').data("expression", "true").toggle().value   // false
```

Result:
```html
<div id="chaining" data-expression="false"></div>
```