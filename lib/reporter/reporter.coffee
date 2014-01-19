Basset = require '../basset'

class Reporter
    bind: (basset) ->
        unless basset instanceof Basset
            throw new Error 'Reporter argument must be a Basset instance'
        basset.on 'begin', @onBegin.bind @
        basset.on 'end', @onEnd.bind @
        basset.on 'testStart', @onTestStart.bind @
        basset.on 'testStop', @onTestStop.bind @
        basset.on 'result', @onResult.bind @
        basset.on 'failure', @onFailure.bind @

    onBegin: ->

    onEnd: ->

    onTestStart: ->

    onTestStop: ->

    onResult: ->

    onFailure: ->

module.exports = Reporter