var md5 = require('md5')
/*
    First use collect(content) get collectData
    Then parser content: content = markrd(content)
    Then use replace(content, collectData) restore data
*/
module.exports = {
    /*
        collect('<h2>1234</h2> <!--MARKRUN-HTML <div>11</div> -->')
        {
            'b169e31e346edcb513375e55d5bfbe59': '<div>11</div>'
        }
    */
    collect: function (content) {
        var hash = {}
        content = content.replace(/<!--[\s\S]?MARKRUN-HTML([\s\S]*?)-->/g, function (source, $1) {
            var html = $1.trim()
            var key = md5(html)
            hash[key] = html
            return key
        }).trim()
        // collectData
        return {
            content: content,
            hash: hash
        }
    },
    /*
        replace('<h2>1234</h2> b169e31e346edcb513375e55d5bfbe59', {
            'b169e31e346edcb513375e55d5bfbe59': '<div>11</div>'
        })
        <h2>1234</h2> <div>11</div>
    */
    replace: function (content, hash) {
        for(var key in hash) {
            var html = hash[key]
            content = content.replace(new RegExp(key, 'g'), html)
        }
        key = undefined
        return content
    }
}
