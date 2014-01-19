assert = require('chai').assert
HarResult = require '../lib/harResult'

suite 'Result test case', ->
	setup ->
		@result = new HarResult()
		@har = require './fixture/bbc.har.json'

	suite 'is valid har', ->
		test 'valid', ->
			assert.ok HarResult.isValidHar(@har)

		test 'invalid har', ->
			assert.notOk HarResult.isValidHar({})

	suite 'collect values from har', ->
		setup ->
			@values = HarResult.collectValuesFromHar @har

		test 'onLoad', ->
			assert.equal @values.onLoad, 3124

		test 'requestsNum', ->
			assert.equal @values.requestsNum, 81

		test 'htmlRequestsNum', ->
			assert.equal @values.htmlRequestsNum, 3

		test 'cssRequestsNum', ->
			assert.equal @values.cssRequestsNum, 4

		test 'jsRequestsNum', ->
			assert.equal @values.jsRequestsNum, 35

		test 'imgRequestsNum', ->
			assert.equal @values.imgRequestsNum, 39

		test 'otherRequestsNum', ->
			assert.equal @values.otherRequestsNum, 0

	suite 'feed with har', ->
		test 'valid har', ->
			@result.feedWithHar @har
			assert.equal @result.getValue('onLoad'), 3124

		test 'invalid har', ->
			assert.throws =>
				@result.feedWithHar {}