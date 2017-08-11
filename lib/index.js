var defaultOptions = require('./defaultOptions')
var placeholder = require('./placeholder')
var reduction = require('./reduction')
var template = require('./template')
var extend = require('extend')
var spare = require('sparejs')
var replace = require('./replace')
/**
 *  Please read README.md
 */
var markrun = function (content, props, info) {
    props = props || {}
    info = info || {}
    props = extend(true, {}, defaultOptions, props)
    // 1 placeholder
    var collectData = placeholder(content, props, info)
    content = collectData.content.trim()

    // 2 markdownParser
    content = props.markdownParser(content).trim()

    // 3 reduction
    content = reduction(content, collectData.hash).trim()

    // 4 MARKRUN-REPLACE
    content = replace(content, props, info)
    // 5 template
    content = template(content, props).trim()
    var badAPI = spare(props.badAPI, {})
    if (typeof badAPI.output === 'function') {
        content = badAPI.output(content)
    }
    return content
}
markrun.setOptions = require('./setOptions')
markrun.string = require('./string')
markrun.package = require('../package.json')
markrun._ = require('lodash')
markrun.markdownParserHighlight = require('./markdownParserHighlight')
module.exports = markrun
