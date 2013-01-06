var PlainReporter, Reporter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Reporter = require('./reporter');

PlainReporter = (function(_super) {

  __extends(PlainReporter, _super);

  function PlainReporter() {
    return PlainReporter.__super__.constructor.apply(this, arguments);
  }

  PlainReporter.prototype.getSummaryTable = function(results) {
    var avg, deviation, log;
    avg = results.average();
    deviation = results.deviation();
    log = "";
    log += "Average\n";
    log += "  onLoad: " + (avg.getValue('onLoad').toFixed(2)) + " \u00B1 " + (deviation.getValue('onLoad').toFixed(2)) + " ms\n";
    log += "  requests: ";
    log += "" + (avg.getValue('requestsNum').toFixed(0)) + " (";
    log += "html: " + (avg.getValue('htmlRequestsNum').toFixed(0)) + ", ";
    log += "css: " + (avg.getValue('cssRequestsNum').toFixed(0)) + ", ";
    log += "js: " + (avg.getValue('jsRequestsNum').toFixed(0)) + ", ";
    log += "img: " + (avg.getValue('imgRequestsNum').toFixed(0)) + ", ";
    log += "other: " + (avg.getValue('otherRequestsNum').toFixed(0)) + ")";
    return log;
  };

  return PlainReporter;

})(Reporter);

module.exports = PlainReporter;
