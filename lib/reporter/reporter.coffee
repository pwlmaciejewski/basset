Basset = require '../basset'

class Reporter
  bind: (basset) ->
    unless basset instanceof Basset 
      throw new Error 'Reporter argument must be a Basset instance'
    basset.on 'newTest', @onNewTest
    basset.on 'done', @onDone

  onNewTest: ->

  onDone: ->

module.exports = Reporter