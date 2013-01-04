var Basset, ReporterFactory, Sniffer;

ReporterFactory = require('./reporterFactory');

Sniffer = require('./sniffer');

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
    this.url = url;
    this.options = this.createOptions(options);
    this.sniffers = this.createSniffers();
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

  Basset.prototype.createSniffers = function() {
    var i, res, _i, _ref;
    res = [];
    for (i = _i = 0, _ref = this.options.repeatNum; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      res.push(this.createSniffer());
    }
    return res;
  };

  Basset.prototype.createSniffer = function() {
    return new this.options.Sniffer(this.url);
  };

  Basset.prototype.getSniffers = function() {
    return this.sniffers;
  };

  Basset.prototype.sniff = function(callback) {
    var sniffer, _i, _len, _ref;
    _ref = this.getSniffers();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      sniffer = _ref[_i];
      sniffer.run(function() {});
    }
    return callback();
  };

  return Basset;

})();

Basset.defaultOptions = {
  repeatNum: 1,
  reporter: 'plain',
  info: 'short',
  ReporterFactory: ReporterFactory,
  Sniffer: Sniffer
};

module.exports = Basset;
