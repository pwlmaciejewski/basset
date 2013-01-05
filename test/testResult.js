var FooResult, Result, buster,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

buster = require('buster');

Result = require('../lib/result');

FooResult = (function(_super) {

  __extends(FooResult, _super);

  function FooResult() {
    return FooResult.__super__.constructor.apply(this, arguments);
  }

  FooResult.prototype.valueNames = ['foo', 'bar', 'baz'];

  return FooResult;

})(Result);

buster.testCase('Result test case', {
  setUp: function() {
    return this.result = new FooResult();
  },
  'creates values object according to valueNames': {
    'test get value names': function() {
      assert.equals(this.result.getValueNames(), this.result.valueNames);
      return refute.same(this.result.getValueNames(), this.result.valueNames);
    },
    'test all values are initialized to zero': function() {
      var name, _i, _len, _ref;
      _ref = this.result.getValueNames();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        assert.equals(this.result.getValue(name), 0);
      }
      return false;
    }
  },
  'set value': {
    'test valid name': function() {
      this.result.setValue('foo', 3);
      return assert(this.result.getValue('foo', 3));
    },
    'test invalid name': function() {
      var _this = this;
      return assert.exception(function() {
        return _this.result.setValue('xxx', 3);
      });
    }
  },
  'get value': {
    'test valid name': function() {
      return assert.equals(this.result.getValue('foo'), 0);
    },
    'test invalid name': function() {
      var _this = this;
      return assert.exception(function() {
        return _this.result.getValue('xyz');
      });
    }
  },
  'test get values': function() {
    var values;
    values = this.result.getValues();
    assert.equals(values, this.result.values);
    return refute.same(values, this.result.values);
  },
  'test set values': function() {
    this.result.setValues({
      foo: 1,
      bar: 2
    });
    return assert.equals(this.result.getValues(), {
      foo: 1,
      bar: 2,
      baz: 0
    });
  },
  'test constructor values': function() {
    var result;
    result = new FooResult({
      foo: 1,
      bar: 2
    });
    return assert.equals(result.getValues(), {
      foo: 1,
      bar: 2,
      baz: 0
    });
  },
  'test other Result as a constructor argument': function() {
    var result1, result2;
    result1 = new FooResult({
      foo: 1
    });
    result2 = new FooResult(result1);
    return assert.equals(result2.getValues(), {
      foo: 1,
      bar: 0,
      baz: 0
    });
  },
  'test map values': function() {
    var ret;
    ret = this.result.mapValues(function(name, val) {
      if (name === 'foo') {
        return val + 1;
      } else {
        return val + 2;
      }
    });
    assert.equals(this.result.getValues(), {
      foo: 1,
      bar: 2,
      baz: 2
    });
    return assert.equals(ret.constructor.name, 'FooResult');
  },
  'static arithmetic operations': {
    'add': function() {
      var res;
      res = FooResult.add({
        foo: 1,
        bar: 2
      }, {
        bar: 3,
        baz: 4
      });
      return assert.equals(res.getValues(), {
        foo: 1,
        bar: 5,
        baz: 4
      });
    },
    'test divide by': function() {
      var res;
      res = FooResult.divideBy({
        foo: 3
      }, 2);
      return assert.equals(res.getValues(), {
        foo: 1.5,
        bar: 0,
        baz: 0
      });
    },
    'power': {
      'test zero': function() {
        var res;
        res = FooResult.pow({
          foo: 5
        }, 0);
        return assert(res.getValue('foo'), 1);
      },
      'test power 2': function() {
        var res;
        res = FooResult.pow({
          foo: 5
        }, 2);
        return assert(res.getValue('foo'), 25);
      }
    }
  }
});
