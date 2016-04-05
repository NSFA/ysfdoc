const fs = require('fs');
/**
 * 获取所有文件名
 * @param path
 * @returns {*}
 */
var getAllFiles = function(path){
	return files = fs.readdirSync(path);
};

var renderNav = function(html){
	var start = '<ul class="m-nav">',
		end = '</ul>',
		body = '';
	var tree = [];
	html.replace(/<\s*(h[12])[^>]*>(.*?)<\s*\/\s*\1>/ig, function(str, tag, val){
		if(str.indexOf('h1') > -1){
			tree.push({
				name : val,
				child : []
			});
			return;
		};

		// 解决重复h2功能
		//if(str.split())
		// insert last
		tree[tree.length-1].child.push(val);
	});

	tree.forEach(function(itm, index){
		body += '<li><h1><a href="#'+itm.name+'">' + itm.name + '</a></h1>';
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
		body += '</li>';
	});

	return start + body + end;
};


module.exports = {
	getAllFiles: getAllFiles,
	renderNav : renderNav
}
