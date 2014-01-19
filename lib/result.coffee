class Result
    valueNames: []

    getValueNames: ->
        return @valueNames.slice()

    constructor: (values = {}) ->
        @values = {}
        for name in @getValueNames()
            @values[name] = 0
        if values instanceof Result then @setValues values.getValues()
        else @setValues values

    getValue: (name) ->
        unless @hasValue name then throw new Error "Unvalid value name '#{name}'"
        return @values[name]

    setValue: (name, value) ->
        unless @hasValue name then throw new Error "Unvalid value name '#{name}'"
        @values[name] = value

    hasValue: (name) ->
        name of @values

    getValues: ->
        res = {}
        for name, value of @values
            res[name] = value
        return res

    setValues: (values) ->
        for name, value of values
            @setValue name, value

    mapValues: (mapper) ->
        for name, value of @getValues()
            @setValue name, mapper(name, value)
        @

Result.add = (first, second) ->
    first = new @(first)
    second = new @(second)
    new @().mapValues (name) ->
        first.getValue(name) + second.getValue(name)

Result.substract = (first, second) ->
    first = new @(first)
    second = new @(second)
    new @().mapValues (name) ->
        first.getValue(name) - second.getValue(name)

Result.divideBy = (first, divider) ->
    first = new @(first)
    new @().mapValues (name) ->
        first.getValue(name) / divider

Result.pow = (first, power) ->
    first = new @(first)
    new @().mapValues (name) ->
        if power == 0 then 1
        else Math.pow first.getValue(name), power

Result.sqrt = (first) ->
    first = new @(first)
    new @().mapValues (name) ->
        Math.sqrt first.getValue(name)

module.exports = Result