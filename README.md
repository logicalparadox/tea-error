# tea-error [![Build Status](https://secure.travis-ci.org/logicalparadox/tea-error.png?branch=master)](https://travis-ci.org/logicalparadox/tea-error)

> Custom error constructor factory.

## Installation

`tea-error` is available on [npm](http://npmjs.org).

    $ npm install tea-error

## Usage

### error (name)

* **@param** _{String}_ name 
* **@return** _{Function}_  custom error constructor

The primary export for this module is a factory
that will return a constructor for a custom error
of the type/name that is specified.

```js
var error = require('tea-error')
var TestError = error('TestError')
var err = new TestError('My error message.')

throw err
```

An error created/thrown from the custom constructor
observes all of the expected Javascript behaviors of
`Error`.

##### instanceof

The constructed error is an instanceof an Error.

```js
var err = new Error()
var myerr = new TestError()

err.should.be.instanceof(Error)
myerr.should.be.instanceof(Error)
myerr.should.be.isntanceof(TestError)
```

##### name

The `name` property is defined like other "native" errors.

```js
var err = new ReferenceError()
var myerr = new TestError()

err.should.have.property('name', 'ReferenceError')
myerr.should.have.property('name', 'TestError')
```

##### message

The `message` property is defined like all error and specified
as the first argument during construction.

```js
var err = new Error('Javascript error occurred')
var myerr = new TestError('Test error occurred')

err.should.have.property('message', 'Javascript error occurred')
myerr.should.have.property('message', 'Test Error occurred')
```

##### stack

If the environment provides the ability to capture a stack trace,
it will be provided as the `stack` property. Please view your environments
documentation to see if this is supported.

```js
var err = new Error()
var myerr = new TestError()

if (Error.captureStackTrace) {
  err.should.have.property('stack')
  myerr.should.have.property('stack')
}
```

#### Construction

* **@param** _{String}_ message 
* **@param** _{Object}_ properties 
* **@param** _{Callee}_ start stack function for captureStackTrace

Once the new constructor for an error has been created
it can be used to construct errors just as normal javascript
errors.

```js
var TestError = require('tea-errors')('TestError')
var err = new TestError('that did not work right')

throw err
```

There are a number of additional arguments that can be
specified upon construction to provide further insight
into the error created.

##### properties

The second argument during construction can be an object
of properties that will be merged onto the newly created error.

```js
var err = new TestError('expected field value', { fields: [ 'username' ] })

err.should.have.property('fields')
  .an('array')
  .that.deep.equals([ 'username' ])
```

Note that if the `name`, `message`, and `stack` properties are defined
in this custom properties object, they will be ignored as those keys
are reserved.

##### start stack function

The start stack function is used by `Error.captureStackTrace`
to indicate where the environment should start the visible
stack trace. Modifying this value might be useful in situations
where the internals of the module issuing the error are irrelevant
to what occured. The most obvious example is providing feedback
for an api method.

```js
// api.js
var ApiError = require('tea-error')('ApiError')

exports.use = function (fn) {
  if ('function' !== typeof fn) {
    throw new ApiError('API .use only accepts functions', null, arguments.callee);
  }

  // etc.
}

// user.js
var api = require('./api.js)
api.use('a string?')
```

In this scenario the first line of the error stack will reference
`user.js-Ln:2` as opposed to `api.js-Ln:5`. See the `stack` example
for a demonstration.


### .toJSON ()

* **@param** _{Boolean}_ include stack
* **@return** _{Object}_  JSON
* **@alias** serialize

Convert this error into a serialized JSON object.

```js
var err = new TestError('some message', { hello: 'universe' })
var json = err.toJSON();

json.should.deep.equal({
  name: 'TestError',
  message: 'some message',
  hello: 'universe',
  stack: '...'
});
```

If this method is called as `err.toJSON(false)` the
`stack` property will not be included.



## License

(The MIT License)

Copyright (c) 2012 Jake Luer <jake@qualiancy.com> (http://qualiancy.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
