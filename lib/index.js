var marked = require('./marked.js')
var markrunHTML = require('./markrun-html')
var defaultProps = require('./defaultProps')()
var getProps = function (props) {
    return Object.assign(defaultProps, props)
}
var placeholder = function (content, props) {
    getProps(props)
    return markrunHTML.collect(content)
}
var reduction = function (content, hash) {
    return markrunHTML.reduction(content, hash)
}
var markrun = function (content, props) {
    var collectData = placeholder(content, props)
    var props = getProps(props)
    content = collectData.content
    content = props.markdownParser(content)

    content =reduction(content, collectData.hash)
    return content.trim()
}

module.exports = markrun
module.exports.placeholder = placeholder
module.exports.reduction = reduction
