var Result;

Result = (function() {

  Result.prototype.valueNames = [];

  Result.prototype.getValueNames = function() {
    return this.valueNames.slice();
  };

  function Result(values) {
    var name, _i, _len, _ref;
    if (values == null) {
      values = {};
    }
    this.values = {};
    _ref = this.getValueNames();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      this.values[name] = 0;
    }
    if (values instanceof Result) {
      this.setValues(values.getValues());
    } else {
      this.setValues(values);
    }
  }

  Result.prototype.getValue = function(name) {
    if (!this.hasValue(name)) {
      throw new Error("Unvalid value name '" + name + "'");
    }
    return this.values[name];
  };

  Result.prototype.setValue = function(name, value) {
    if (!this.hasValue(name)) {
      throw new Error("Unvalid value name '" + name + "'");
    }
    return this.values[name] = value;
  };

  Result.prototype.hasValue = function(name) {
    return name in this.values;
  };

  Result.prototype.getValues = function() {
    var name, res, value, _ref;
    res = {};
    _ref = this.values;
    for (name in _ref) {
      value = _ref[name];
      res[name] = value;
    }
    return res;
  };

  Result.prototype.setValues = function(values) {
    var name, value, _results;
    _results = [];
    for (name in values) {
      value = values[name];
      _results.push(this.setValue(name, value));
    }
    return _results;
  };

  Result.prototype.mapValues = function(mapper) {
    var name, value, _ref;
    _ref = this.getValues();
    for (name in _ref) {
      value = _ref[name];
      this.setValue(name, mapper(name, value));
    }
    return this;
  };

  return Result;

})();

Result.add = function(first, second) {
  first = new this(first);
  second = new this(second);
  return new this().mapValues(function(name) {
    return first.getValue(name) + second.getValue(name);
  });
};

Result.divideBy = function(first, divider) {
  first = new this(first);
  return new this().mapValues(function(name) {
    return first.getValue(name) / divider;
  });
};

Result.pow = function(first, power) {
  first = new this(first);
  return new this().mapValues(function(name) {
    if (power === 0) {
      return 1;
    } else {
      return Math.pow(first.getValue(name), power);
    }
  });
};

module.exports = Result;
