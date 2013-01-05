var PlainReporter, Reporter, clc,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Reporter = require('./reporter');

clc = require('cli-color');

PlainReporter = (function(_super) {

  __extends(PlainReporter, _super);

  function PlainReporter() {
    this.done = 0;
  }

  PlainReporter.prototype.onStop = function() {
    return this.done += 1;
  };

  PlainReporter.prototype.onResult = function(result) {
    return console.log("" + this.done + " | onLoad: " + (result.getValue('onLoad')) + " ms");
  };

  PlainReporter.prototype.onFailure = function(error) {
    return console.log(error);
  };

  PlainReporter.prototype.onEnd = function(results) {
    var avg, deviation;
    avg = results.average();
    deviation = results.deviation();
    console.log('');
    return console.log("Average onLoad: " + (avg.getValue('onLoad').toFixed(2)) + " \u00B1 " + (deviation.getValue('onLoad').toFixed(2)) + " ms");
  };

  return PlainReporter;

})(Reporter);

module.exports = PlainReporter;
