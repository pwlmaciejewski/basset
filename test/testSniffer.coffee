buster = require 'buster'
sinon = require 'sinon'
sandbox = require 'sandboxed-module'
path = require 'path'

execError = -> null
execStdout = -> '{}'
execSpy = sinon.spy (command, callback = ->) ->
	callback(execError(), execStdout())

Sniffer = sandbox.require '../lib/sniffer'
	requires:
		child_process:
			exec: execSpy

buster.testCase 'Sniffer test case',
	setUp: ->
		execError = -> null
		execStdout = -> '{}'
		@url = 'http://example.com'
		@sniffer = new Sniffer @url

	'first argument (url)':
		'test is required': ->
			assert.exception =>
				new Sniffer()

		'test is a string': ->
			assert.exception =>
				new Sniffer {}

	'run':
		setUp: ->
			@spy = sinon.spy() 
			@getResultsFromHarSpy = sinon.spy()
			sinon.stub Sniffer, 'getResultsFromHar'

		tearDown: ->
			Sniffer.getResultsFromHar.restore()

		'test runs phantomjs': ->
			netsniffPath = path.resolve __dirname, '../vendor/netsniff.js'
			phantomjsExecCommand = 'phantomjs ' + netsniffPath + ' ' + @url
			@sniffer.run()
			assert.calledWith execSpy, phantomjsExecCommand

		'test calls callback': ->
			@sniffer.run @spy
			assert.called @spy

		'test error': ->
			error = new Error 'Foo error'
			execError = ->	error
			@sniffer.run @spy
			assert.calledWith @spy, error
			refute.called Sniffer.getResultsFromHar

		'test result': ->
			@sniffer.run()
			assert.called Sniffer.getResultsFromHar

	'getResultsFromHar':
		setUp: ->
			har = 
				log:
					pages: [
						onLoad: 1937
					],
					entries: []
			@result = Sniffer.getResultsFromHar har

		'test page load': ->
			assert.equals @result.onLoad, 1937