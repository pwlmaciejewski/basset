buster = require 'buster'
sinon = require 'sinon'
sandbox = require 'sandboxed-module'
path = require 'path'
HarResult = require '../lib/harResult'

execError = -> null
execStdout = -> '{}'
execSpy = sinon.spy (command, options, callback = ->) ->
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

		'test result': ->
			har = 
				log:
					pages: [
						pageTimings:
							onLoad: 1937
					],
					entries: []
			execStdout = ->
				JSON.stringify har
			@sniffer.run @spy
			assert.calledWith @spy, null
			assert @spy.getCall(0).args[1].constructor.name is 'HarResult'

		'test unparsable stdout': ->
			execStdout = ->
				'!@#$%'
			@sniffer.run @spy
			assert.equals @spy.getCall(0).args[0].constructor.name, 'Error'