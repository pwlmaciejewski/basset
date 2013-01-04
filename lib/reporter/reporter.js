var Basset, Reporter;

Basset = require('../basset');

Reporter = (function() {

  function Reporter() {}

  Reporter.prototype.bind = function(basset) {
    if (!(basset instanceof Basset)) {
      throw new Error('Reporter argument must be a Basset instance');
    }
    basset.on('newTest', this.onNewTest);
    return basset.on('done', this.onDone);
  };

  Reporter.prototype.onNewTest = function() {};

  Reporter.prototype.onDone = function() {};

  return Reporter;

})();

module.exports = Reporter;
