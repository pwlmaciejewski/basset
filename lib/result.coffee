class Result
  constructor: (values = {}) ->
    @onLoad = values.onLoad or 0

  feedWithHar: (har) ->
    @onLoad = har.log.pages[0].pageTimings.onLoad

Result.isValidHar = (har) ->
  try 
    err = new Error 'Invalid HAR'
    if typeof har.log.pages[0].pageTimings.onLoad isnt 'number' then throw err
  catch e
    return false;
  true

Result.add = (first, second) ->
  result = new Result()
  result.onLoad = first.onLoad + second.onLoad
  result

module.exports = Result