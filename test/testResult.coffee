buster = require 'buster'
Result = require '../lib/result'

class FooResult extends Result
	valueNames: ['foo', 'bar', 'baz']

buster.testCase 'Result test case',
	setUp: ->
		@result = new FooResult()

	'creates values object according to valueNames':
		'test get value names': ->
			assert.equals @result.getValueNames(), @result.valueNames
			refute.same @result.getValueNames(), @result.valueNames

		'test all values are initialized to zero': ->
			for name in @result.getValueNames()
				assert.equals @result.getValue(name), 0
			false

	'set value':
		'test valid name': ->
			@result.setValue 'foo', 3
			assert @result.getValue 'foo', 3

		'test invalid name': ->
			assert.exception =>
				@result.setValue 'xxx', 3

	'get value':
		'test valid name': ->
			assert.equals @result.getValue('foo'), 0

		'test invalid name': ->
			assert.exception => 
				@result.getValue 'xyz'

	'test get values': ->
		values = @result.getValues()
		assert.equals values, @result.values
		refute.same values, @result.values

	'test set values': ->
		@result.setValues
			foo: 1
			bar: 2
		assert.equals @result.getValues(),
			foo: 1
			bar: 2
			baz: 0

	'test constructor values': ->
		result = new FooResult
			foo: 1
			bar: 2
		assert.equals result.getValues(),
			foo: 1
			bar: 2
			baz: 0

	'test other Result as a constructor argument': ->
		result1 = new FooResult
			foo: 1
		result2 = new FooResult result1
		assert.equals result2.getValues(),
			foo: 1
			bar: 0
			baz: 0

	'test map values': ->
		ret = @result.mapValues (name, val) ->
			if name == 'foo' then val + 1
			else val + 2
		assert.equals @result.getValues(), { foo: 1, bar: 2, baz: 2 }
		assert.equals ret.constructor.name, 'FooResult'

	'static arithmetic operations':
		'add': ->
			res = FooResult.add {	foo: 1,	bar: 2 }, {	bar: 3, baz: 4 }
			assert.equals res.getValues(), { foo: 1, bar: 5, baz: 4 }

		'substract': ->
			res = FooResult.substract { foo: 3 }, { foo: 1 }
			assert.equals res.getValues(), { foo: 2, bar: 0, baz: 0 }

		'test divide by': ->
			res = FooResult.divideBy { foo: 3 }, 2
			assert.equals res.getValues(), { foo: 1.5, bar: 0, baz: 0 }

		'power': 
			'test zero': ->
				res = FooResult.pow { foo: 5}, 0
				assert res.getValue('foo'), 1

			'test power 2': ->
				res = FooResult.pow { foo: 5 }, 2
				assert res.getValue('foo'), 25

		'test sqrt': ->
			res = FooResult.sqrt { foo: 4 }
			assert.equals res.getValues(), { foo: 2, bar: 0, baz: 0 }
