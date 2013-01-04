buster = require 'buster'
Result = require '../lib/result'

buster.testCase 'Result test case',
  setUp: ->
    @result = new Result()
    @har = 
      log:
        pages: [
          pageTimings:
            onLoad: 1937
        ],
        entries: [] 

  'test default properties': ->
    assert.equals @result.onLoad, 0

  'test constructor properties': ->
    result = new Result
      onLoad: 3
    assert.equals result.onLoad, 3

  'is valid har':
    'test valid': ->
      assert Result.isValidHar(@har)

    'test invalid har': ->
      refute Result.isValidHar({})

  'test feedWithHar': ->
    @result.feedWithHar @har
    assert.equals @result.onLoad, 1937 

  'add':
    'basic example':
      setUp: ->
        res1 = new Result
          onLoad: 3
        res2 = new Result
          onLoad: 2
        @res = Result.add res1, res2

      'test type': ->
        assert.equals @res.constructor.name, 'Result'

      'test value': ->
        assert.equals @res.onLoad, 5

    'constructor values': ->
      res = Result.add { onLoad: 1 }, { onLoad: 2 }
      assert.equals res.onLoad, 3