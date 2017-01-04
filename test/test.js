var fs = require('fs');
var path = require('path');

var ysfdoc = require('../app');


ysfdoc({
	tplPath : path.resolve(__dirname, '../template.ejs'),
	suffix : 'html'
})('./sadfa.md', './')

