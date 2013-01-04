buster = require 'buster'
sinon = require 'sinon'
sandbox = require 'sandboxed-module'
ReporterFactory = require '../lib/reporterFactory'
Reporter = require '../lib/reporter/reporter'
Sniffer = require '../lib/sniffer'

class FooSniffer extends Sniffer
	run: (callback) ->
		setTimeout callback, 1

Basset = sandbox.require '../lib/basset'
	requires:
		sniffer: FooSniffer


buster.testCase 'Basset test case', 
	setUp: ->
		@basset = new Basset 'http://example.com'
			repeatNum: 2

	'first argument (url)':
		'test is required': ->
			assert.exception =>
				new Basset()

		'test is a string': ->
			assert.exception =>
				new Basset {}

	'options':
		'test default options': ->
			assert.equals Basset.defaultOptions.repeatNum, 1
			assert.equals Basset.defaultOptions.reporter, 'plain'
			assert.equals Basset.defaultOptions.info, 'short'

		'test constructor options': ->
			basset = new Basset 'http://example.com',
				repeatNum: 3
			assert.equals basset.options.repeatNum, 3

		'test invalid reporter': ->
			@Factory = Object.create ReporterFactory
			@Factory.reporters = []
			assert.exception =>
				basset = new Basset 'http://example.com',
					ReporterFactory: @Factory
 
	'test get sniffers': ->
		assert.equals @basset.getSniffers().length, 2

	'sniff':
		setUp: ->
			for sniffer in @basset.getSniffers()
				sinon.stub sniffer, 'run'

		'test all sniffers were called': (done) ->
			@basset.sniff =>
				for sniffer in @basset.getSniffers()
					assert.called sniffer.run
				done()

		'test all sniffers were called with callback': (done) ->
			@basset.sniff =>
				for sniffer in @basset.getSniffers()
					assert.equals typeof sniffer.run.callsArg(0).args[0][0], 'function'
				done()

		'test call order': (done) ->
			@basset.sniff =>
				lastSniffer = null
				for sniffer in @basset.getSniffers()
					if lastSniffer then assert sniffer.run.calledAfter(lastSniffer.run)
					lastSniffer = sniffer
				done()

		'test run were in series': (done) ->
			assert false
			done()