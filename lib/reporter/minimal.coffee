PlainReporter = require './plain'
clc = require 'cli-color'

class MinimalReporter extends PlainReporter
    onBegin: ->
        @done = 0
        @columnWidth = 50

    onTestStart: ->
        if @done and @done % @columnWidth is 0 then console.log ''
        @done += 1

    onResult: ->
        process.stdout.write clc.greenBright.bold('.')

    onFailure: ->
        process.stdout.write clc.redBright.bold('F')

    onEnd: (results) ->
        console.log ''
        console.log @getSummaryTable(results)

module.exports = MinimalReporter