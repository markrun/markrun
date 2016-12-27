var hljs = require('../node_modules/highlight.js/lib/highlight.js')
hljs.registerLanguage('htmlbars', require('../node_modules/highlight.js/lib/languages/htmlbars'));
hljs.registerLanguage('json', require('../node_modules/highlight.js/lib/languages/json'));
hljs.registerLanguage('javascript', require('../node_modules/highlight.js/lib/languages/javascript'));
hljs.registerLanguage('scss', require('../node_modules/highlight.js/lib/languages/scss'));
hljs.registerLanguage('less', require('../node_modules/highlight.js/lib/languages/less'));
hljs.registerLanguage('css', require('../node_modules/highlight.js/lib/languages/css'));
hljs.registerLanguage('xml', require('../node_modules/highlight.js/lib/languages/xml'));
hljs.registerLanguage('powershell', require('../node_modules/highlight.js/lib/languages/powershell'));
module.exports = hljs
