exec = require('child_process').exec
path = require 'path'
netsnifferPath = path.resolve __dirname, '../vendor/netsniff.js'

class Sniffer
	constructor: (url = null) ->
		unless typeof url is 'string' then throw new Error 'URL required'
		@url = url

	run: (callback = ->) ->
		exec 'phantomjs ' + netsnifferPath + ' ' + @url, (err, stdout) =>
			if err then callback err
			else callback null, Sniffer.getResultsFromHar()

Sniffer.getResultsFromHar = (har) ->
	onLoad: har.log.pages[0].onLoad

module.exports = Sniffer