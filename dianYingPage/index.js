const fs = require("fs");
const http = require("http");
const url = require("url");
const template = require("art-template");
//const demo = require("./public/js/demo");
const server = http.createServer();
let movie = [
    { id: "001", movieName: "夺冠", moviePrice: "30.0", movieTime: "2020-4-13" },
    { id: "002", movieName: "花木兰", moviePrice: "32.0", movieTime: "2020-4-14" },
    { id: "003", movieName: "唐人街探案", moviePrice: "33.0", movieTime: "2020-4-15" },
    { id: "004", movieName: "姜子牙", moviePrice: "30.0", movieTime: "2020-4-16" }
];
let title = "电影信息显示"
server.on('request', (Request, Response) => {
    console.log("已经链接");
    // 将数组转化成可用的对象
    const urlObj = url.parse(Request.url, true);
    if (Request.url.startsWith('/public/')) {
        fs.readFile("." + Request.url, (err, data) => {
            Response.end(data.toString());
        })
    }
    // 默认情况下登录的界面
    if (Request.url === "/") {
        fs.readFile("./index.html", (err, data) => {
            Response.end(data.toString());
        })
    }
    // 如果表单中提交的是login
    if (urlObj.pathname === "/login") {
        fs.readFile("./result.html", (err, data) => {
            console.log(urlObj);
            // 如果账号密码正确返回出正确的界面
            if (urlObj.query.username === "hhf" && urlObj.query.pwd === "111111") {
                console.log("登录成功");
                const newHtml = template.render(data.toString(), {
                    ref: movie,
                    title: title
                })
                Response.end(newHtml);
            } else {
                // 如果不正确
                console.log("登录失败")
                fs.readFile("./error.html", (err, data) => {
                    Response.end(data.toString())
                })
                // const newHtml = template.render(data.toString(), {
                //     ref: "登录失败"
                // })
                //    // 将返回的结果显示在页面上
                //   Response.end(newHtml)
            }
        })
    }


// 如果输入的是删除
    if (Request.url.startsWith("/delate") ){
        //console.log(Request.utl[-1]);
        const index = Request.url.indexOf("=");
        const num = Request.url.slice(index+1,Request.url.length);
        const newNum = Number(num);
        console.log(newNum)
        movie.splice(newNum-1,1);
        fs.readFile("./result.html", (err, data) => {
            // 如果账号密码正确返回出正确的界面
               //movie.splice(index,1);
                const newHtml = template.render(data.toString(), {
                    ref: movie,
                    title: title
                })
                Response.end(newHtml);
            
        })
        console.log("删除成功");

    }


});





server.listen(5002, () => {
    console.log("5002端口已经开启···")
})