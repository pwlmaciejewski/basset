buster = require 'buster'
HarResult = require '../lib/harResult'

buster.testCase 'Result test case',
	setUp: ->
		@result = new HarResult()
		@har = require './fixture/bbc.har.json'

	'is valid har':
		'test valid': ->
			assert HarResult.isValidHar(@har)

		'test invalid har': ->
			refute HarResult.isValidHar({})

	'collect values from har':
		setUp: ->
			@values = HarResult.collectValuesFromHar @har

		'test onLoad': ->
			assert.equals @values.onLoad, 3124

		'test requestsNum': ->
			assert.equals @values.requestsNum, 81

		'test htmlRequestsNum': ->
			assert.equals @values.htmlRequestsNum, 3

		'test cssRequestsNum': ->
			assert.equals @values.cssRequestsNum, 4

		'test jsRequestsNum': ->
			assert.equals @values.jsRequestsNum, 35

		'test imgRequestsNum': ->
			assert.equals @values.imgRequestsNum, 39

		'test otherRequestsNum': ->
			assert.equals @values.otherRequestsNum, 0

	'feed with har':
		'test valid har': ->
			@result.feedWithHar @har
			assert.equals @result.getValue('onLoad'), 3124

		'test invalid har': ->
			assert.exception =>
				@result.feedWithHar {}

