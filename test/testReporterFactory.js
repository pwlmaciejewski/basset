var Reporter, ReporterFactory, buster;

buster = require('buster');

ReporterFactory = require('../lib/reporterFactory');

Reporter = require('../lib/reporter/reporter');

buster.testCase('Reporter factory test case', {
  'create reporter': {
    setUp: function() {
      this.Factory = Object.create(ReporterFactory);
      return this.Factory.reporters = {
        foo: Reporter
      };
    },
    'test valid reporter': function() {
      var reporter;
      reporter = this.Factory.createReporter('foo');
      return assert(reporter instanceof Reporter);
    },
    'test invalid reporter': function() {
      var _this = this;
      return assert.exception(function() {
        return _this.Factory.createReporter('bar');
      });
    }
  }
});
