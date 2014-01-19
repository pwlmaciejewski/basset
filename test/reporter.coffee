assert = require('chai').assert
sinon = require 'sinon'
Reporter = require '../lib/reporter/reporter'
Basset = require '../lib/basset'

suite 'Reporter test case', ->
    setup ->
        @basset = new Basset 'http://example.com'
        @reporter = new Reporter()

    suite 'bind', ->
        setup ->
            @testBond = (event, methodName) =>
                sinon.stub @reporter, methodName
                @reporter.bind @basset
                @basset.emit event
                assert @reporter[methodName].called

        test 'arg must be a Basset instance', ->
            assert.throws =>
                @reporter.bind {}

        test 'call start', -> @testBond 'testStart', 'onTestStart'
        test 'call stop', ->  @testBond 'testStop', 'onTestStop'
        test 'call begin', -> @testBond 'begin', 'onBegin'
        test 'call end', -> @testBond 'end', 'onEnd'
        test 'call result', -> @testBond 'result', 'onResult'
        test 'call failure', -> @testBond 'failure', 'onFailure'