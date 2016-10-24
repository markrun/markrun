var marked = require('./marked.js')
var markrunHTML = require('./markrun-html')
var defaultProps = require('./defaultProps')
var markrun = function (content, props) {
    props = Object.assign(defaultProps, props)
    props.markdownParser = props.markdownParser || marked
    var collectData = markrunHTML.collect(content)
    content = collectData.content
    content = props.markdownParser(content)
    content = markrunHTML.reduction(content, collectData.hash)
    return content.trim()
}
module.exports = markrun
