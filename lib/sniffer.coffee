exec = require('child_process').exec
path = require 'path'
netsnifferPath = path.resolve __dirname, '../vendor/netsniff.js'
HarResult = require './harResult'

class Sniffer
    constructor: (url = null) ->
        unless typeof url is 'string' then throw new Error 'URL required'
        @url = url

    run: (callback = ->) ->
        exec 'phantomjs ' + netsnifferPath + ' ' + @url, {
            maxBuffer: 1024 * 1024
        }, (err, stdout) =>
            try
                har = JSON.parse(stdout)
            catch e
                callback new Error 'Unparsable output'
                return

            if err or not HarResult.isValidHar(har)
                callback err
            else
                result = new HarResult()
                result.feedWithHar har
                callback null, result

module.exports = Sniffer