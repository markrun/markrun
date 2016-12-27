var marked = require('marked')
// sometime cannot npm install highlight.js
// use local vendor/highlight.js/**
var highlight = require('highlight.js')
var renderer = new marked.Renderer()
renderer.heading = function (text, level) {
    var escapedText = text.toLowerCase().replace(/\./g,'').replace(/[^\w]+/g, '-')
    return '<h' + level + '>'+
                '<a name="' + escapedText +'" class="markrun-anchor" href="#' + escapedText +'">' +
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
