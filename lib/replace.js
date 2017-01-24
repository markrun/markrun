var json5 = require("json5")
var markdownParserHighlight = require('./markdownParserHighlight')
module.exports = function (content, props, info) {
    content = content.replace(/<!--\s*(MARKRUN-REPLACE|MARKRUN_REPLACE|MR-R)([\s\S]*?)-->/g, function (source, mr, json) {
        var data = json5.parse(json)
        var replace = props.replace[data.type]
        if (typeof replace === 'undefined') {
            throw new Error('Not match replace type: ' + data.type)
        }
        return replace(data, props, info, function (code, lang) {
            return markdownParserHighlight(code, lang, props.markdownParser)
        })
    })
    return content
}
