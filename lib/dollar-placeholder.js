module.exports = {
    replace: function (content) {
        // Prevent markrun compile markrun itself lead to the hash
        // '53f8fc195474097e' + 'e94e60748e769465'
        var dollarPlaceholderText = '53f8fc195474097e' + 'e94e60748e769465'
        content = content.replace(/\$/g, dollarPlaceholderText)
        return content
    },
    reduction: function (content) {
        // Prevent markrun compile markrun itself lead to the hash
        // (markrun)?
        return content.replace(/53f8fc195474097e(markrun)?e94e60748e769465/g,'$')
    }
}
