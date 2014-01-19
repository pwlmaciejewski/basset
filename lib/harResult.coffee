Result = require './result'

class HarResult extends Result
    valueNames: [
        'onLoad',
        'requestsNum',
        'htmlRequestsNum'
        'cssRequestsNum',
        'jsRequestsNum',
        'imgRequestsNum',
        'otherRequestsNum'
    ]

    feedWithHar: (har) ->
        unless HarResult.isValidHar(har) then throw new Error 'Invalid HAR'
        @setValues HarResult.collectValuesFromHar(har)

HarResult.isValidHar = (har) ->
    try
        values = HarResult.collectValuesFromHar har
        for name, value of values
            if typeof value isnt 'number' then throw new Error()
    catch e
        return false
    return true

HarResult.collectValuesFromHar = (har) ->
    entries = har.log.entries
    res =
        onLoad: har.log.pages[0].pageTimings.onLoad
        requestsNum: entries.length
        htmlRequestsNum: HarResult.collectHtmlRequestsNumFromHar(har)
        cssRequestsNum: HarResult.collectCssRequestsNumFromHar(har)
        jsRequestsNum: HarResult.collectJsRequestsNumFromHar(har)
        imgRequestsNum: HarResult.collectImgRequestsNumFromHar(har)
    res.otherRequestsNum = res.requestsNum;
    res.otherRequestsNum -= (res.htmlRequestsNum + res.cssRequestsNum + res.jsRequestsNum + res.imgRequestsNum)
    res

HarResult.collectHtmlRequestsNumFromHar = (har) ->
    HarResult.collectMimeTypeNumFromHar har, 'text/html'

HarResult.collectCssRequestsNumFromHar = (har) ->
    HarResult.collectMimeTypeNumFromHar har, 'text/css'

HarResult.collectJsRequestsNumFromHar = (har) ->
    textJsNum = HarResult.collectMimeTypeNumFromHar har, 'text/javascript'
    appJsNum = HarResult.collectMimeTypeNumFromHar har, 'application/javascript'
    appxJsNum = HarResult.collectMimeTypeNumFromHar har, 'application/x-javascript'
    textJsNum + appJsNum + appxJsNum

HarResult.collectImgRequestsNumFromHar = (har) ->
    gif = HarResult.collectMimeTypeNumFromHar har, 'image/gif'
    png = HarResult.collectMimeTypeNumFromHar har, 'image/png'
    jpg = HarResult.collectMimeTypeNumFromHar har, 'image/jpeg'
    gif + png + jpg

HarResult.collectMimeTypeNumFromHar = (har, mimeType) ->
    entries = har.log.entries
    result = 0
    for entry in entries
        if entry.response.content.mimeType.indexOf(mimeType) isnt -1 then result += 1
    result

module.exports = HarResult