var jsonlint = require("jsonlint")
module.exports = function (content, props, info) {
    content = content.replace(/<!--\s*(MARKRUN-REPLACE|MARKRUN_REPLACE|MR(-R)?)([\s\S]*?)-->/g, function (source, mr,$2, json) {
        var data = jsonlint.parse(json)
        var replace = props.replace[data.type]
        if (typeof replace === 'undefined') {
            throw new Error('Not match replace type: ' + data.type)
        }
        return replace(data, props, info)
    })
    return content
}
