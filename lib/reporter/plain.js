var PlainReporter, Reporter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Reporter = require('./reporter');

PlainReporter = (function(_super) {

  __extends(PlainReporter, _super);

  function PlainReporter() {
    return PlainReporter.__super__.constructor.apply(this, arguments);
  }

  PlainReporter.prototype.onNewTest = function() {};

  PlainReporter.prototype.onDone = function(results) {};

  return PlainReporter;

})(Reporter);

module.exports = PlainReporter;
