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

    'test call start': ->
      @testBond 'start', 'onStart'

    'test call stop': ->
      @testBond 'stop', 'onStop'

    'test call end': ->
      @testBond 'end', 'onEnd'

    'test call result': ->
      @testBond 'result', 'onResult'

    'test call failure': ->
      @testBond 'failure', 'onFailure'