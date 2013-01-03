var Sniffer, buster, execError, execSpy, execStdout, path, sandbox, sinon;

buster = require('buster');

sinon = require('sinon');

sandbox = require('sandboxed-module');

path = require('path');

execError = function() {
  return null;
};

execStdout = function() {
  return '{}';
};

execSpy = sinon.spy(function(command, callback) {
  if (callback == null) {
    callback = function() {};
  }
  return callback(execError(), execStdout());
});

Sniffer = sandbox.require('../lib/sniffer', {
  requires: {
    child_process: {
      exec: execSpy
    }
  }
});

buster.testCase('Sniffer test case', {
  setUp: function() {
    execError = function() {
      return null;
    };
    execStdout = function() {
      return '{}';
    };
    this.url = 'http://example.com';
    return this.sniffer = new Sniffer(this.url);
  },
  'first argument (url)': {
    'test is required': function() {
      var _this = this;
      return assert.exception(function() {
        return new Sniffer();
      });
    },
    'test is a string': function() {
      var _this = this;
      return assert.exception(function() {
        return new Sniffer({});
      });
    }
  },
  'run': {
    setUp: function() {
      this.spy = sinon.spy();
      this.getResultsFromHarSpy = sinon.spy();
      return sinon.stub(Sniffer, 'getResultsFromHar');
    },
    tearDown: function() {
      return Sniffer.getResultsFromHar.restore();
    },
    'test runs phantomjs': function() {
      var netsniffPath, phantomjsExecCommand;
      netsniffPath = path.resolve(__dirname, '../vendor/netsniff.js');
      phantomjsExecCommand = 'phantomjs ' + netsniffPath + ' ' + this.url;
      this.sniffer.run();
      return assert.calledWith(execSpy, phantomjsExecCommand);
    },
    'test calls callback': function() {
      this.sniffer.run(this.spy);
      return assert.called(this.spy);
    },
    'test error': function() {
      var error;
      error = new Error('Foo error');
      execError = function() {
        return error;
      };
      this.sniffer.run(this.spy);
      assert.calledWith(this.spy, error);
      return refute.called(Sniffer.getResultsFromHar);
    },
    'test result': function() {
      this.sniffer.run();
      return assert.called(Sniffer.getResultsFromHar);
    }
  },
  'getResultsFromHar': {
    setUp: function() {
      var har;
      har = {
        log: {
          pages: [
            {
              onLoad: 1937
            }
          ],
          entries: []
        }
      };
      return this.result = Sniffer.getResultsFromHar(har);
    },
    'test page load': function() {
      return assert.equals(this.result.onLoad, 1937);
    }
  }
});
