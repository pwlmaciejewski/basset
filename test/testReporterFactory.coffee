buster = require 'buster'
ReporterFactory = require '../lib/reporterFactory'
Reporter = require '../lib/reporter/reporter'
PlainReporter = require '../lib/reporter/plain'
JsonReporter = require '../lib/reporter/json'

buster.testCase 'Reporter factory test case', 
	'test default reporters': ->
		assert.equals ReporterFactory.reporters, 
			plain: PlainReporter
			json: JsonReporter

	'create reporter':
		setUp: ->
			@Factory = Object.create ReporterFactory
			@Factory.reporters =
				foo: Reporter

		'test valid reporter': ->
			reporter = @Factory.createReporter 'foo'
			assert reporter instanceof Reporter

		'test invalid reporter': ->
			assert.exception =>
				@Factory.createReporter 'bar'