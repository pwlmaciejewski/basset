var Basset, Reporter, ReporterFactory, Sniffer, buster, sandbox, sinon;

buster = require('buster');

sinon = require('sinon');

sandbox = require('sandboxed-module');

ReporterFactory = require('../lib/reporterFactory');

Reporter = require('../lib/reporter/reporter');

Sniffer = require('../lib/sniffer');

Basset = require('../lib/basset');

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
      return assert.equals(Basset.defaultOptions.repeatNum, 1);
    },
    'test constructor options': function() {
      var basset;
      basset = new Basset('http://example.com', {
        repeatNum: 3
      });
      return assert.equals(basset.options.repeatNum, 3);
    }
  },
  'test get sniffers': function() {
    return assert.equals(this.basset.getSniffers().length, 2);
  },
  'sniff': {
    setUp: function() {
      var index, sniffer, _i, _len, _ref, _results,
        _this = this;
      _ref = this.basset.getSniffers();
      _results = [];
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        sniffer = _ref[index];
        _results.push((function(sniffer, index) {
          sniffer.runCallback = sinon.spy();
          return sinon.stub(sniffer, 'run', function(callback) {
            if (callback == null) {
              callback = function() {};
            }
            return setTimeout(function() {
              sniffer.runCallback();
              if (index === 0) {
                return callback(null, {
                  onLoad: 4
                });
              } else {
                return callback(null, {
                  onLoad: 8
                });
              }
            }, 10);
          });
        })(sniffer, index));
      }
      return _results;
    },
    'run': {
      'test all sniffers were called': function(done) {
        var _this = this;
        this.basset.on('done', function() {
          var sniffer, _i, _len, _ref;
          _ref = _this.basset.getSniffers();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            sniffer = _ref[_i];
            assert.called(sniffer.run);
          }
          return done();
        });
        return this.basset.sniff();
      },
      'test all sniffers were called with callback': function(done) {
        var _this = this;
        this.basset.on('done', function() {
          var sniffer, _i, _len, _ref;
          _ref = _this.basset.getSniffers();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            sniffer = _ref[_i];
            assert.equals(typeof sniffer.run.getCall(0).args[0], 'function');
          }
          return done();
        });
        return this.basset.sniff();
      },
      'test call order': function(done) {
        var _this = this;
        this.basset.on('done', function() {
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
        return this.basset.sniff();
      }
    },
    'run callback': {
      'test callbacks were called': function(done) {
        var _this = this;
        this.basset.on('done', function() {
          var sniffer, _i, _len, _ref;
          _ref = _this.basset.getSniffers();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            sniffer = _ref[_i];
            assert.called(sniffer.runCallback);
          }
          return done();
        });
        return this.basset.sniff();
      },
      'test were called in series': function(done) {
        var _this = this;
        this.basset.on('done', function() {
          var sniffers;
          sniffers = _this.basset.getSniffers();
          assert(sniffers[1].run.calledAfter(sniffers[0].runCallback));
          return done();
        });
        return this.basset.sniff();
      }
    },
    'events': {
      setUp: function() {
        return this.spy = sinon.spy();
      },
      'test newTest': function(done) {
        var _this = this;
        this.basset.on('newTest', this.spy);
        this.basset.on('done', function() {
          assert.calledTwice(_this.spy);
          return done();
        });
        return this.basset.sniff();
      },
      'done': {
        setUp: function(done) {
          var _this = this;
          this.basset.on('done', function(stat) {
            _this.stat = stat;
            return done();
          });
          return this.basset.sniff();
        },
        'test type': function() {
          return assert.equals(this.stat.constructor.name, 'Statistic');
        },
        'test result': function() {
          return assert.equals(this.stat.average().onLoad, 6);
        }
      }
    }
  }
});
