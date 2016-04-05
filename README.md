# 云商服自动化文档输出

```js
var ysfdoc = require('../app.js')(options);
if(!program.path){
    ysfdoc(dir);
}else{
    var realPath = path.resolve(dir, program.path);
    ysfdoc(realPath, dir);
}

```