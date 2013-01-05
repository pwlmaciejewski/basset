buster = require 'buster'
Statistic = require '../lib/statistic'
HarResult = require '../lib/harResult'

buster.testCase 'Statistic test case',
  setUp: ->
    @statistic = new Statistic()
    result1 = new HarResult
      onLoad: 2
    result2 = new HarResult
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
      assert.equals @average.constructor.name, 'HarResult'

    'test result': ->
      assert.equals @statistic.average().getValue('onLoad'), 2.5    

    'test empty results': ->
      statistic = new Statistic()
      assert.equals statistic.average().getValue('onLoad'), 0

  'deviation':
    setUp: ->
      @deviation = @statistic.deviation()

    # 'test type': ->
    #   assert.equals @deviation.constructor.name, 'Result'