var HarResult, Sniffer, exec, netsnifferPath, path;

exec = require('child_process').exec;

path = require('path');

netsnifferPath = path.resolve(__dirname, '../vendor/netsniff.js');

HarResult = require('./harResult');

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
    return exec('phantomjs ' + netsnifferPath + ' ' + this.url, {
      maxBuffer: 1024 * 1024
    }, function(err, stdout) {
      var har, result;
      try {
        har = JSON.parse(stdout);
      } catch (e) {
        callback(new Error('Unparsable output'));
        return;
      }
      if (err || !HarResult.isValidHar(har)) {
        return callback(err);
      } else {
        result = new HarResult();
        result.feedWithHar(har);
        return callback(null, result);
      }
    });
  };

  return Sniffer;

})();

module.exports = Sniffer;
