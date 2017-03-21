var marked = require('marked')
// sometime cannot npm install highlight.js
// use local vendor/highlight.js/**
var highlight = require('highlight.js')
var renderer = new marked.Renderer()
renderer.heading = function (text, level) {
    return '<h' + level + ' id="' + text + '" >'+
                '<a class="markrun-anchor" href="#' + text +'">' +
                    '<span class="markrun-anchor-link"></span>' +
                '</a>' +
                text +
            '</h' + level + '>'
}
marked.setOptions({
	renderer: renderer,
    sanitize: false,
    pedantic: true,
    gfm: true,
	highlight: function(code) {
		return highlight.highlightAuto(code).value
	}
})
module.exports = marked
