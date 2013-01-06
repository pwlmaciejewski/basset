# basset [![Build Status](https://secure.travis-ci.org/fragphace/basset.png?branch=master)](http://travis-ci.org/fragphace/basset)

Website performance sniffer. 
Uses [phantomjs](http://phantomjs.org/) and 
[netsniff.js](https://github.com/ariya/phantomjs/blob/master/examples/netsniff.js) 
to perform multiple tests and display average results.

## Installation

```
npm install -g basset
```

**Caution!** Remember that you need to have `phantomjs` command in your `PATH`. 

## Usage

```
basset -n 10 http://bbc.com
......F...
Average
  onLoad: 4419.56 ± 1587.90 ms
  requests: 82 (html: 4, css: 4, js: 34, img: 39, other: 1)
```

For more info: `basset -h`

## Documentation

### Basset class

It's extremely easy to use `basset` in your project:

* Basset needs to be initialized with an `url` to test and `options`
* Method `sniff` starts testing sequence. 
* Basset communicates with outer world using events (it derives from `EventEmitter`).

#### `new Basset(url, options)`

Argument `url` is required, `options` are optional.

Default options:
```
  repeatNum: 1
```

#### `.sniff()`

Run all tests (sniffers).

#### `begin` event

Emitted before starting of a first test.

#### `end` event

Emitted after all tests stopped.

#### `testStart` event

Emitted on test start.

#### `result` event

Emitted when test gives valid result.

#### `failure` event

Emitted when test fails (browser error occured or something else gone wrong).

#### `testStop` event

Emitted after test stop (after `failure` or `result` event).

## Changelog

`0.0.1` - Initial release