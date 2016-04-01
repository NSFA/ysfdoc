const fs = require('fs');
/**
 * 获取所有文件名
 * @param path
 * @returns {*}
 */
var getAllFiles = function(path){
	path = path.replace(/^\./, '');
	return files = fs.readdirSync(__dirname+path);
};

var renderNav = function(html){
	var start = '<ul class="m-nav">',
		end = '</ul>',
		body = '';
	var tree = [];
	html.replace(/<(h[12]).*>(.*)<\/\1>?/g, function(str, tag, val){
		if(str.indexOf('h1') > -1){
			tree.push({
				name : val,
				child : []
			});
			return;
		};
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
