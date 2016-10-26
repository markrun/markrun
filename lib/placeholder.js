var markrunHTML = require('./markrun-html')
var ejsCompileConf = require('./ejs-props')
var defaultProps = require('./defaultProps')
var ejs = require('ejs')
var compile = require('./compile')
/*
    placeholder compile ````js result & <!--MARKRUN-HTML ... --> to hash
    @param {string} content markdown text
    @param {object} props markrun(conten, props)
    @return {object.string} object.content placeholder ````js\n code \n```` to hash
    @return {object.object} object.hash ````js\n code \n```` hash map
        {
            'a459be06efeeb46ae4afb5265eadf215': "````js\n code \n````"
        }
*/
module.exports = function (content, props) {
    var output
    var compileOutput
    compileOutput = compile.collect(content, props, {
        code: ejs.compile(props.codeTemplate, ejsCompileConf)
    })
    output = markrunHTML.collect(compileOutput.content)
    output.hash = Object.assign(output.hash, compileOutput.hash)
    return output
}
