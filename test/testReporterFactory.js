var JsonReporter, PlainReporter, Reporter, ReporterFactory, buster;

buster = require('buster');

ReporterFactory = require('../lib/reporterFactory');

Reporter = require('../lib/reporter/reporter');

PlainReporter = require('../lib/reporter/plain');

JsonReporter = require('../lib/reporter/json');

buster.testCase('Reporter factory test case', {
  'test default reporters': function() {
    return assert.equals(ReporterFactory.reporters, {
      plain: PlainReporter,
      json: JsonReporter
    });
  },
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
