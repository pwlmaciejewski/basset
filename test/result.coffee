assert = require('chai').assert
Result = require '../lib/result'

class FooResult extends Result
	valueNames: ['foo', 'bar', 'baz']

suite 'Result', ->
	setup ->
		@result = new FooResult()

	suite 'creates values object according to valueNames', ->
		test 'get value names', ->
			assert.deepEqual @result.getValueNames(), @result.valueNames
			assert.notEqual @result.getValueNames(), @result.valueNames

		test 'all values are initialized to zero', ->
			for name in @result.getValueNames()
				assert.equal @result.getValue(name), 0
			false

	suite 'set value', ->
		test 'valid name', ->
			@result.setValue 'foo', 3
			assert.ok @result.getValue 'foo', 3

		test 'invalid name', ->
			assert.throws =>
				@result.setValue 'xxx', 3

	suite 'get value', ->
		test 'valid name', ->
			assert.equal @result.getValue('foo'), 0

		test 'invalid name', ->
			assert.throws =>
				@result.getValue 'xyz'

	test 'get values', ->
		values = @result.getValues()
		assert.deepEqual values, @result.values
		assert.notEqual values, @result.values

	test 'set values', ->
		@result.setValues
			foo: 1
			bar: 2
		assert.deepEqual @result.getValues(),
			foo: 1
			bar: 2
			baz: 0

	test 'constructor values', ->
		result = new FooResult
			foo: 1
			bar: 2
		assert.deepEqual result.getValues(),
			foo: 1
			bar: 2
			baz: 0

	test 'other Result as a constructor argument', ->
		result1 = new FooResult
			foo: 1
		result2 = new FooResult result1
		assert.deepEqual result2.getValues(),
			foo: 1
			bar: 0
			baz: 0

	test 'map values', ->
		ret = @result.mapValues (name, val) ->
			if name == 'foo' then val + 1
			else val + 2
		assert.deepEqual @result.getValues(), { foo: 1, bar: 2, baz: 2 }
		assert.deepEqual ret.constructor.name, 'FooResult'

	suite 'static arithmetic operations', ->
		test 'add', ->
			res = FooResult.add {	foo: 1,	bar: 2 }, {	bar: 3, baz: 4 }
			assert.deepEqual res.getValues(), { foo: 1, bar: 5, baz: 4 }

		test 'substract', ->
			res = FooResult.substract { foo: 3 }, { foo: 1 }
			assert.deepEqual res.getValues(), { foo: 2, bar: 0, baz: 0 }

		test 'divide by', ->
			res = FooResult.divideBy { foo: 3 }, 2
			assert.deepEqual res.getValues(), { foo: 1.5, bar: 0, baz: 0 }

		suite 'power', ->
			test 'zero', ->
				res = FooResult.pow { foo: 5}, 0
				assert.equal res.getValue('foo'), 1

			test 'power 2', ->
				res = FooResult.pow { foo: 5 }, 2
				assert.equal res.getValue('foo'), 25

		test 'sqrt', ->
			res = FooResult.sqrt { foo: 4 }
			assert.deepEqual res.getValues(), { foo: 2, bar: 0, baz: 0 }
