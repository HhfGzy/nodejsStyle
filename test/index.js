const fs = require("fs");
const http = require("http");
const template = require("art-template");
const url = require("url");

const server = http.createServer();
server.on("request",(Request,Response)=>{
    fs.readFile("./index.html",(err,data)=>{
        fs.readdir("C:/Users/黄海峰/Desktop/前端",(err,files)=>{
            // template.render(file,data),file:是字符串
           const newHtml = template.render(data.toString(),{
                ref:files,
            });
            // 最后要把结果返回出去
            Response.end(newHtml)
        })

    })
}) 
server.listen(5003,()=>{
    console.log("5003端口监听已经开始")
})