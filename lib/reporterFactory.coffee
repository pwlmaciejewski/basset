module.exports = 
	reporters: {}

	createReporter: (name) ->
		unless name of @reporters then throw new Error "Unvalid reporter name \"#{name}\" "
		return new @reporters[name]()