var Basset, Reporter, buster, sinon;

buster = require('buster');

sinon = require('sinon');

Reporter = require('../lib/reporter/reporter');

Basset = require('../lib/basset');

buster.testCase('Reporter test case', {
  setUp: function() {
    this.basset = new Basset('http://example.com');
    return this.reporter = new Reporter();
  },
  'bind': {
    'test arg must be a Basset instance': function() {
      var _this = this;
      return assert.exception(function() {
        return _this.reporter.bind({});
      });
    },
    'test call new test': function() {
      sinon.stub(this.reporter, 'onNewTest');
      this.reporter.bind(this.basset);
      this.basset.emit('newTest');
      return assert.called(this.reporter.onNewTest);
    },
    'test call done': function() {
      sinon.stub(this.reporter, 'onDone');
      this.reporter.bind(this.basset);
      this.basset.emit('done');
      return assert.called(this.reporter.onDone);
    }
  }
});
