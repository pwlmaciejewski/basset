var JsonReporter, Reporter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Reporter = require('./reporter');

JsonReporter = (function(_super) {

  __extends(JsonReporter, _super);

  function JsonReporter() {
    return JsonReporter.__super__.constructor.apply(this, arguments);
  }

  return JsonReporter;

})(Reporter);

module.exports = JsonReporter;
