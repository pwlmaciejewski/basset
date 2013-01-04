var Result;

Result = (function() {

  function Result(values) {
    if (values == null) {
      values = {};
    }
    this.onLoad = values.onLoad || 0;
  }

  Result.prototype.feedWithHar = function(har) {
    return this.onLoad = har.log.pages[0].pageTimings.onLoad;
  };

  return Result;

})();

Result.isValidHar = function(har) {
  var err;
  try {
    err = new Error('Invalid HAR');
    if (typeof har.log.pages[0].pageTimings.onLoad !== 'number') {
      throw err;
    }
  } catch (e) {
    return false;
  }
  return true;
};

Result.add = function(first, second) {
  var result;
  result = new Result();
  result.onLoad = first.onLoad + second.onLoad;
  return result;
};

module.exports = Result;
