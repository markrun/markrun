var dollarPlaceholder = require('./dollar-placeholder')
/*
    reduction('<h2>1234</h2> b169e31e346edcb513375e55d5bfbe59', {
        'b169e31e346edcb513375e55d5bfbe59': '<div>11</div>'
    })
    <h2>1234</h2> <div>11</div>
*/
module.exports = function (content, hash) {
    for(var key in hash) {
        var html = hash[key]

        // https://github.com/nimojs/blog/issues/2
        // $& $` $' $1,$2,$3,…,$n
        html = dollarPlaceholder.replace(html)
        /*
        delete p tag:
        <p><div class="markrun markrun--js" >
            ...
            </div></p>
        */
        content = content.replace(new RegExp('<p>\\s*(' + key + ')\\s*</p>', 'g'), '$1')
        content = content.replace(new RegExp(key, 'g'), html)
        content = dollarPlaceholder.reduction(content)
    }
    key = undefined
    return content
}
