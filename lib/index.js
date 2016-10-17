var markrun = function (content, props) {
    // MARKRUN-CODE
    content = content.replace(/<!--[\s\S]?MARKRUN-CODE([\s\S]*)?-->/g, '$1').trim()
    content = content.trim()
    return content
}
module.exports = markrun
