module.exports = function (source, lang, markdownParser) {
    lang = lang || 'js'
    markdownParser = markdownParser || require('./marked')
    return markdownParser('```' + lang + '\n' + source + '\n```').trim()
                .replace(/^<pre><code([^>]*)?>/g, '')
                .replace(/<\/code><\/pre>$/g, '')
}
