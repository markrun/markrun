var ejs = require('ejs')
var cheerio = require('cheerio')
var Jsonnet = require('jsonnet')
var jsonnet = new Jsonnet()
var ejsCompileConf = require('./ejs-props')
var rMarkrunData = /<!--[\S\s]*?MARKRUN-DATA[\S\s]*?(\{[\S\s]*?\})[\S\s]*?-->/gm
module.exports = function (content, props) {
    // markrun_lastrun
    var $
    var templateRender = ejs.compile(props.template, ejsCompileConf)
    var templateData = {}
    // markrun_lastrun
    $ = cheerio.load('<body>' + content + '</body>')
    $('script[data-markrun-lastrun]').appendTo('body')
    content = $.html().trim()
    content = content.replace(/(^<body>|<\/body>$)/g, '').trim()

    // renderTemplate
    content.replace(rMarkrunData, function (pre, data) {
        try {
            templateData = jsonnet.eval(data)
        }
        catch (e) {
            console.log(e)
            throw new Error('MARKRUN-DATA: Jsonnet format error: ' + data)
        }
    })
    templateData = Object.assign({
        title: $('h1,h2,h3,h4,h5,h6').eq(0).text() || ''
    }, props.templateDefaultData, templateData)
    templateData = props.templateTransformData(Object.assign({},templateData))
    // content only read
    templateData.content = content.trim()
    return templateRender(templateData).trim()
}
