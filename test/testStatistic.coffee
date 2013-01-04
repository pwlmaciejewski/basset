buster = require 'buster'
Statistic = require '../lib/statistic'
Result = require '../lib/result'

buster.testCase 'Statistic test case',
  setUp: ->
    @statistic = new Statistic()
    result1 = new Result
      onLoad: 2
    result2 = new Result
      onLoad: 3
    @statistic.addResult result1
    @statistic.addResult result2

  'test add result': ->
    assert.equals @statistic.results.length, 2

  'test constructor properties': ->
    stat = new Statistic [
        onLoad: 2
      ,
        onLoad: 3
    ]
    assert.equals stat.results.length, 2

  'average': 
    setUp: ->
      @average = @statistic.average()

    'test type': ->
      assert.equals @average.constructor.name, 'Result'

    'test result': ->
      assert.equals @statistic.average().onLoad, 2.5    

    'test empty results': ->
      statistic = new Statistic()
      assert.equals statistic.average().onLoad, 0