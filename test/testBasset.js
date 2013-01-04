var Basset, FooSniffer, Reporter, ReporterFactory, Sniffer, buster, sandbox, sinon,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

buster = require('buster');

sinon = require('sinon');

sandbox = require('sandboxed-module');

ReporterFactory = require('../lib/reporterFactory');

Reporter = require('../lib/reporter/reporter');

Sniffer = require('../lib/sniffer');

FooSniffer = (function(_super) {

  __extends(FooSniffer, _super);

  function FooSniffer() {
    return FooSniffer.__super__.constructor.apply(this, arguments);
  }

  FooSniffer.prototype.run = function(callback) {
    return setTimeout(callback, 1);
  };

  return FooSniffer;

})(Sniffer);

Basset = sandbox.require('../lib/basset', {
  requires: {
    sniffer: FooSniffer
  }
});

buster.testCase('Basset test case', {
  setUp: function() {
    return this.basset = new Basset('http://example.com', {
      repeatNum: 2
    });
  },
  'first argument (url)': {
    'test is required': function() {
      var _this = this;
      return assert.exception(function() {
        return new Basset();
      });
    },
    'test is a string': function() {
      var _this = this;
      return assert.exception(function() {
        return new Basset({});
      });
    }
  },
  'options': {
    'test default options': function() {
      assert.equals(Basset.defaultOptions.repeatNum, 1);
      assert.equals(Basset.defaultOptions.reporter, 'plain');
      return assert.equals(Basset.defaultOptions.info, 'short');
    },
    'test constructor options': function() {
      var basset;
      basset = new Basset('http://example.com', {
        repeatNum: 3
      });
      return assert.equals(basset.options.repeatNum, 3);
    },
    'test invalid reporter': function() {
      var _this = this;
      this.Factory = Object.create(ReporterFactory);
      this.Factory.reporters = [];
      return assert.exception(function() {
        var basset;
        return basset = new Basset('http://example.com', {
          ReporterFactory: _this.Factory
        });
      });
    }
  },
  'test get sniffers': function() {
    return assert.equals(this.basset.getSniffers().length, 2);
  },
  'sniff': {
    setUp: function() {
      var sniffer, _i, _len, _ref, _results;
      _ref = this.basset.getSniffers();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sniffer = _ref[_i];
        _results.push(sinon.stub(sniffer, 'run'));
      }
      return _results;
    },
    'test all sniffers were called': function(done) {
      var _this = this;
      return this.basset.sniff(function() {
        var sniffer, _i, _len, _ref;
        _ref = _this.basset.getSniffers();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sniffer = _ref[_i];
          assert.called(sniffer.run);
        }
        return done();
      });
    },
    'test all sniffers were called with callback': function(done) {
      var _this = this;
      return this.basset.sniff(function() {
        var sniffer, _i, _len, _ref;
        _ref = _this.basset.getSniffers();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sniffer = _ref[_i];
          assert.equals(typeof sniffer.run.callsArg(0).args[0][0], 'function');
        }
        return done();
      });
    },
    'test call order': function(done) {
      var _this = this;
      return this.basset.sniff(function() {
        var lastSniffer, sniffer, _i, _len, _ref;
        lastSniffer = null;
        _ref = _this.basset.getSniffers();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sniffer = _ref[_i];
          if (lastSniffer) {
            assert(sniffer.run.calledAfter(lastSniffer.run));
          }
          lastSniffer = sniffer;
        }
        return done();
      });
    },
    'test run were in series': function(done) {
      assert(false);
      return done();
    }
  }
});
