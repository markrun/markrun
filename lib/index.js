var defaultProps = require('./defaultProps')

var placeholder = require('./placeholder')
var reduction = require('./reduction')
var template = require('./template')
var extend = require('extend')
var replace = require('./replace')
/**
 *  Please read README.md
 */
var markrun = function (content, props, info) {
    info = info || {}
    props = extend(true, {}, defaultProps, props)
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

    return content
}
markrun.string = require('./string')
markrun.package = require('../package.json')
markrun._ = require('lodash')
markrun.hljs = require('highlight.js')
module.exports = markrun
