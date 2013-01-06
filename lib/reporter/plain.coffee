Reporter = require './reporter'

class PlainReporter extends Reporter
	getSummaryTable: (results) ->
		avg = results.average()
		deviation = results.deviation()
		log = ""
		log += "Average\n"
		log += "  onLoad: #{avg.getValue('onLoad').toFixed(2)} \u00B1 #{deviation.getValue('onLoad').toFixed(2)} ms\n"
		log += "  requests: "
		log += "#{avg.getValue('requestsNum').toFixed(0)} ("
		log += "html: #{avg.getValue('htmlRequestsNum').toFixed(0)}, "
		log += "css: #{avg.getValue('cssRequestsNum').toFixed(0)}, "
		log += "js: #{avg.getValue('jsRequestsNum').toFixed(0)}, "
		log += "img: #{avg.getValue('imgRequestsNum').toFixed(0)}, "
		log += "other: #{avg.getValue('otherRequestsNum').toFixed(0)})"		
		log

module.exports = PlainReporter