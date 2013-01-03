ReporterFactory = require './reporterFactory'

class Basset
	constructor: (url = null, options = {}) ->
		unless typeof url is 'string' then throw new Error 'URL required'

		@options = @createOptions options
		@reporter = @options.ReporterFactory.createReporter @options.reporter

	createOptions: (options = {}) ->
		res = {}
		for name, value of Basset.defaultOptions
			res[name] = value
		for name, value of options
			res[name] = value
		res

Basset.defaultOptions =
	repeatNum: 1
	reporter: 'plain'
	info: 'short'
	ReporterFactory: ReporterFactory

module.exports = Basset