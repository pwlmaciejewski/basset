PlainReporter = require './plain'

class FullReporter extends PlainReporter
    onBegin: ->
        @done = 0
        @results = 0
        @failures = 0
        @startTimestamp = new Date().getTime()

    onResult: (result) ->
        @results += 1
        log = "#" + (@done + 1).toString() + " "
        log += "onLoad: #{result.getValue('onLoad')}ms, "
        log += "requests: #{result.getValue('requestsNum')} "
        log += "(html: #{result.getValue('htmlRequestsNum')}, "
        log += "css: #{result.getValue('cssRequestsNum')}, "
        log += "js: #{result.getValue('jsRequestsNum')}, "
        log += "img: #{result.getValue('imgRequestsNum')}, "
        log += "other: #{result.getValue('otherRequestsNum')})"
        console.log log

    onFailure: (error) ->
        @failures += 1
        console.log error

    onTestStop: ->
        @done += 1

    onEnd: (results) ->
        @stopTimestamp = new Date().getTime()
        testDuration = (@stopTimestamp - @startTimestamp) / 1000
        log = "\n"
        log += "#{@done} tests" + ' '
        log += "#{@results} results" + ' '
        log += "#{@failures} errors" + "\n"
        log += "Finished in #{testDuration.toFixed(2)}s" + "\n\n"
        log += @getSummaryTable results
        console.log log

module.exports = FullReporter