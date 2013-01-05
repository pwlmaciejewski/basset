Basset = require '../basset'

class Reporter
  bind: (basset) ->
    unless basset instanceof Basset 
      throw new Error 'Reporter argument must be a Basset instance'
    basset.on 'start', @onStart.bind @
    basset.on 'stop', @onStop.bind @
    basset.on 'end', @onEnd.bind @
    basset.on 'result', @onResult.bind @
    basset.on 'failure', @onFailure.bind @

  onStart: ->

  onStop: ->
  
  onEnd: ->

  onResult: ->

  onFailure: ->

module.exports = Reporter