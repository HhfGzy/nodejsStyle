var http = require("http");
var fs = require("fs");
var server = http.createServer();// 创建服务
server.on("request",function(request,response){// 当服务器被链接时候
    console.log("已经链接")
    if(request.url === "/read"){
        fs.readFile("作业/0310作业/text.txt",function(err,data){
            if (err == null ) {
                console.log(data.toString());
            }else{
                console.log('读取文件错误');
            }
        })
    }else{
        console.log("让你打read呢");
    }
})
server.listen(5002,function(){
    console.log("正在监听中")
})