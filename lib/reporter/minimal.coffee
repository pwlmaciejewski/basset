Reporter = require './reporter'
clc = require 'cli-color'

class PlainReporter extends Reporter
	constructor: ->
		@done = 0
		@columnWidth = 50

	onStop: ->
		if @done and @done % @columnWidth is 0 then console.log ''		
		@done += 1

	onResult: ->
		process.stdout.write clc.greenBright.bold('.')

	onFailure: ->
		process.stdout.write clc.redBright.bold('F')

	onEnd: (results) ->
		avg = results.average()
		deviation = results.deviation()
		console.log ''
		console.log "Average onLoad: #{avg.getValue('onLoad')} \u00B1 #{deviation.getValue('onLoad').toFixed(2)} ms"

module.exports = PlainReporter