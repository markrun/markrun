var md5 = require('md5')
/*
    First use collect(content) get collectData
    Then parser content: content = markrd(content)
    Then use reduction(content, collectData) restore data
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
        content = content.replace(/<!--[\s\S]?(MARKRUN-HTML|MARKRUN_HTML|MH)([\s\S]*?)-->/g, function (source, $1, $2) {
            var html = $2.trim()
            var key = md5(html)
            hash[key] = html
            return key
        }).trim()
        // collectData
        return {
            content: content,
            hash: hash
        }
    }
}
