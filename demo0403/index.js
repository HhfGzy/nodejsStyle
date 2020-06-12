//const template = require("art-template");
const fs = require("fs");
const http = require("http");
const url = require("url");


const server = http.createServer();

server.on("request", function (request, response) {
    if (request.url === "/") {
        fs.readFile("index.html", (err, data) => {
            response.end(data.toString())
        })
    }
    if (request.url === "/go") {
        fs.readFile("test.html", (err, data) => {
            response.end(data.toString())
        })
    }

    if (request.url === "/go?test") {
        fs.readFile("test.html", (err, data) => {
            response.end(data.toString())
        })
    }
    if (request.url.indexOf("/test?") !== -1) {
        // fs.readFile("./test.html",(err,data)=>{
        //     response.end(data.toString())
        // })
        //console.log(url);
        console.log(url.parse(request.url,true))

        
        
    }


})

server.listen(5002, function () {
    console.log("正在监听中")
})