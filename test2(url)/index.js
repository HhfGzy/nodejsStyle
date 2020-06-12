const fs = require("fs");
const http = require("http")
const template = require("art-template");
const url = require("url");


const server = http.createServer();

server.on('request', (Request, Response) => {

    if (Request.url === "/") {
        fs.readFile("./index.html", (err, data) => {
            Response.end(data.toString());

        })
    } else if (url.parse(Request.url, true).query.username === "gzy") {
        fs.readFile("./success.html", (err, data) => {
            Response.end(data.toString())
        })
    }



})


server.listen(5003, () => {
    console.log('5003端口已开启');
})