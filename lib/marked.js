var marked = require('marked')
// sometime cannot npm install highlight.js
// use local vendor/highlight.js/**
var highlight = require('./vendor/highlight.js/lib/index.js')
var renderer = new marked.Renderer()
renderer.heading = function (text, level) {
    var escapedText = encodeURI(text)
    return '<h' + level + '>'+
                '<a name="anchor-' + escapedText +'" class="markrun-anchor" href="#anchor-' + escapedText +'">' +
                    '<span class="markrun-anchor-link"></span>' +
                '</a>' +
                text +
            '</h' + level + '>'
}
marked.setOptions({
	renderer: renderer,
    sanitize: false,
    gfm: true,
	highlight: function(code) {
		return highlight.highlightAuto(code).value
	}
})
module.exports = marked
