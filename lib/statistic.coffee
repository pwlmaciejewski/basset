Result = require './result'

class Statistic
  constructor: (results = []) ->
    @results = []
    @addResult res for res in results

  addResult: (result) ->
    @results.push result

  average: ->
    result = new Result()
    if @results.length
      for r in @results
        result = Result.add result, r
      result.onLoad /= @results.length
    result

module.exports = Statistic