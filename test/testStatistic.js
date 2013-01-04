var Result, Statistic, buster;

buster = require('buster');

Statistic = require('../lib/statistic');

Result = require('../lib/result');

buster.testCase('Statistic test case', {
  setUp: function() {
    var result1, result2;
    this.statistic = new Statistic();
    result1 = new Result({
      onLoad: 2
    });
    result2 = new Result({
      onLoad: 3
    });
    this.statistic.addResult(result1);
    return this.statistic.addResult(result2);
  },
  'test add result': function() {
    return assert.equals(this.statistic.results.length, 2);
  },
  'test constructor properties': function() {
    var stat;
    stat = new Statistic([
      {
        onLoad: 2
      }, {
        onLoad: 3
      }
    ]);
    return assert.equals(stat.results.length, 2);
  },
  'average': {
    setUp: function() {
      return this.average = this.statistic.average();
    },
    'test type': function() {
      return assert.equals(this.average.constructor.name, 'Result');
    },
    'test result': function() {
      return assert.equals(this.statistic.average().onLoad, 2.5);
    },
    'test empty results': function() {
      var statistic;
      statistic = new Statistic();
      return assert.equals(statistic.average().onLoad, 0);
    }
  }
});
