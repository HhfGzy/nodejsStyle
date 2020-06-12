const template = require("art-template");
const fs = require("fs");
const http = require("http")


const server = http.createServer();

server.on("request", function (request, response) {
   
    fs.readFile("result.html", function (err, data) {
        if (err == null) {
            fs.readdir("C:\nodejsStyle\demo0331", (err, files) => {
                //将读取的文件放在data中，并且渲染到result.html中
                // template.render(files,data);
                const newRes = template.render(data.toString(), {
                    res: files
                    
                })
                console.log(newRes)
                response.end(newRes)
            })
        }

    })
})

server.listen(5002, function () {
    console.log("正在监听中")
})