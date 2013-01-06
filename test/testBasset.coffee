startbuster = require 'buster'
sinon = require 'sinon'
sandbox = require 'sandboxed-module'
Sniffer = require '../lib/sniffer'
Basset = require '../lib/basset'
HarResult = require '../lib/harResult'

buster.testCase 'Basset test case', 
	setUp: ->
		@basset = new Basset 'http://example.com'
			repeatNum: 3

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
				repeatNum: 5
			assert.equals basset.options.repeatNum, 5

	'test get sniffers': ->
		assert.equals @basset.getSniffers().length, 3

	'sniff':
		setUp: ->
			for sniffer, index in @basset.getSniffers()
				do (sniffer, index) =>
					sniffer.runCallback = sinon.spy()
					sinon.stub sniffer, 'run', (callback = ->) =>
						setTimeout =>
							sniffer.runCallback()
							if index == 0 then callback null, new HarResult({ onLoad: 4 })
							else if index == 1 then callback null, new HarResult({ onLoad: 8 })
							else callback new Error 'Something gone wrong'
						, 10

		'run':
			'test all sniffers were called': (done) ->
				@basset.on 'end', =>
					for sniffer in @basset.getSniffers()
						assert.called sniffer.run
					done()
				@basset.sniff()

			'test all sniffers were called with callback': (done) ->
				@basset.on 'end', =>
					for sniffer in @basset.getSniffers()
						assert.equals typeof sniffer.run.getCall(0).args[0], 'function'
					done()
				@basset.sniff()

			'test call order': (done) ->
				@basset.on 'end', =>
					lastSniffer = null
					for sniffer in @basset.getSniffers()
						if lastSniffer then assert sniffer.run.calledAfter(lastSniffer.run)
						lastSniffer = sniffer
					done()
				@basset.sniff()
		
		'run callback':
			'test callbacks were called': (done) ->
				@basset.on 'end', =>
					for sniffer in @basset.getSniffers()
						assert.called sniffer.runCallback
					done()
				@basset.sniff()

			'test were called in series': (done) ->
				@basset.on 'end', =>
					sniffers = @basset.getSniffers()
					assert sniffers[1].run.calledAfter(sniffers[0].runCallback)
					done()
				@basset.sniff()

		'events':
			setUp: ->
				@spy = sinon.spy()

			'test begin': (done) ->
				@basset.on 'begin', @spy
				@basset.on 'end', =>
					assert.calledOnce @spy
					done()
				@basset.sniff()

			'test start': (done) ->
				@basset.on 'testStart', @spy
				@basset.on 'end', =>
					assert.calledThrice @spy
					done()
				@basset.sniff()

			'test stop': (done) ->
				@basset.on 'testStop', @spy
				@basset.on 'end', =>
					assert.calledThrice @spy
					done()
				@basset.sniff()

			'test failure': 
				setUp: (done) ->
					@basset.on 'failure', @spy
					@basset.on 'end', (err) =>
						done()
					@basset.sniff()

				'test called once': ->
					assert.calledOnce @spy

				'test called with error': ->
					err = @spy.getCall(0).args[0]
					assert err instanceof Error


			'test result': 
				setUp: (done) ->
					@basset.on 'result', @spy
					@basset.on 'end', =>
						done()
					@basset.sniff()

				'test called twice': ->
					assert.calledTwice @spy

				'test called with result': ->
					res = @spy.getCall(0).args[0]
					assert.equals res.constructor.name, 'HarResult'
					assert.equals res.getValue('onLoad'), 4

			'end':
				setUp: (done) ->
					@basset.on 'end', (stat) =>
						@stat = stat
						done()
					@basset.sniff()

				'test type': ->
					assert.equals @stat.constructor.name, 'Statistic'

				'test result': ->
					assert.equals @stat.average().getValue('onLoad'), 6