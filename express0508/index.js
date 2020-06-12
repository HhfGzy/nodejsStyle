const express = require("express");
const fs = require('fs');
// 用来解析post提交的数据
const bodyParse = require("body-parser");
const mysql = require("mysql");
// 加载模板引擎
const template = require("art-template");


// 创建服务器
const server = express();
// 统一资源管理
// 1.第一种：http://localhost:5002/img/1.jpg
//server.use("/",express.static("./public/"));
// 2.第二种：http://localhost:5002/public/img/1.jpg
//server.use("/public/",express.static("./public/"));
// 3.第三种：http://localhost:5002/showRequest/img/1.jpg
server.use("/showRequest/", express.static("./public/"));

// 配置，用来解析
server.use(bodyParse.urlencoded({
    // false:使用queryString
    // true：使用第三方 qs 处理
    extended: false
}));
// 配置模板引擎，html：以html结尾的文件名，使用什么模板
server.engine("html", require("express-art-template"));

// 配置访问路径,    
server.set('views', './');

// 用来存放SQL语句
let sql = '';
// 用来存放传入的参数
let params = '';
// 创建数据库链接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3303',
    password: '123456',
    database: "hhf1"
});
// 链接数据库
connection.connect();


server.get("/", (request, response) => {
    console.log("默认访问")
    // 读取文件
    fs.readFile("./index.html", (err, data) => {
        // send方法可以不用字符串转换
        response.send(data.toString());
    })

}).get("/show", (request, response) => {
    // request.query.xxx:获取值
    console.log("show访问", request.query)


    // 这是登录按钮
}).post("/test", (request, response) => {
    // 1.npm i body-parser;
    // 2.加载
    // 3.配置
    // 4.使用request.body
    //console.log(request.body.name)

    // 先查询----有？没有

    sql = "select * from login5 where name=? and password=? ";
    params = [request.body.name, request.body.pwd];

    connection.query(sql, params, (err, result) => {
        // console.log(err);
        // console.log(result)
        if (err === null) {
            fs.readFile('./success.html', (err, data) => {
                let newData = template.render(data.toString(), {
                    mes: request.body.name
                })
                response.send(newData);
            })
        }
    })
    //connection.end();

}).get("/add", (request, response) => {
    fs.readFile("./zhuce.html", (err, data) => {
        // send方法可以不用字符串转换
        response.send(data.toString());
    })
    // 注册按钮
}).post("/put", (request, response) => {

    // 查询，登录
    console.log(request.body.name)
    console.log(request.body.pwd)
    sql = 'insert into login5(name,password) values(?,?)';
    params = [request.body.name, request.body.pwd];
    console.log(params)
    connection.query(sql, params, (err,result) => {
        console.log(err)
        if (result === !null) {
            // response.statusCode = 302;
            // response.setHeader('Location', "/");
            //  response.end();
            //重定向
            response.redirect(302,"/selectAll")
        }
    })
    // 关闭数据库链接
    //connection.end()
    // 请求show的时候，在页面中添加值，代替原先的模板引擎
    // 1.安装：art-template    express-art-template
    // 2.引入
    // 3.配置 engine("对什么结尾的页面渲染","用的是什么引擎"),主要給人自己的response添加render方法
    // 4.render(html模板名，模板数据)，不用fs读取数据,
    //   注意：默认是在views文件夹里面
    //      也可以修改默认访问路径，配置文件：set('views',"相对index.js文件位置")
}).get("/showText", function (request, response) {

    const mess = 'asdfg';
    const newHtml = response.render("test.html", {
        mess
    })
    response.send(newHtml)
}).get("/showText1", function (request, response) {
    const mess = [
        { id: 1, name: 'hhf' },
        { id: 2, name: 'gzy' },
        { id: 3, name: 'xff' }
    ];
    const newHtml2 = response.render("test2.html", {
        mess
    })
    response.send(newHtml2)
}).get("/selectAll", (request, response) => {
    sql = "select * from login5";
    connection.query(sql, (err, result) => {
        console.log(result)

        const newResult = response.render('./test2.html', {
            result
        })
        response.send(newResult)
    })
//connection.end();
})
server.listen(5002, () => {
    console.log("5002端口开启")
});