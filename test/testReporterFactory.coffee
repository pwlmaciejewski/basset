buster = require 'buster'
ReporterFactory = require '../lib/reporterFactory'
Reporter = require '../lib/reporter/reporter'

buster.testCase 'Reporter factory test case', 
	setUp: ->
		ReporterFactory.reporters =
			foo: Reporter

	'test create reporter': ->
		reporter = ReporterFactory.createReporter 'foo'
		assert reporter instanceof Reporter

	'test invalid reporter': ->
		assert.exception =>
			ReporterFactory.createReporter 'bar'
			