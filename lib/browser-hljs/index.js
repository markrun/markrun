var hljs = require('./highlight');

hljs.registerLanguage('css', require('./languages/css'));
hljs.registerLanguage('less', require('./languages/less'));
hljs.registerLanguage('scss', require('./languages/scss'));
hljs.registerLanguage('javascript', require('./languages/javascript'));
hljs.registerLanguage('json', require('./languages/json'));
hljs.registerLanguage('htmlbars', require('./languages/htmlbars'));
hljs.registerLanguage('php', require('./languages/php'));

module.exports = hljs;
