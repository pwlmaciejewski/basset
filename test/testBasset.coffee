buster = require 'buster'
sinon = require 'sinon'
sandbox = require 'sandboxed-module'
ReporterFactory = require '../lib/reporterFactory'
Reporter = require '../lib/reporter/reporter'
Sniffer = require '../lib/sniffer'
Basset = require '../lib/basset'

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

		'test constructor options': ->
			basset = new Basset 'http://example.com',
				repeatNum: 3
			assert.equals basset.options.repeatNum, 3

	'test get sniffers': ->
		assert.equals @basset.getSniffers().length, 2

	'sniff':
		setUp: ->
			for sniffer, index in @basset.getSniffers()
				do (sniffer, index) =>
					sniffer.runCallback = sinon.spy()
					sinon.stub sniffer, 'run', (callback = ->) =>
						setTimeout =>
							sniffer.runCallback()
							if index == 0 then callback null,
								onLoad: 4
							else callback null, 
								onLoad: 8
						, 10

		'run':
			'test all sniffers were called': (done) ->
				@basset.on 'done', =>
					for sniffer in @basset.getSniffers()
						assert.called sniffer.run
					done()
				@basset.sniff()

			'test all sniffers were called with callback': (done) ->
				@basset.on 'done', =>
					for sniffer in @basset.getSniffers()
						assert.equals typeof sniffer.run.getCall(0).args[0], 'function'
					done()
				@basset.sniff()

			'test call order': (done) ->
				@basset.on 'done', =>
					lastSniffer = null
					for sniffer in @basset.getSniffers()
						if lastSniffer then assert sniffer.run.calledAfter(lastSniffer.run)
						lastSniffer = sniffer
					done()
				@basset.sniff()
		
		'run callback':
			'test callbacks were called': (done) ->
				@basset.on 'done', =>
					for sniffer in @basset.getSniffers()
						assert.called sniffer.runCallback
					done()
				@basset.sniff()

			'test were called in series': (done) ->
				@basset.on 'done', =>
					sniffers = @basset.getSniffers()
					assert sniffers[1].run.calledAfter(sniffers[0].runCallback)
					done()
				@basset.sniff()

		'events':
			setUp: ->
				@spy = sinon.spy()

			'test newTest': (done) ->
				@basset.on 'newTest', @spy
				@basset.on 'done', =>
					assert.calledTwice @spy
					done()
				@basset.sniff()

			'done':
				setUp: (done) ->
					@basset.on 'done', (stat) =>
						@stat = stat
						done()
					@basset.sniff()

				'test type': ->
					assert.equals @stat.constructor.name, 'Statistic'

				'test result': ->
					assert.equals @stat.average().onLoad, 6