var Sniffer, exec, netsnifferPath, path;

exec = require('child_process').exec;

path = require('path');

netsnifferPath = path.resolve(__dirname, '../vendor/netsniff.js');

Sniffer = (function() {

  function Sniffer(url) {
    if (url == null) {
      url = null;
    }
    if (typeof url !== 'string') {
      throw new Error('URL required');
    }
    this.url = url;
  }

  Sniffer.prototype.run = function(callback) {
    var _this = this;
    if (callback == null) {
      callback = function() {};
    }
    return exec('phantomjs ' + netsnifferPath + ' ' + this.url, function(err, stdout) {
      if (err) {
        return callback(err);
      } else {
        return callback(null, Sniffer.getResultsFromHar());
      }
    });
  };

  return Sniffer;

})();

Sniffer.getResultsFromHar = function(har) {
  return {
    onLoad: har.log.pages[0].onLoad
  };
};

module.exports = Sniffer;
