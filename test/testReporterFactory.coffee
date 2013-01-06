buster = require 'buster'
ReporterFactory = require '../lib/reporterFactory'
Reporter = require '../lib/reporter/reporter'

buster.testCase 'Reporter factory test case',

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