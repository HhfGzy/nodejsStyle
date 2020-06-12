const http = require("http");
const fs = require("fs");
const url = require("url");
const template = require("art-template");
const querystring = require("querystring");
const mysql = require('mysql');

http.createServer().on('request', (Request, Response) => {
    const urlObj = url.parse(Request.url, true);
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
    // 默认显示页面
    if (urlObj.pathname === "/") {
        sql = "select * from movie";
        connection.query(sql, (err, result) => {
            //console.log(result);
            fs.readFile('./view/index.html', (err, data) => {
                let newHtml = template.render(data.toString(), {
                    movies: result
                })
                Response.end(newHtml)
            })
        })
        // 关闭数据库链接
        connection.end()
    }

    // 删除
    if (urlObj.pathname.indexOf('/del') !== -1) {
        sql = 'delete from movie where id = ?';
        params = urlObj.query.id;
        connection.query(sql, params, (err, result) => {
            if (err === null) {
                console.log("删除成功", result)
                Response.statusCode = 302;
                Response.setHeader("Location", "/");
                Response.end();
            }
        })
        // 关闭数据库链接
        connection.end()
    }

    // 添加用户,post
    if (urlObj.pathname === "/add") {
        let requestData = "";
        // 获取数据
        Request.on('data', (res) => {
            requestData += res;
        })
        // 获取数据结束
        Request.on('end', () => {
            //console.log(requestData) 
            // 将字符串转化成对象
            let newRequestData = querystring.parse(requestData);
            console.log(newRequestData);
            sql = 'insert into movie values(?,?,?,?)';
            params = [+newRequestData.id, newRequestData.movieName, +newRequestData.moviePrice, newRequestData.movieTime];
            console.log(params)
            connection.query(sql, params, (err) => {
                console.log(err)
                if (err === null) {
                    Response.statusCode = 302;
                    Response.setHeader('Location', "/");
                    Response.end();
                }
            })
            // 关闭数据库链接
            connection.end()
        })
    }
    // 修改用户
    if (urlObj.pathname.indexOf("update") !== -1) {
        console.log("正在修改")
        console.log(urlObj.query.id);
        sql = "select * from movie where id = ?";
        params = urlObj.query.id;

        connection.query(sql, params, (err, result) => [
            fs.readFile("./view/updatePage.html", (err, data) => {
                const newUpdate = template.render(data.toString(), {
                    updateData: result
                })
                Response.end(newUpdate);
            })
        ])
        connection.end();
    }
    // 点击提交按钮时候
    if (urlObj.pathname === "/modify") {
        let modifyDate = '';
        Request.on('data', (ref) => {
            modifyDate += ref;
            //console.log(modifyDate);
        });
        Request.on('end', () => {
            // 将数据转化成字符串
            modifyDate = querystring.parse(modifyDate);
            console.log(modifyDate);
            sql = "update movie set movieName=?,moviePrice=?,movieTime=? where id = ?";
            params = [modifyDate.movieName,
                      modifyDate.moviePrice,
                      modifyDate.movieTime,
                      modifyDate.id];
             connection.query(sql,params,(err,result)=>{
                if (err === null) {
                    Response.statusCode = 302;
                    Response.setHeader('Location', "/");
                    Response.end();
                }
             });
             connection.end();
        })
    }



    // 错误出现的原因是：异步操作还没有结束，数据库的连接就被关闭了。若你把这个end()放到回调函数里面，就不会发生错误，或者是用promise时，放到最后也一样。至于为什么一次操作不会发生这样的错误，也许是程序从上到下的时间恰好够一次操作的时间

}).listen('5002', () => {
    console.log("5002端口已开启");
})