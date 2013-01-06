var MinimalReporter, PlainReporter, clc,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PlainReporter = require('./plain');

clc = require('cli-color');

MinimalReporter = (function(_super) {

  __extends(MinimalReporter, _super);

  function MinimalReporter() {
    return MinimalReporter.__super__.constructor.apply(this, arguments);
  }

  MinimalReporter.prototype.onBegin = function() {
    this.done = 0;
    return this.columnWidth = 50;
  };

  MinimalReporter.prototype.onTestStart = function() {
    if (this.done && this.done % this.columnWidth === 0) {
      console.log('');
    }
    return this.done += 1;
  };

  MinimalReporter.prototype.onResult = function() {
    return process.stdout.write(clc.greenBright.bold('.'));
  };

  MinimalReporter.prototype.onFailure = function() {
    return process.stdout.write(clc.redBright.bold('F'));
  };

  MinimalReporter.prototype.onEnd = function(results) {
    console.log('');
    return console.log(this.getSummaryTable(results));
  };

  return MinimalReporter;

})(PlainReporter);

module.exports = MinimalReporter;
