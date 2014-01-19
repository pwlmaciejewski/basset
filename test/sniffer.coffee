assert = require('chai').assert
sinon = require 'sinon'
sandbox = require 'sandboxed-module'
path = require 'path'
HarResult = require '../lib/harResult'

execError = -> null
execStdout = -> '{}'
execSpy = sinon.spy (command, options, callback = ->) ->
    callback(execError(), execStdout())

Sniffer = sandbox.require '../lib/sniffer',
    requires:
        child_process:
            exec: execSpy

suite 'Sniffer test case', ->
    setup ->
        execError = -> null
        execStdout = -> '{}'
        @url = 'http://example.com'
        @sniffer = new Sniffer @url

    suite 'first argument (url)', ->
        test 'is required', ->
            assert.throws =>
                new Sniffer()

        test 'is a string', ->
            assert.throws =>
                new Sniffer {}

    suite 'run', ->
        setup ->
            @spy = sinon.spy()

        test 'runs phantomjs', ->
            netsniffPath = path.resolve __dirname, '../vendor/netsniff.js'
            phantomjsExecCommand = 'phantomjs ' + netsniffPath + ' ' + @url
            @sniffer.run()
            assert.ok execSpy.calledWith(phantomjsExecCommand)

        test 'calls callback', ->
            @sniffer.run @spy
            assert.ok @spy.called

        test 'error', ->
            error = new Error 'Foo error'
            execError = ->  error
            @sniffer.run @spy
            assert.ok @spy.calledWith(error)

        test 'result', ->
            har =
                log:
                    pages: [
                        pageTimings:
                            onLoad: 1937
                    ],
                    entries: []
            execStdout = ->
                JSON.stringify har
            @sniffer.run @spy
            assert.ok @spy.calledWith(null)
            assert.equal @spy.getCall(0).args[1].constructor.name, 'HarResult'

        test 'unparsable stdout', ->
            execStdout = ->
                '!@#$%'
            @sniffer.run @spy
            assert.equal @spy.getCall(0).args[0].constructor.name, 'Error'