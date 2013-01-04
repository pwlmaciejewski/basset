var Result, buster;

buster = require('buster');

Result = require('../lib/result');

buster.testCase('Result test case', {
  setUp: function() {
    this.result = new Result();
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
  'test default properties': function() {
    return assert.equals(this.result.onLoad, 0);
  },
  'test constructor properties': function() {
    var result;
    result = new Result({
      onLoad: 3
    });
    return assert.equals(result.onLoad, 3);
  },
  'is valid har': {
    'test valid': function() {
      return assert(Result.isValidHar(this.har));
    },
    'test invalid har': function() {
      return refute(Result.isValidHar({}));
    }
  },
  'test feedWithHar': function() {
    this.result.feedWithHar(this.har);
    return assert.equals(this.result.onLoad, 1937);
  },
  'add': {
    'basic example': {
      setUp: function() {
        var res1, res2;
        res1 = new Result({
          onLoad: 3
        });
        res2 = new Result({
          onLoad: 2
        });
        return this.res = Result.add(res1, res2);
      },
      'test type': function() {
        return assert.equals(this.res.constructor.name, 'Result');
      },
      'test value': function() {
        return assert.equals(this.res.onLoad, 5);
      }
    },
    'constructor values': function() {
      var res;
      res = Result.add({
        onLoad: 1
      }, {
        onLoad: 2
      });
      return assert.equals(res.onLoad, 3);
    }
  }
});
