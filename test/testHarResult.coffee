buster = require 'buster'
HarResult = require '../lib/harResult'

buster.testCase 'Result test case',
	setUp: ->
		@result = new HarResult()
		@har = 
			log:
				pages: [
					pageTimings:
						onLoad: 1937
				],
				entries: [] 

	'is valid har':
		'test valid': ->
			assert HarResult.isValidHar(@har)

		'test invalid har': ->
			refute HarResult.isValidHar({})

	'test collect values from har': ->
		values = HarResult.collectValuesFromHar @har
		assert.equals values,
			onLoad: 1937

	'feed with har':
		'test valid har': ->
			@result.feedWithHar @har
			assert.equals @result.getValue('onLoad'), 1937

		'test invalid har': ->
			assert.exception =>
				@result.feedWithHar {}

