var Basset, HarResult, Sniffer, sandbox, sinon, startbuster;

startbuster = require('buster');

sinon = require('sinon');

sandbox = require('sandboxed-module');

Sniffer = require('../lib/sniffer');

Basset = require('../lib/basset');

HarResult = require('../lib/harResult');

buster.testCase('Basset test case', {
  setUp: function() {
    return this.basset = new Basset('http://example.com', {
      repeatNum: 3
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
        repeatNum: 5
      });
      return assert.equals(basset.options.repeatNum, 5);
    }
  },
  'test get sniffers': function() {
    return assert.equals(this.basset.getSniffers().length, 3);
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
                return callback(null, new HarResult({
                  onLoad: 4
                }));
              } else if (index === 1) {
                return callback(null, new HarResult({
                  onLoad: 8
                }));
              } else {
                return callback(new Error('Something gone wrong'));
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
        this.basset.on('end', function() {
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
        this.basset.on('end', function() {
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
        this.basset.on('end', function() {
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
        this.basset.on('end', function() {
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
        this.basset.on('end', function() {
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
      'test start': function(done) {
        var _this = this;
        this.basset.on('start', this.spy);
        this.basset.on('end', function() {
          assert.calledThrice(_this.spy);
          return done();
        });
        return this.basset.sniff();
      },
      'test stop': function(done) {
        var _this = this;
        this.basset.on('stop', this.spy);
        this.basset.on('end', function() {
          assert.calledThrice(_this.spy);
          return done();
        });
        return this.basset.sniff();
      },
      'test failure': {
        setUp: function(done) {
          var _this = this;
          this.basset.on('failure', this.spy);
          this.basset.on('end', function(err) {
            return done();
          });
          return this.basset.sniff();
        },
        'test called once': function() {
          return assert.calledOnce(this.spy);
        },
        'test called with error': function() {
          var err;
          err = this.spy.getCall(0).args[0];
          return assert(err instanceof Error);
        }
      },
      'test result': {
        setUp: function(done) {
          var _this = this;
          this.basset.on('result', this.spy);
          this.basset.on('end', function() {
            return done();
          });
          return this.basset.sniff();
        },
        'test called twice': function() {
          return assert.calledTwice(this.spy);
        },
        'test called with result': function() {
          var res;
          res = this.spy.getCall(0).args[0];
          assert.equals(res.constructor.name, 'HarResult');
          return assert.equals(res.getValue('onLoad'), 4);
        }
      },
      'end': {
        setUp: function(done) {
          var _this = this;
          this.basset.on('end', function(stat) {
            _this.stat = stat;
            return done();
          });
          return this.basset.sniff();
        },
        'test type': function() {
          return assert.equals(this.stat.constructor.name, 'Statistic');
        },
        'test result': function() {
          return assert.equals(this.stat.average().getValue('onLoad'), 6);
        }
      }
    }
  }
});
