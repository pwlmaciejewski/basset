var Basset, Sniffer, Statistic, async, events,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Sniffer = require('./sniffer');

Statistic = require('./statistic');

async = require('async');

events = require('events');

Basset = (function(_super) {

  __extends(Basset, _super);

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
    return new Sniffer(this.url);
  };

  Basset.prototype.getSniffers = function() {
    return this.sniffers;
  };

  Basset.prototype.sniff = function() {
    var runs, statistic,
      _this = this;
    statistic = new Statistic();
    runs = this.getSniffers().map(function(sniffer) {
      return function(runCallback) {
        _this.emit('newTest');
        return sniffer.run(function(err, result) {
          statistic.addResult(result);
          return runCallback();
        });
      };
    });
    return async.series(runs, function() {
      return _this.emit('done', statistic);
    });
  };

  return Basset;

})(events.EventEmitter);

Basset.defaultOptions = {
  repeatNum: 1
};

module.exports = Basset;
