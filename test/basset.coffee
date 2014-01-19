assert = require('chai').assert
sinon = require 'sinon'
sandbox = require 'sandboxed-module'
Sniffer = require '../lib/sniffer'
Basset = require '../lib/basset'
HarResult = require '../lib/harResult'

suite 'Basset', ->
	setup ->
		@basset = new Basset 'http://example.com',
			repeatNum: 3

	suite 'first argument (url)', ->
		test 'test is required', ->
			assert.throw =>
				new Basset()

		test 'test is a string', ->
			assert.throw =>
				new Basset {}

	suite 'options', ->
		test 'default options', ->
			assert.equal Basset.defaultOptions.repeatNum, 1

		test 'constructor options', ->
			basset = new Basset 'http://example.com',
				repeatNum: 5
			assert.equal basset.options.repeatNum, 5

	test 'get sniffers', ->
		assert.equal @basset.getSniffers().length, 3

	suite 'sniff', ->
		setup ->
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

		suite 'run', ->
			test 'all sniffers were called', (done) ->
				@basset.on 'end', =>
					for sniffer in @basset.getSniffers()
						assert.ok sniffer.run.called
					done()
				@basset.sniff()

			test 'all sniffers were called with callback', (done) ->
				@basset.on 'end', =>
					for sniffer in @basset.getSniffers()
						assert.equal typeof sniffer.run.getCall(0).args[0], 'function'
					done()
				@basset.sniff()

			test 'call order', (done) ->
				@basset.on 'end', =>
					lastSniffer = null
					for sniffer in @basset.getSniffers()
						if lastSniffer then assert.ok sniffer.run.calledAfter(lastSniffer.run)
						lastSniffer = sniffer
					done()
				@basset.sniff()

		suite 'run callback', ->
			test 'callbacks were called', (done) ->
				@basset.on 'end', =>
					for sniffer in @basset.getSniffers()
						assert.ok sniffer.runCallback.called
					done()
				@basset.sniff()

			test 'were called in series', (done) ->
				@basset.on 'end', =>
					sniffers = @basset.getSniffers()
					assert.ok sniffers[1].run.calledAfter(sniffers[0].runCallback)
					done()
				@basset.sniff()

		suite 'events', ->
			setup ->
				@spy = sinon.spy()

			test 'begin', (done) ->
				@basset.on 'begin', @spy
				@basset.on 'end', =>
					assert.ok @spy.calledOnce
					done()
				@basset.sniff()

			test 'start', (done) ->
				@basset.on 'testStart', @spy
				@basset.on 'end', =>
					assert.ok @spy.calledThrice
					done()
				@basset.sniff()

			test 'stop', (done) ->
				@basset.on 'testStop', @spy
				@basset.on 'end', =>
					assert.ok @spy.calledThrice
					done()
				@basset.sniff()

			suite 'failure', ->
				setup (done) ->
					@basset.on 'failure', @spy
					@basset.on 'end', (err) =>
						done()
					@basset.sniff()

				test 'called once', ->
					assert @spy.calledOnce

				test 'called with error', ->
					err = @spy.getCall(0).args[0]
					assert.instanceOf err, Error

			suite 'result', ->
				setup (done) ->
					@basset.on 'result', @spy
					@basset.on 'end', =>
						done()
					@basset.sniff()

				test 'called twice', ->
					assert @spy.calledTwice

				test 'called with result', ->
					res = @spy.getCall(0).args[0]
					assert.equal res.constructor.name, 'HarResult'
					assert.equal res.getValue('onLoad'), 4

			suite 'end', ->
				setup (done) ->
					@basset.on 'end', (stat) =>
						@stat = stat
						done()
					@basset.sniff()

				test 'type', ->
					assert.equal @stat.constructor.name, 'Statistic'

				test 'result', ->
					assert.equal @stat.average().getValue('onLoad'), 6