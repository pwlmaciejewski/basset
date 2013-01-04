ReporterFactory = require './reporterFactory'
Sniffer = require './sniffer'

class Basset
	constructor: (url = null, options = {}) ->
		unless typeof url is 'string' then throw new Error 'URL required'

		@url = url
		@options = @createOptions options
		@sniffers = @createSniffers()
		@reporter = @options.ReporterFactory.createReporter @options.reporter

	createOptions: (options = {}) ->
		res = {}
		for name, value of Basset.defaultOptions
			res[name] = value
		for name, value of options
			res[name] = value
		res

	createSniffers: ->
		res = []
		for i in [0...@options.repeatNum]
			res.push @createSniffer()
		res

	createSniffer: ->
		new @options.Sniffer @url

	getSniffers: ->
		return @sniffers

	sniff: (callback) ->
		for sniffer in @getSniffers()
			sniffer.run ->
		callback()

Basset.defaultOptions =
	repeatNum: 1
	reporter: 'plain'
	info: 'short'
	ReporterFactory: ReporterFactory
	Sniffer: Sniffer

module.exports = Basset