const fs = require('fs');
/**
 * 获取所有文件名
 * @param path
 * @returns {*}
 */
var getAllFiles = function(path){
	var files = fs.readdirSync(path);

	return files.filter(function(name){
		return /\.md$/.test(name);
	})
	
};

/**
 * 构造导航栏结构
 * @param html
 * @returns {string}
 */
var renderNav = function(html){
	var start = '<ul class="m-nav">',
		end = '</ul>',
		body = '';
	var tree = [];
	html.replace(/<\s*(h[23])[^>]*>(.*?)<\s*\/\s*\1>/ig, function(str, tag, val){
		if(str.indexOf('h2') > -1){
			tree.push({
				name : val,
				child : []
			});
			return;
		};
		tree[tree.length-1].child.push(val);
	});

	tree.forEach(function(itm, index){
		body += '<li><h1><a href="#'+itm.name+'" class="j-flag-levone">' + itm.name + '</a></h1>';

		itm.child.forEach(function(val, index){
			var block = '<li><h2><a href="#'+val+'">'+val+'</a></h2></li>';
			if(index == 0){
				body += '<ul class="nav_levtwo">' + block
			}else if(index == itm.child.length-1){
				body += block + '</ul>';
			}else{
				body += block;
			}
		});
		body += '<i class="u-icon u-icon-down j-flag-icon"></i></li>';
	});

	return start + body + end;
};


module.exports = {
	getAllFiles: getAllFiles,
	renderNav : renderNav
}
