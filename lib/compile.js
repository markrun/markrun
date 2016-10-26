// https://regexper.com/
var rRunPre = /(<!--([\s\n]*)?(\{[\s\S]*?)-->[\s\S]*?)?^````([^\n]*)([\s\S]*?)````/gm
var Jsonnet = require('jsonnet')
var jsonnet = new Jsonnet()
var md5 = require('md5')
var extend = require('extend')

module.exports = {
    /*
        @param {string} content markdown text
        @param {object} props
        @param {object} render
        @param {object} render.code ejs.compile(...)
        @return {object.string} object.content placeholder ````js\n code \n```` to hash
        @return {object.object} object.hash ````js\n code \n```` hash map
            {
                'a459be06efeeb46ae4afb5265eadf215': "````js\n code \n````"
            }
    */
    collect: function (content, props, render) {
        var hash = {}
        content = content.replace(rRunPre, function (pre, $1,$2, codeData, compileName, source) {
            // console.log(arguments)
            var compileOutput
            var compileFn
            var compileHTML
            var codeTemplateRenderData
            var hashKey
            codeData = codeData || '{}'
            codeData = codeData.trim()
            try {
                codeData = jsonnet.eval(codeData)
            }
            catch (e) {
                console.log(e)
                throw new Error('Jsonnet format error: ' + codeData)
            }
            codeData = extend(true, {}, props.codeTemplateDefaultData, codeData)
            compileName = compileName.trim().toLocaleLowerCase()
            if (compileName.length === 0) {
                throw new Error('You need to specify the compilation:\n' + pre + '\n\nJust like:\n' + '<!--{some:"abc"}-->\n````js\nconsole.log(1)\n````\n' + 'or\n' + '````js\nconsole.log(1)\n````')
            }
            source = source.trim()
            if (typeof props.compile[compileName] === 'undefined') {
                throw new Error('Not find compile:' + compileName + '\n' + pre)
            }
            compileFn = props.compile[compileName]
            compileOutput = compileFn(source) || {}
            if (typeof compileOutput.lang === 'undefined') {
                throw new Error('props.compile[' + compileName + '] return object.lang is undefined\n' + compileFn.toString() + '\nJust like:\n' + 'function (source, data){\n\treturn \t{\n\t\tlang: "js",\n\t\tcode: source\n\t}\n}' + '\n')
            }
            if (typeof compileOutput.code === 'undefined') {
                throw new Error('props.compile[' + compileName + '] return object.code is undefined\n' + compileFn.toString() + '\nJust like:\n' + 'function (source, data){\n\treturn \t{\n\t\tlang: "js",\n\t\tcode: source\n\t}\n}' + '\n')
            }
            codeTemplateRenderData = extend(true,{
                __code: compileOutput.code,
                __lang: compileOutput.lang,
                __source: props.highlight(source, codeData)
            }, codeData)
            codeTemplateRenderData = props.codeTemplateTransformData(extend(true,{}, codeTemplateRenderData))
            compileHTML = render.code(codeTemplateRenderData)
            hashKey = md5(compileHTML)
            hash[hashKey] = compileHTML
            return hashKey
        })
        return {
            content: content,
            hash: hash
        }
    }
}
