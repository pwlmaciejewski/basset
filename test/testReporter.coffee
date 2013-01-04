buster = require 'buster'
sinon = require 'sinon'
Reporter = require '../lib/reporter/reporter'
Basset = require '../lib/basset'

buster.testCase 'Reporter test case', 
  setUp: ->
    @basset = new Basset 'http://example.com'
    @reporter = new Reporter()

  'bind':
    'test arg must be a Basset instance': ->
      assert.exception =>
        @reporter.bind {}

    'test call new test': ->
      sinon.stub @reporter, 'onNewTest'
      @reporter.bind @basset
      @basset.emit 'newTest'
      assert.called @reporter.onNewTest

    'test call done': ->
      sinon.stub @reporter, 'onDone'
      @reporter.bind @basset
      @basset.emit 'done'
      assert.called @reporter.onDone