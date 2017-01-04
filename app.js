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
	var suffix = options.suffix;

	var render = function(realpath, dir) {



		if(fs.lstatSync(realpath).isDirectory()){
			var files = util.getAllFiles(realpath);
			var flag = true;
		}else{
			var files = [realpath];
			var flag = false;
		}

		files.forEach(function (name) {
			var file = flag ? path.join(realpath, name) : path.resolve(process.cwd(), name);

			var str = fs.readFileSync(file).toString();
			var content = marked(str);
			var compile = ejs.compile(fs.readFileSync(tplPath, 'utf-8'));
			var arr  = file.split(split);
			var name = arr[arr.length-1];

			var html = compile({content: content, nav: util.renderNav(content), name : name });

			// 检测目录是否存在
			try {
				fs.mkdirSync(path.join(dir, 'html'));
				console.log('当前路径下面没有html, 但系统已经帮你创建了, 请放心使用...'.underline.yellow);
			} catch (err) {

			}


			fs.writeFile((flag ? path.join(dir, '/html/', name.replace(/\.(\w+)$/g, '.'+suffix)) : path.resolve(dir, '/html/', name.replace(/\.(\w+)$/g, '.'+suffix))), html, function (err, data) {
				if (err) throw err;
				console.log('解析' + name + '文档完成, 输出目录为html/' + name.replace(/\.md$/g, '.'+suffix));
			});

			util.copyAllFiles(path.resolve(__dirname , './res/'), path.join(dir, '/html'))
		});
	};

	return render;
}

module.exports = ysfdoc;