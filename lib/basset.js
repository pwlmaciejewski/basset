var Basset, ReporterFactory;

ReporterFactory = require('./reporterFactory');

Basset = (function() {

  function Basset(options) {
    this.options = this.createOptions(options);
  }

  Basset.prototype.createOptions = function(options) {
    var name, res, value, _ref;
    res = {};
    _ref = Basset.defaultOptions;
    for (name in _ref) {
      value = _ref[name];
      res[name] = value;
    }
    for (name in options) {
      value = options[name];
      res[name] = value;
    }
    return res;
  };

  return Basset;

})();

Basset.defaultOptions = {
  repeatNum: 1,
  format: 'plain',
  info: 'short',
  tmpHarDir: process.cwd(),
  ReporterFactory: ReporterFactory
};

module.exports = Basset;
