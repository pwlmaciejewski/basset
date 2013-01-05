HarResult = require './harResult'

class Statistic
  constructor: (results = []) ->
    @results = []
    @addResult res for res in results

  addResult: (result) ->
    @results.push result

  average: ->
    result = new HarResult()
    if @results.length
      for r in @results
        result = HarResult.add result, r
      result = HarResult.divideBy result, @results.length
    result

  deviation: ->
    result = new Result()
    result

module.exports = Statistic