var Basset, Reporter, ReporterFactory, buster;

buster = require('buster');

Basset = require('../lib/basset');

ReporterFactory = require('../lib/reporterFactory');

Reporter = require('../lib/reporter/reporter');

buster.testCase('Basset test case', {
  setUp: function() {
    return this.basset = new Basset;
  },
  'options': {
    'test default options': function() {
      assert.equals(Basset.defaultOptions.repeatNum, 1);
      assert.equals(Basset.defaultOptions.reporter, 'plain');
      assert.equals(Basset.defaultOptions.info, 'short');
      return assert.equals(Basset.defaultOptions.ReporterFactory, ReporterFactory);
    },
    'test constructor options': function() {
      var basset;
      basset = new Basset({
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
        return basset = new Basset({
          ReporterFactory: _this.Factory
        });
      });
    }
  }
});
