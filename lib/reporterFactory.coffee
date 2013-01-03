module.exports = 
	reporters: 
		plain: require './reporter/plain'
		json: require './reporter/json'

	createReporter: (name) ->
		unless name of @reporters then throw new Error "Unvalid reporter name \"#{name}\" "
		return new @reporters[name]()