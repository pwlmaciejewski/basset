var PlainReporter, Reporter, clc,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Reporter = require('./reporter');

clc = require('cli-color');

PlainReporter = (function(_super) {

  __extends(PlainReporter, _super);

  function PlainReporter() {
    this.done = 0;
    this.columnWidth = 50;
  }

  PlainReporter.prototype.onStop = function() {
    if (this.done && this.done % this.columnWidth === 0) {
      console.log('');
    }
    return this.done += 1;
  };

  PlainReporter.prototype.onResult = function() {
    return process.stdout.write(clc.greenBright.bold('.'));
  };

  PlainReporter.prototype.onFailure = function() {
    return process.stdout.write(clc.redBright.bold('F'));
  };

  PlainReporter.prototype.onEnd = function(results) {
    var avg;
    avg = results.average();
    console.log('');
    return console.log("Average onLoad: " + (avg.getValue('onLoad')) + " ms");
  };

  return PlainReporter;

})(Reporter);

module.exports = PlainReporter;
