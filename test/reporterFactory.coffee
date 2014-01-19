assert = require('chai').assert
ReporterFactory = require '../lib/reporterFactory'
Reporter = require '../lib/reporter/reporter'

suite 'Reporter factory test case', ->
	suite 'create reporter', ->
		setup ->
			@Factory = Object.create ReporterFactory
			@Factory.reporters =
				foo: Reporter

		test 'valid reporter', ->
			reporter = @Factory.createReporter 'foo'
			assert.instanceOf reporter,  Reporter

		test 'invalid reporter', ->
			assert.throws =>
				@Factory.createReporter 'bar'