Reporter = require './reporter'

class PlainReporter extends Reporter

  onNewTest: ->
    # console.log 'new test'

  onDone: (results) ->
    # console.log results

module.exports = PlainReporter