const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const template = require('art-template');
const url = require('url');

http.createServer().on('request', (Request, Response) => {
    const urlObj = url.parse(Request.url, true);
    // 链接数据库,加载 mysql
    //  创建链接
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: '3303',
        password: '123456',
        database: "hhf1"
    });
    //console.log(connection)
    // 链接数据库
    connection.connect();
    // 操作数据库
    // 创建SQL语句
    let sql = "";
    let params = "";
    if (urlObj.pathname === "/add") {
        sql = 'insert into movie values(?,?)';
        // params = [44,'HHHHH'];
        params = [];
        // 删除 
    } else if (urlObj.pathname.indexOf("/del") !== -1) {
        sql = 'delete from movie where id=?';
        params = urlObj.query.id;
        Response.statusCode = 302;
        Response.setHeader("Location", '/');
        // 更改
    } else if (urlObj.pathname.indexOf("/update") !== -1) {
        // 获取的值
        let updateData = ""
        // 在更改之前需要先查找
        let selectSql = 'select * from movie where id=?';
        // 查询到了id值,补充在id后面的值
        let selectData = urlObj.query.id;
        connection.query(selectSql,selectData, (err, result) => {
            updateData = result;
            console.log(updateData);
            return updateData;
            
        })
        console.log("----------------------")
        console.log(updateData)
        console.log("----------------------")
        fs.readFile("./updatePage.html", (err, data) => {
                    
            let newHtml1 = template.render(data.toString(),{
                updateData :updateData,
            })
            Response.end(newHtml1)
        })
        if (urlObj.pathname === "/modify") {
            sql = 'update movie set movieName="?",moviePrice=?,movieTime="?" where id = ?';
            params = ['GGGG', 3];
        }
        // 查询所有
    } else if (urlObj.pathname === "/") {
        sql = 'select * from movie ';
    }
    // 执行,(sql语句，变量，回调函数)
    connection.query(sql, params, (err, result) => {
        fs.readFile('./index.html', (err, data) => {
            let newHtml = template.render(data.toString(), {
                result: result
            })
            Response.end(newHtml);
        })
    })
    // 关闭链接 
    connection.end()

}).listen(5002, () => {
    console.log("5002端口已经开启")
}
)