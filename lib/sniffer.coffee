exec = require('child_process').exec
path = require 'path'
netsnifferPath = path.resolve __dirname, '../vendor/netsniff.js'
Result = require './result'

class Sniffer
	constructor: (url = null) ->
		unless typeof url is 'string' then throw new Error 'URL required'
		@url = url

	run: (callback = ->) ->
		exec 'phantomjs ' + netsnifferPath + ' ' + @url, {
			maxBuffer: 1024 * 1024 
		}, (err, stdout) =>
			har = JSON.parse(stdout)
			if err or not Result.isValidHar(har) 
				callback err
			else
				result = new Result()
				result.feedWithHar har
				callback null, result

module.exports = Sniffer