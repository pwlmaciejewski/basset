var HarResult, Statistic, buster;

buster = require('buster');

Statistic = require('../lib/statistic');

HarResult = require('../lib/harResult');

buster.testCase('Statistic test case', {
  setUp: function() {
    var result1, result2;
    this.statistic = new Statistic();
    result1 = new HarResult({
      onLoad: 2
    });
    result2 = new HarResult({
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
      return assert.equals(this.average.constructor.name, 'HarResult');
    },
    'test result': function() {
      return assert.equals(this.statistic.average().getValue('onLoad'), 2.5);
    },
    'test empty results': function() {
      var statistic;
      statistic = new Statistic();
      return assert.equals(statistic.average().getValue('onLoad'), 0);
    }
  },
  'deviation': {
    setUp: function() {
      return this.deviation = this.statistic.deviation();
    }
  }
});
