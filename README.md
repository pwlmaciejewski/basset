# basset [![Build Status](https://secure.travis-ci.org/fragphace/basset.png?branch=master)](http://travis-ci.org/fragphace/basset)

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
	var basset = new Basset('http://google.com', { repeatNum: 10 });
	basset.on('done', function (results) {
		average = results.average()
		console.log('onLoad: ' + average.getValue('onLoad'));
	});
	basset.sniff();
```

###### `new Basset(url, options)`

Argument `url` is required, `options` are optional.

Default options:

```
  repeatNum: 1
```

###### `.sniff()`

Run all tests (sniffers).

###### `begin` event

Emitted before starting of a first test.

###### `end` event

Emitted after all tests stopped. Passes `Statistic` intance to handler function.
See `Statistic class` for more information.

```javascript
	var basset = new Basset('http://google.com', { repeatNum: 10 });
	basset.on('end', function (results) {
		var avg = results.average();
		console.log(avg.getValue('onLoad'));
	});
	basset.sniff();
```

###### `testStart` event

Emitted on test start. Passes `HarResult` instance to handler function.
See `HarResult class` and `Result class` section for more information.

```javascript
	var basset = new Basset('http://bbc.com');
	basset.on('testStart', function (result) {
		console.log(result.getValue('onLoad')); // Prints onLoad time
	});
	basset.sniff();
```

###### `result` event

Emitted when test gives valid result. Passes `HarResult` instance to handler function.
See `HarResult class` and `Result class` section for more informaction.

###### `failure` event

Emitted when test fails (browser error occured or something else gone wrong).
Passes `Error` instance to handler function.

###### `testStop` event

Emitted after test stop (after `failure` or `result` event).

## Changelog

`0.0.1` - Initial release