var ejs = require('ejs')
var Jsonnet = require('jsonnet')
var jsonnet = new Jsonnet()
var ejsCompileConf = require('./ejs-props')
var rMarkrunData = /<!--[\S\s]*?MARKRUN-DATA[\S\s]*?(\{[\S\s]*?\})[\S\s]*?-->/gm
var extend = require('extend')
module.exports = function (content, props) {
    // markrun_lastrun
    var $
    var templateRender = ejs.compile(props.template, ejsCompileConf)
    var templateData = {}
    var HTMLtitle = ''
    // markrun_lastrun
    var lastrunScriptTag = []
    content = content.replace(/<script.*?data-markrun-lastrun="true".*?>[\s\S]*?<\/script>/gm, function (scriptTag) {
        lastrunScriptTag.push(scriptTag)
        return ''
    })
    content = content + lastrunScriptTag.join('')

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
    content.replace(/<h1.*?>([\s\S]*?)<\/h1>/m, function (pre, innerHTML) {
        HTMLtitle = innerHTML.replace(/(<.*>|<\/.*>)/gm, '')
    })
    templateData = extend(true, {
        title: HTMLtitle
    }, props.templateDefaultData, templateData)
    templateData = props.templateTransformData(extend(true, {},templateData))
    // content only read
    templateData.content = content.trim()
    return templateRender(templateData).trim()
}
