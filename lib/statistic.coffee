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
    result = new HarResult()
    average = @average()
    for r in @results
      tmp = HarResult.substract average, r
      tmp = HarResult.pow tmp, 2
      result = HarResult.add result, tmp
    result = HarResult.divideBy result, @results.length
    HarResult.sqrt result

module.exports = Statistic