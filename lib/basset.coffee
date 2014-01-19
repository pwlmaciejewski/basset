Sniffer = require './sniffer'
Statistic = require './statistic'
async = require 'async'
events = require 'events'

class Basset extends events.EventEmitter
    constructor: (url = null, options = {}) ->
        unless typeof url is 'string' then throw new Error 'URL required'
        @url = url
        @options = @createOptions options
        @sniffers = @createSniffers()

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
        new Sniffer @url

    getSniffers: ->
        return @sniffers

    sniff: ->
        statistic = new Statistic()
        runs = @getSniffers().map (sniffer) =>
            (runCallback) =>
                @emit 'testStart'
                sniffer.run (err, result) =>
                    if err then @emit 'failure', err
                    else if result
                        statistic.addResult result
                        @emit 'result', result
                    @emit 'testStop'
                    runCallback()

        @emit 'begin'
        async.series runs, =>
            @emit 'end', statistic

Basset.defaultOptions =
    repeatNum: 1

module.exports = Basset