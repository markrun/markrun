var marked = require('./marked.js')
var markrunHTML = require('./markrun-html')
var defaultProps = require('./defaultProps')
var ejs = require('ejs')
var cheerio = require('cheerio')
var reduction = require('./reduction')
var compile = require('./compile')
var ejsCompileConf = {
    rmWhitespace: true,
    compileDebug: true
}
/*
    @param {object} props user props
    @return {object}
*/
var getProps = function (props) {
    return Object.assign({}, defaultProps, props)
}
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
var placeholder = function (content, props) {
    var output
    var props = getProps(props)
    var compileOutput
    compileOutput = compile.collect(content, props, {
        code: ejs.compile(props.codeTemplate, ejsCompileConf)
    })
    output = markrunHTML.collect(compileOutput.content)
    output.hash = Object.assign(output.hash, compileOutput.hash)
    return output
}
/*
 *  Please read README.md
*/
var markrun = function (content, props) {
    var props = getProps(props)
    var collectData = placeholder(content, props)
    var $
    var templateRender = ejs.compile(props.template, ejsCompileConf)
    var templateData
    content = collectData.content.trim()
    content = props.markdownParser(content).trim()
    content = reduction(content, collectData.hash).trim()
    $ = cheerio.load('<body>' + content + '</body>')
    $('script[data-markrun-lastrun]').appendTo('body')
    content = $.html().trim()
    content = content.replace(/(^<body>|<\/body>$)/g, '').trim()
    // template
    templateData = Object.assign({
        title: $('h1,h2,h3,h4,h5,h6').eq(0).text() || ''
    }, props.templateDefaultData)
    // content only read
    templateData.content = content
    return templateRender(templateData)
}

module.exports = markrun
