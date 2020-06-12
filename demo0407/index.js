const template = require("art-template");
const fs = require("fs");
const http = require("http");
const url = require("url");


const server = http.createServer();

server.on("request", function (request, response) {
    let urlAddress = request.url;
    // if (request.url === "/") {
    //     fs.readFile("index.html", (err, data) => {
    //         response.end(data.toString())
    //     })
    // }

    let urlObj = url.parse(urlAddress, true);

    //console.log(urlObj)
    if (urlObj.pathname == '/test') {
        const res = urlObj.query.username;
        if (res === "ok") {
            fs.readFile("./index.html", (err, data) => {
                const newHtml = template.render(data.toString(), {
                    username: res
                });
                response.end(newHtml);
            })
        }
        fs.readFile("test.html", (err, data) => {
            response.end(data.toString())
        })
    }
    // console.log(urlObj)
    // console.log(`这是urlObj.pathname部分${urlObj.pathname}`);



    // if (request.url === "/go") {
    //     fs.readFile("test.html", (err, data) => {
    //         response.end(data.toString())
    //     })
    // }

    // if (request.url === "/go?test") {
    //     fs.readFile("test.html", (err, data) => {
    //         response.end(data.toString())
    //     })
    // }
    // if (request.url.indexOf("/test?") !== -1) {
    //     console.log(url.parse(request.url,true))   
    // }







})

server.listen(5002, function () {
    console.log("正在监听中")
})