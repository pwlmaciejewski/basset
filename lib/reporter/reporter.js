var Basset, Reporter;

Basset = require('../basset');

Reporter = (function() {

  function Reporter() {}

  Reporter.prototype.bind = function(basset) {
    if (!(basset instanceof Basset)) {
      throw new Error('Reporter argument must be a Basset instance');
    }
    basset.on('begin', this.onBegin.bind(this));
    basset.on('end', this.onEnd.bind(this));
    basset.on('testStart', this.onTestStart.bind(this));
    basset.on('testStop', this.onTestStop.bind(this));
    basset.on('result', this.onResult.bind(this));
    return basset.on('failure', this.onFailure.bind(this));
  };

  Reporter.prototype.onBegin = function() {};

  Reporter.prototype.onEnd = function() {};

  Reporter.prototype.onTestStart = function() {};

  Reporter.prototype.onTestStop = function() {};

  Reporter.prototype.onResult = function() {};

  Reporter.prototype.onFailure = function() {};

  return Reporter;

})();

module.exports = Reporter;
