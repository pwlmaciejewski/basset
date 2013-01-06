buster = require 'buster'
sinon = require 'sinon'
Reporter = require '../lib/reporter/reporter'
Basset = require '../lib/basset'

buster.testCase 'Reporter test case', 
  setUp: ->
    @basset = new Basset 'http://example.com'
    @reporter = new Reporter()

  'bind':
    setUp: ->
      @testBond = (event, methodName) =>
        sinon.stub @reporter, methodName
        @reporter.bind @basset
        @basset.emit event
        assert.called @reporter[methodName]
        
    'test arg must be a Basset instance': ->
      assert.exception =>
        @reporter.bind {}

    'test call start': -> @testBond 'testStart', 'onTestStart'
    'test call stop': ->  @testBond 'testStop', 'onTestStop'
    'test call begin': -> @testBond 'begin', 'onBegin'
    'test call end': -> @testBond 'end', 'onEnd'
    'test call result': -> @testBond 'result', 'onResult'
    'test call failure': -> @testBond 'failure', 'onFailure'