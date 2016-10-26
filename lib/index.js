var defaultProps = require('./defaultProps')

var placeholder = require('./placeholder')
var reduction = require('./reduction')
var template = require('./template')
/*
 *  Please read README.md
*/
var markrun = function (content, props) {
    var props = Object.assign({}, defaultProps, props)
    // 1 placeholder
    var collectData = placeholder(content, props)
    content = collectData.content.trim()

    // 2 markdownParser
    content = props.markdownParser(content).trim()

    // 3 reduction
    content = reduction(content, collectData.hash).trim()

    // 4 template
    content = template(content, props).trim()

    return content
}

module.exports = markrun
