var HarResult, buster;

buster = require('buster');

HarResult = require('../lib/harResult');

buster.testCase('Result test case', {
  setUp: function() {
    this.result = new HarResult();
    return this.har = require('./fixture/bbc.har.json');
  },
  'is valid har': {
    'test valid': function() {
      return assert(HarResult.isValidHar(this.har));
    },
    'test invalid har': function() {
      return refute(HarResult.isValidHar({}));
    }
  },
  'collect values from har': {
    setUp: function() {
      return this.values = HarResult.collectValuesFromHar(this.har);
    },
    'test onLoad': function() {
      return assert.equals(this.values.onLoad, 3124);
    },
    'test requestsNum': function() {
      return assert.equals(this.values.requestsNum, 81);
    },
    'test htmlRequestsNum': function() {
      return assert.equals(this.values.htmlRequestsNum, 3);
    },
    'test cssRequestsNum': function() {
      return assert.equals(this.values.cssRequestsNum, 4);
    },
    'test jsRequestsNum': function() {
      return assert.equals(this.values.jsRequestsNum, 35);
    },
    'test imgRequestsNum': function() {
      return assert.equals(this.values.imgRequestsNum, 39);
    },
    'test otherRequestsNum': function() {
      return assert.equals(this.values.otherRequestsNum, 0);
    }
  },
  'feed with har': {
    'test valid har': function() {
      this.result.feedWithHar(this.har);
      return assert.equals(this.result.getValue('onLoad'), 3124);
    },
    'test invalid har': function() {
      var _this = this;
      return assert.exception(function() {
        return _this.result.feedWithHar({});
      });
    }
  }
});
