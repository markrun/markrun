var md5 = require('md5')
module.exports = {
    collect: function (content) {
        var hash = {}
        content = content.replace(/<!--[\s\S]?MARKRUN-HTML([\s\S]*?)-->/g, function (source, $1) {
            var html = $1.trim()
            var key = md5(html)
            hash[key] = html
            return key
        }).trim()
        return {
            content: content,
            hash: hash
        }
    },
    replace: function (content, hash) {
        for(var key in hash) {
            var html = hash[key]
            content = content.replace(new RegExp(key, 'g'), html)
        }
        key = undefined
        return content
    }
}
