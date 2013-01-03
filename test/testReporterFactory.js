var Reporter, ReporterFactory, buster;

buster = require('buster');

ReporterFactory = require('../lib/reporterFactory');

Reporter = require('../lib/reporter/reporter');

buster.testCase('Reporter factory test case', {
  setUp: function() {
    return ReporterFactory.reporters = {
      foo: Reporter
    };
  },
  'test create reporter': function() {
    var reporter;
    reporter = ReporterFactory.createReporter('foo');
    return assert(reporter instanceof Reporter);
  },
  'test invalid reporter': function() {
    var _this = this;
    return assert.exception(function() {
      return ReporterFactory.createReporter('bar');
    });
  }
});
