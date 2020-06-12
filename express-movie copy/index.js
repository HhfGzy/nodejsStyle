const express = require('express');
const bodyParser = require('body-parser');


const router = require('./router')

// 创建链接
const server = express();
//加载、配置模板引擎，
server.engine('.html', require('express-art-template'));
// 配置默认渲染的文件夹
server.set('views', './')
// 统一资源管理
// 1.第一种：http://localhost:5002/img/1.jpg
//server.use("/",express.static("./public/"));
// 2.第二种：http://localhost:5002/public/img/1.jpg
//server.use("/public/",express.static("./public/"));
// 3.第三种：http://localhost:5002/showRequest/img/1.jpg
server.use("/showRequest/", express.static("./public/"));
 
// body-parser配置
server.use(bodyParser.urlencoded({
    // false:使用queryString
    // true：使用第三方 qs 处理
    extended: false
}))


// 调用方法
router(server)

server.listen(5002, () => {
    console.log("开启")
})

