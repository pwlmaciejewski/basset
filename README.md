# basset [![Build Status](https://secure.travis-ci.org/pwlmaciejewski/basset.png?branch=master)](http://travis-ci.org/pwlmaciejewski/basset)

Website performance sniffer.
Uses [phantomjs](http://phantomjs.org/) and
[netsniff.js](https://github.com/ariya/phantomjs/blob/master/examples/netsniff.js)
to perform multiple tests and display averaged results.

## Installation

```
npm install -g basset
```

**Caution!** Remember that you need to have `phantomjs` command in your `PATH`.

## Command-line usage

```
basset -n 10 http://bbc.com
......F...
Average
  onLoad: 4419.56 ± 1587.90 ms
  requests: 82 (html: 4, css: 4, js: 34, img: 39, other: 1)
```

For more info: `basset -h`

## API documentation

Basset is designed to be a command-line tool which can be easily
used as a node module, so don't be affraid to `require('basset')` in your project.

### Basset class

It's extremely easy to use `basset` in your project:

* Basset needs to be initialized with an `url` and `options`.
* Method `sniff` starts the testing sequence.
* Basset communicates with outer world using events (it derives from `EventEmitter`).

Basic example:

```javascript
	var Basset = require('basset');
	var basset = new Basset('http://google.com', { repeatNum: 2 });
	basset.on('end', function (results) {
		average = results.average()
		console.log('onLoad: ' + average.getValue('onLoad'));
	});
	basset.sniff();
```

##### `new Basset(url, options)`

Argument `url` is required, `options` are optional.

Default options:

```
  repeatNum: 1
```

##### `.sniff()`

Run all tests (sniffers).

##### `begin` event

Emitted before starting of a first test.

##### `end` event

Emitted after all tests stopped. Passes `Statistic` intance to handler function.
See `Statistic class` for more information.

```javascript
	var basset = new Basset('http://google.com', { repeatNum: 2 });
	basset.on('end', function (results) {
		var avg = results.average();
		console.log(avg.getValue('onLoad'));
	});
	basset.sniff();
```

##### `testStart` event

Emitted on test start.

##### `result` event

Emitted when test gives valid result. Passes `HarResult` instance to handler function.
See `HarResult class` and `Result class` section for more informaction.

```javascript
	var basset = new Basset('http://bbc.com');
	basset.on('result', function (result) {
		console.log(result.getValue('onLoad')); // Prints onLoad time
	});
	basset.sniff();
```

##### `failure` event

Emitted when test fails (browser error occured or something else gone wrong).
Passes `Error` instance to handler function.

##### `testStop` event

Emitted after test stop (after `failure` or `result` event).

### Result class

`Result` class represents a set of results. It has an array of `valueNames`
and you can set values only from that array. It means that if `valueNames = ['foo']`
you can `setValue('foo', 1)` but not `setValue('bar', 1)`. By default `valueNames` is empty,
so you need to derive from `Result` to create something functional.

##### `getValueNames()`

Returns a copy of internal `valueNames` array.

##### `getValue(name)`

Returns value with `name`. If `name` isn't in `valueNames` array it throws an `Error`.

##### `setValue(name, value)`

Sets `value`. If `name` isn't in `valueNames` array it throws an `Error`.

##### `hasValue(name)`

Returns true if `name` appears in `valuesNames` array.

##### `getValues(values)`

Sets values object. If one of the `values` property isn't in `valueNames` it throws an `Error`.

##### other methods

For more information about `Result` class see `lib/result.coffee`.

### HarResult class

`HarResult` derives from `Result`. It overrides `valueNames` and defines set of methods to
feed the object with a har json.

##### `feedWithHar(har)`

Accepts an object and gets essential information from it. If `har` isn't a valid
har object it throws an `Error`.

##### other methods

For more information about `HarResult` class see `lib/harResult.coffee`.

### Statistic class

`Statistic` class has many `Result` intances. It can compute average
and standard deviation from them.

##### `addResult(result)`

Add a `result` to internal `results` array.

##### `average()`

Returns a `Result` instance which represents an average of `results` array items.

##### `deviation()`

Returns a `Result` instance which represent a standard deviation of `results` array items.

## Development

* `make coffee` - generate js files
* `make watch` - make sure to have `inotifywait` installed (`apt-get install inotify-tools`)
* `npm test` - run tests

## Changelog

`0.0.1` - Initial release
