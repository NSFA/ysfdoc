var marked = require('marked');
var hljs  = require('highlight.js');
var renderer = require('./renderer.js');
var color = require('colors');
var fs = require('fs');
var async = require('async');
var ejs = require('ejs');
var util = require('./util.js');
var path = require('path');
var split = process.platform == "win32"? "\\" :"/";

// 初始化marked插件
marked.setOptions({
	renderer:renderer,
	highlight: function(code){return hljs.highlightAuto(code).value;}
});



var ysfdoc = function(options){
	var tplPath = options.tplPath;

	var render = function(realpath, dir) {
		var files = util.getAllFiles(realpath);
		files.forEach(function (name) {
			// 过滤markdown文件
			if(!/\.md$/i.test(name)) return;

			var str = fs.readFileSync(path.join(realpath, name)).toString();
			var content = marked(str);
			var compile = ejs.compile(fs.readFileSync(tplPath, 'utf-8'));
			var html = compile({content: content, nav: util.renderNav(content)});

			// 检测目录是否存在
			try {
				fs.mkdirSync(path.join(dir, 'html'));
				console.log('当前路径下面没有html, 但系统已经帮你创建了, 请放心使用...'.underline.red);
			} catch (err) {}
			fs.writeFile(path.join(dir, '/html/', name.replace(/\.(\w+)$/g, '.html')), html, function (err, data) {
				if (err) throw err;
				console.log('解析' + name + '文档完成, 输出目录为html/' + name.replace(/\.md$/g, '.html'));
			})
		});
	};

	return render;
}

module.exports = ysfdoc;
// ysfdoc({tplPath:'./template.ejs'})('./doc', './');