Reporter = require './reporter'
clc = require 'cli-color'

class PlainReporter extends Reporter
	constructor: ->
		@done = 0

	onStop: ->
		@done += 1

	onResult: (result) ->
		console.log "#{@done} | onLoad: #{result.getValue('onLoad')} ms"

	onFailure: (error) ->
		console.log error

	onEnd: (results) ->
		avg = results.average()
		deviation = results.deviation()
		console.log ''
		console.log "Average onLoad: #{avg.getValue('onLoad').toFixed(2)} \u00B1 #{deviation.getValue('onLoad').toFixed(2)} ms"

module.exports = PlainReporter