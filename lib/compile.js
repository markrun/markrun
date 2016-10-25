// https://regexper.com/
var rRunPre = /(<!--([\s\n]*)?(\{[\s\S]*?)-->[\s\S]*?)?^````([^\n]*)([\s\S]*?)````/gm
var Jsonnet = require('jsonnet')
var jsonnet = new Jsonnet()
var md5 = require('md5')

module.exports = {
    collect: function (content, props, render) {
        var hash = {}
        content = content.replace(rRunPre, function (pre, $1,$2, codeData, compileName, source) {
            // console.log(arguments)
            var compileOutput
            var compileFn
            var compileHTML
            var hashKey
            codeData = codeData || '{}'
            // TODO: test jsonnet error
            try {
                codeData = jsonnet.eval(codeData)
            }
            catch (e) {
                console.log('Jsonnet format error: ' + codeData)
                throw new Error(e)
            }
            codeData = Object.assign({}, props.codeTemplateDefaultData, codeData)
            compileName = compileName.trim().toLocaleLowerCase()
            // TODO: test compileName === ''
            if (compileName.length === 0) {
                throw new Error('You need to specify the compilation:\n' + pre + '\n\nJust like:\n' + '<!--{some:"abc"}-->\n````js\nconsole.log(1)\n````\n' + 'or\n' + '````js\nconsole.log(1)\n````')
            }
            source = source.trim()
            // TODO: test compile[compileName] is undefined
            if (typeof props.compile[compileName] === 'undefined') {
                throw new Error('Not find compile:' + compileName + '\n' + pre)
            }
            // TODO: not return lang & code
            compileFn = props.compile[compileName]
            compileOutput = compileFn(source)
            if (typeof compileOutput.lang === 'undefined') {
                throw new Error('props.compile[' + compileName + '] return object.lang is undefined\n' + compileFn.toString() + '\nJust like:\n' + 'function (source, data){\n\treturn \t{\n\t\tlang: "js",\n\t\tcode: source\n\t}\n}' + '\n')
            }
            if (typeof compileOutput.code === 'undefined') {
                throw new Error('props.compile[' + compileName + '] return object.code is undefined\n' + compileFn.toString() + '\nJust like:\n' + 'function (source, data){\n\treturn \t{\n\t\tlang: "js",\n\t\tcode: source\n\t}\n}' + '\n')
            }
            compileHTML = render.code(Object.assign({
                __code: compileOutput.code,
                __lang: compileOutput.lang,
                // TODO: test custom highlight
                __source: props.highlight(source)
            }, codeData))
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