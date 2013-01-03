var Basset, ReporterFactory, buster;

buster = require('buster');

Basset = require('../lib/basset');

ReporterFactory = require('../lib/reporterFactory');

buster.testCase('Basset test case', {
  setUp: function() {
    return this.basset = new Basset;
  },
  'options': {
    'test default options': function() {
      assert.equals(Basset.defaultOptions.repeatNum, 1);
      assert.equals(Basset.defaultOptions.format, 'plain');
      assert.equals(Basset.defaultOptions.info, 'short');
      assert.equals(Basset.defaultOptions.tmpHarDir, process.cwd());
      return assert.equals(Basset.defaultOptions.ReporterFactory, ReporterFactory);
    },
    'test constructor options': function() {
      var basset;
      basset = new Basset({
        repeatNum: 3
      });
      return assert.equals(basset.options.repeatNum, 3);
    }
  }
});
