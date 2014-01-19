module.exports =
    reporters:
        minimal: require './reporter/minimal'
        full: require './reporter/full'

    createReporter: (name) ->
        unless name of @reporters then throw new Error "Unvalid reporter name \"#{name}\" "
        return new @reporters[name]()