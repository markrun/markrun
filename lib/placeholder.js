var markrunHTML = require('./markrun-html')
var ejsCompileConf = require('./ejs-props')
var ejs = require('ejs/ejs.js')
var compile = require('./compile')
var extend = require('extend')
/*
    placeholder compile ````js result & <!--MARKRUN-HTML ... --> to hash
    @param {string} content markdown text
    @param {object} props markrun(conten, props)
    @parm {object} info
    @return {object.string} object.content placeholder ````js\n code \n```` to hash
    @return {object.object} object.hash ````js\n code \n```` hash map
        {
            'a459be06efeeb46ae4afb5265eadf215': "````js\n code \n````"
        }
*/
module.exports = function (content, props, info) {
    var output
    var compileOutput
    compileOutput = compile.collect(content, props, info, {
        code: ejs.compile(props.codeTemplate, ejsCompileConf)
    })
    output = markrunHTML.collect(compileOutput.content)
    output.hash = extend(true, output.hash, compileOutput.hash)
    return output
}
