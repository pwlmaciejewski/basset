assert = require('chai').assert
Statistic = require '../lib/statistic'
HarResult = require '../lib/harResult'

suite 'Statistic test case', ->
    setup ->
        @statistic = new Statistic()
        result1 = new HarResult
            onLoad: 2
        result2 = new HarResult
            onLoad: 3
        @statistic.addResult result1
        @statistic.addResult result2

    test 'add result', ->
        assert.equal @statistic.results.length, 2

    test 'constructor properties', ->
        stat = new Statistic [
                onLoad: 2
            ,
                onLoad: 3
        ]
        assert.equal stat.results.length, 2

    suite 'average', ->
        setup ->
            @average = @statistic.average()

        test 'type', ->
            assert.equal @average.constructor.name, 'HarResult'

        test 'result', ->
            assert.equal @average.getValue('onLoad'), 2.5

        test 'empty results', ->
            statistic = new Statistic()
            assert.equal statistic.average().getValue('onLoad'), 0

    suite 'deviation', ->
        setup ->
            @deviation = @statistic.deviation()

        test 'type', ->
            assert.equal @deviation.constructor.name, 'HarResult'

        test 'result', ->
            assert.equal @deviation.getValue('onLoad'), 0.5