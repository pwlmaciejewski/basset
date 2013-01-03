var Basset, ReporterFactory;

ReporterFactory = require('./reporterFactory');

Basset = (function() {

  function Basset(url, options) {
    if (url == null) {
      url = null;
    }
    if (options == null) {
      options = {};
    }
    if (typeof url !== 'string') {
      throw new Error('URL required');
    }
    this.options = this.createOptions(options);
    this.reporter = this.options.ReporterFactory.createReporter(this.options.reporter);
  }

  Basset.prototype.createOptions = function(options) {
    var name, res, value, _ref;
    if (options == null) {
      options = {};
    }
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
  reporter: 'plain',
  info: 'short',
  ReporterFactory: ReporterFactory
};

module.exports = Basset;
