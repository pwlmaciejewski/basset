var HarResult, Result,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Result = require('./result');

HarResult = (function(_super) {

  __extends(HarResult, _super);

  function HarResult() {
    return HarResult.__super__.constructor.apply(this, arguments);
  }

  HarResult.prototype.valueNames = ['onLoad'];

  HarResult.prototype.feedWithHar = function(har) {
    if (!HarResult.isValidHar(har)) {
      throw new Error('Invalid HAR');
    }
    return this.setValues(HarResult.collectValuesFromHar(har));
  };

  return HarResult;

})(Result);

HarResult.collectValuesFromHar = function(har) {
  var res;
  return res = {
    onLoad: har.log.pages[0].pageTimings.onLoad
  };
};

HarResult.isValidHar = function(har) {
  var name, value, values;
  try {
    values = HarResult.collectValuesFromHar(har);
    for (name in values) {
      value = values[name];
      if (typeof value !== 'number') {
        throw new Error();
      }
    }
  } catch (e) {
    return false;
  }
  return true;
};

module.exports = HarResult;
