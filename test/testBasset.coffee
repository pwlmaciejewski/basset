buster = require 'buster'
Basset = require '../lib/basset'
ReporterFactory = require '../lib/reporterFactory'
Reporter = require '../lib/reporter/reporter'

buster.testCase 'Basset test case', 
	setUp: ->
		@basset = new Basset

	'options':
		'test default options': ->
			assert.equals Basset.defaultOptions.repeatNum, 1
			assert.equals Basset.defaultOptions.reporter, 'plain'
			assert.equals Basset.defaultOptions.info, 'short'
			assert.equals Basset.defaultOptions.ReporterFactory, ReporterFactory

		'test constructor options': ->
			basset = new Basset
				repeatNum: 3
			assert.equals basset.options.repeatNum, 3

		'test invalid reporter': ->
			@Factory = Object.create ReporterFactory
			@Factory.reporters = []
			assert.exception =>
				basset = new Basset
					ReporterFactory: @Factory

