var extend = require('extend')
var defaultOptions = require('./defaultOptions')
var setOptions = function (options) {
    defaultOptions = extend(true, defaultOptions, options)
}
module.exports = setOptions
