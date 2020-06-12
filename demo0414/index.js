const fs = require("fs");
const http = require("http");
const url = require("url");

const server = http.createServer();

server.on('request', (Request, Response) => {
        if (Request.url === "/") {
                fs.readFile('./index.html', (err, data) => {
                        Response.end(data.toString());
                })
        }
        if (Request.url.startsWith("/public/")) {
                fs.readFile('.' + Request.url, (err, data) => {
                        Response.end(data.toString());
                })
        }
});



server.listen(5003, () => {
        console.log("5003监听已经")
});