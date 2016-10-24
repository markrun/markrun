var marked = require('./marked.js')
var markrunHTML = require('./markrun-html')
var markrun = function (content, props) {
    props = props || {}
    props.markdownParser = props.markdownParser || marked
    var collectData = markrunHTML.collect(content)
    content = collectData.content
    content = props.markdownParser(content)
    content = markrunHTML.replace(content, collectData.hash)
    return content.trim()
}
module.exports = markrun
