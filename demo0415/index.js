const template = require("art-template");
const fs = require("fs");
const http = require("http");
const url = require("url");
const querystring = require('querystring');



const server = http.createServer();

server.on("request", function (request, response) {
    let urlObj = url.parse(request.url, true);
    if (request.url === "/") {
        fs.readFile("./login.html", function (err, data) {
            response.end(data.toString());
        })
    }
    console.log("urlObj:", urlObj)
    if (urlObj.pathname === "/login") {
        console.log("你已经提交")
        fs.readFile('./result.html', function (err, data) {
            if (urlObj.query.username === "hhf" && urlObj.query.pwd === "111111") {
                console.log("登录成功");
                let newHtml = template.render(data.toString(), { ref: "登录成功", username: urlObj.query.username });
                response.end(newHtml);
            } else {
                console.log("登录失败");
                let newHtml2 = template.render(data.toString(), { ref: "登录失败" });
                response.end(newHtml2);
            }
        })

    }

    // 如果是post请求


    if (urlObj.pathname === "/login2") {
        // 记录请求的数据
        let str = "";
        // 正在接受的数据
        response.on("data", function (eachData) {
            str += eachData;
        })
        // 接受数据结束
        response.end('end', function () {
            console.log("==========================");
            console.log(str);
            // 字符串转对象，querystring
            let requestData = querystring.str;
            console.log("==========================");
            console.log(requestData)
        })



    }

})

server.listen(5002, function () {
    console.log("正在监听中")
})