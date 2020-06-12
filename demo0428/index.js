const express = require('express');
const fs = require('fs');
const url = require('url')
const querystring = require('querystring');


const server = express();

//静态资源处理

server.use("/public/", express.static('./public'));
// 处理请求:get/post 
server.get('/', (request, response) => {
    console.log('已经链接')
    fs.readFile('./index.html', (err, data) => {
        response.send(data)
    })
}).post("/login", (request, response) => {
    const urlObj = url.parse(request.url, true);
    console.log(urlObj.query)
    let myStr = "";
    request.on('data', (ref) => {
        myStr += ref;
    })
    request.on('end', () => {
        myStr = querystring.parse(myStr);
        console.log(myStr);
        if (myStr.unm === "hhf" && myStr.pwd === "123") {
            response.send("登录成功 ")
        } else {
            response.send("登录失败 ")
        }
    })
}).get("/login2", (request, response) => {
    if (request.query.username === 'hhf' && request.query.password === '123') {
        response.send("get登录成功")
    } else {
        response.send('get登录失败')
    }
})



server.listen(5002, () => {
    console.log('5002端口开启')
})