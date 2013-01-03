buster = require 'buster'
Basset = require '../lib/basset'
ReporterFactory = require '../lib/reporterFactory'

buster.testCase 'Basset test case', 
	setUp: ->
		@basset = new Basset

	'options':
		'test default options': ->
			assert.equals Basset.defaultOptions.repeatNum, 1
			assert.equals Basset.defaultOptions.format, 'plain'
			assert.equals Basset.defaultOptions.info, 'short'
			assert.equals Basset.defaultOptions.tmpHarDir, process.cwd()
			assert.equals Basset.defaultOptions.ReporterFactory, ReporterFactory

		'test constructor options': ->
			basset = new Basset
				repeatNum: 3
			assert.equals basset.options.repeatNum, 3

		# 'test invalid reporter': ->
		# 	class FooReporterFactory extends ReporterFactory
				
				
		# 	basset = new Basset

