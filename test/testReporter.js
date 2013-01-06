var Basset, Reporter, buster, sinon;

buster = require('buster');

sinon = require('sinon');

Reporter = require('../lib/reporter/reporter');

Basset = require('../lib/basset');

buster.testCase('Reporter test case', {
  setUp: function() {
    this.basset = new Basset('http://example.com');
    return this.reporter = new Reporter();
  },
  'bind': {
    setUp: function() {
      var _this = this;
      return this.testBond = function(event, methodName) {
        sinon.stub(_this.reporter, methodName);
        _this.reporter.bind(_this.basset);
        _this.basset.emit(event);
        return assert.called(_this.reporter[methodName]);
      };
    },
    'test arg must be a Basset instance': function() {
      var _this = this;
      return assert.exception(function() {
        return _this.reporter.bind({});
      });
    },
    'test call start': function() {
      return this.testBond('testStart', 'onTestStart');
    },
    'test call stop': function() {
      return this.testBond('testStop', 'onTestStop');
    },
    'test call begin': function() {
      return this.testBond('begin', 'onBegin');
    },
    'test call end': function() {
      return this.testBond('end', 'onEnd');
    },
    'test call result': function() {
      return this.testBond('result', 'onResult');
    },
    'test call failure': function() {
      return this.testBond('failure', 'onFailure');
    }
  }
});
