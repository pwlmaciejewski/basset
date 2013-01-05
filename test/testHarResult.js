var HarResult, buster;

buster = require('buster');

HarResult = require('../lib/harResult');

buster.testCase('Result test case', {
  setUp: function() {
    this.result = new HarResult();
    return this.har = {
      log: {
        pages: [
          {
            pageTimings: {
              onLoad: 1937
            }
          }
        ],
        entries: []
      }
    };
  },
  'is valid har': {
    'test valid': function() {
      return assert(HarResult.isValidHar(this.har));
    },
    'test invalid har': function() {
      return refute(HarResult.isValidHar({}));
    }
  },
  'test collect values from har': function() {
    var values;
    values = HarResult.collectValuesFromHar(this.har);
    return assert.equals(values, {
      onLoad: 1937
    });
  },
  'feed with har': {
    'test valid har': function() {
      this.result.feedWithHar(this.har);
      return assert.equals(this.result.getValue('onLoad'), 1937);
    },
    'test invalid har': function() {
      var _this = this;
      return assert.exception(function() {
        return _this.result.feedWithHar({});
      });
    }
  }
});
