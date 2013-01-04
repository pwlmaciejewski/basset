var Result, Sniffer, buster, execError, execSpy, execStdout, path, sandbox, sinon;

buster = require('buster');

sinon = require('sinon');

sandbox = require('sandboxed-module');

path = require('path');

Result = require('../lib/result');

execError = function() {
  return null;
};

execStdout = function() {
  return '{}';
};

execSpy = sinon.spy(function(command, options, callback) {
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
      return this.spy = sinon.spy();
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
      return assert.calledWith(this.spy, error);
    },
    'test result': function() {
      var har;
      har = {
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
      execStdout = function() {
        return JSON.stringify(har);
      };
      this.sniffer.run(this.spy);
      assert.calledWith(this.spy, null);
      return assert(this.spy.getCall(0).args[1].constructor.name === 'Result');
    }
  }
});
