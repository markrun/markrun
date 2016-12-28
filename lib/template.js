var ejs = require('ejs/ejs.js')
var json5 = require("json5")
var ejsCompileConf = require('./ejs-props')
var rMarkrunData = /<!--[\S\s]*?(MARKRUN-DATA|MARKRUN_DATA|MR-D)[\S\s]*?(\{[\S\s]*?\})[\S\s]*?-->/gm
var extend = require('extend')
module.exports = function (content, props) {
    // markrun_lastrun
    var $
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
    content.replace(rMarkrunData, function (pre, $1, data) {
        templateData = json5.parse(data)
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
    var template = props.template
    if (typeof props.template === 'function') {
        template = props.template(templateData)
    }
    if (template.length === 0) {
        template = '<%- content %>'
    }
    var templateRender = ejs.compile(props.template, ejsCompileConf)
    return templateRender(templateData).trim()
}
