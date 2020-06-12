const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path')

// 创建链接
const server = express();
// 配置模板引擎
server.engine('.html', require('express-art-template'));
// 配置默认渲染的文件夹
server.set('views', './')
// body-parser配置
server.use(bodyParser.urlencoded({
    // false:使用queryString
    // true：使用第三方 qs 处理
    extended: false
}))





// 数据库连接

// 创建连接数据库
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3303',
    database: "hhf1"
});

// 连接数据库
conn.connect();

// 定义变量
let sql = '';
let params = null;

let filePath = "./views/"

server
    .get("/", (request, response) => {
        // fs.readFile('./login.html', (err, data) => {
        //     //response.end(data.toString())
        //     response.send(data.toString())
        // })
// 1.使用join方法
        response.sendFile(path.join(__dirname,filePath+"login.html"));
// 不使用join方法，注意要把前面的filePath更换斜杠

    })
    .post("/login", (request, response) => {
        // 获取post提交的账号密码
        // 1.下载，加载body-parser
        // 2.配置，server.use(bodyParser.urlendoded({}))
        // 3.使用：request.body
        // console.log(request.body)
        sql = "select * from login5 where name =? and password =?";
        params = [request.body.name, request.body.pwd];
        conn.query(sql, params, (err, result) => {
            // 如果result有值的话 console.log(result.length)
            if (result.length === 1) {
                // response.statusCode = 302;
                // response.setHeader('Location', "/selectAll");
                //  response.end();
                // 重定向，跳转显示页面
                response.redirect(302, "/selectAll")
            } else {
                // 如果没有值的话,跳转页面注册页面
                fs.readFile("./zhuce.html", (err, data) => {
                    response.send(data.toString())
                })
            }
        })
    })
    .get('/selectAll', (request, response) => {
        sql = 'select * from movie';
        conn.query(sql, (err, result) => {
            // 利用模板引擎将结果显示在页面上
            // 1.加载模板引擎，引入express的模板
            // 2.使用模板引擎，render(文件，{数据})
            //console.log(result);
            // 注意：此时将写在文件中是默认有文件夹的，也可以修改默认文件，server,set("views"."")
            const newHtml = response.render('./showAll.html', {
                showAll: result
            });
            // 这边只能写end,否则会有错误，原因不详
            //response.end(newHtml)
            // response.send(newHtml)
        })
    })
    .post("/put", (request, response) => {
        console.log(request.body);
        sql = "insert into login5(name,password) values(?,?)";
        params = [request.body.name, request.body.pwd];
        conn.query(sql, params, (err, result) => {
            if (err === null) {
                //    添加成功之后的跳转
                response.redirect(302, '/')
            } else {
                //    添加失败之后的跳转
            }
        })
    })
    .post("/add", (request, response) => {
        // 获取post添加的信息
        // 加载，配置，使用
        console.log(request.body);
        sql = "insert into movie(id,movieName,moviePrice,movieTime) values(?,?,?,?)";
        params = [request.body.id, request.body.movieName, request.body.moviePrice, request.body.movieTime];
        conn.query(sql, params, (err, result) => {
            // console.log(err,result)
            if (err === null) {
                // 添加成功之后的跳转
                response.redirect(302, '/selectAll')
            } else {
                // 添加失败之后的跳转
            }
        })
    })
    .get("/del*", (request, response) => {
        //console.log("删除")
        //console.log(request.query.id);
        sql = "delete from movie where id=?";
        params = request.query.id;
        conn.query(sql, params, (err, result) => {
            if (err === null) {
                // 删除成功
                response.redirect(302, "/selectAll");
            } else {
                // 删除失败
            }
        })
    })
    .get('/update*', (request, response) => {
        //console.log(request.query.id);
        // 先查询，在修改 
        sql = "select * from movie where id=?";
        params = request.query.id;
        conn.query(sql, params, (err, result) => {
            response.render('./updatePage.html', {
                updateData: result
            })
        })
    })
    .post("/modify", (request, response) => {//修改
        sql = "update movie set movieName=?,moviePrice=?,movieTime=? where id = ?";
        params = [request.body.movieName, request.body.moviePrice, request.body.movieTime, request.body.id];

        conn.query(sql, params, (err, result) => {
            if (err === null) {
                response.redirect(302, "/selectAll")
            } else {
            }
        })
    })

    
server.listen(5002, () => {
    console.log("开启")
})

