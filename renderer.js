var marked = require('marked');
var renderer = new marked.Renderer();


renderer.heading = function(text, level){
	var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
	return '<h' + level+ ' id="'+text+'">'+text+'</h'+level+'>';
};






module.exports = renderer;