const express = require('express');
const bodyParser = require('body-parser');
// 1. 导入路由
const router = require('./router');

// 创建服务
const server = express();

// 静态资源处理
server.use('/public/', express.static('./public/'));
// 表单请求体配置post提交处理,需要加载body-parser
server.use(bodyParser.urlencoded({
    // true 是其他第三方模块
    // false 是queryString方法
    extended: false
}));
//模块引擎配置，加载art-template和express-art-template
server.engine('.html', require('express-art-template'));
// 配置默认渲染的文件夹
// server.set('./view','./')

// 2.将路由挂载在服务上
server.use(router)
// 监听服务启动
server.listen(5002, () => {
    console.log('5002端口已经开启')
})