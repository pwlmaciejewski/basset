var Basset, Reporter;

Basset = require('../basset');

Reporter = (function() {

  function Reporter() {}

  Reporter.prototype.bind = function(basset) {
    if (!(basset instanceof Basset)) {
      throw new Error('Reporter argument must be a Basset instance');
    }
    basset.on('start', this.onStart.bind(this));
    basset.on('stop', this.onStop.bind(this));
    basset.on('end', this.onEnd.bind(this));
    basset.on('result', this.onResult.bind(this));
    return basset.on('failure', this.onFailure.bind(this));
  };

  Reporter.prototype.onStart = function() {};

  Reporter.prototype.onStop = function() {};

  Reporter.prototype.onEnd = function() {};

  Reporter.prototype.onResult = function() {};

  Reporter.prototype.onFailure = function() {};

  return Reporter;

})();

module.exports = Reporter;
