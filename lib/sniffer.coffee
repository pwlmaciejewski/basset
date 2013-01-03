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
			else callback null, Sniffer.getResultsFromHar(JSON.parse(stdout))

Sniffer.getResultsFromHar = (har) ->
	onLoad: har.log.pages[0].pageTimings.onLoad

module.exports = Sniffer