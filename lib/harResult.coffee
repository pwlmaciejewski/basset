Result = require './result'

class HarResult extends Result
  valueNames: ['onLoad']

  feedWithHar: (har) ->
    unless HarResult.isValidHar(har) then throw new Error 'Invalid HAR'
    @setValues HarResult.collectValuesFromHar(har)

HarResult.collectValuesFromHar = (har) -> 
  res = 
    onLoad: har.log.pages[0].pageTimings.onLoad  

HarResult.isValidHar = (har) ->
  try 
    values = HarResult.collectValuesFromHar har
    for name, value of values
      if typeof value isnt 'number' then throw new Error()
  catch e 
    return false
  return true

module.exports = HarResult