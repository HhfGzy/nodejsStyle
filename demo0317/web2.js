var http = require("http");
var fs = require("fs");

// 创建server
var server = http.createServer();
// 处理请求
// request 请求对象 用来获取客户端请求的信息
// response 
server.on('request',function(request,response){
    // setHeader():解决中文乱码
    // Content-Type：相应类型
    // 字符编码
    fs.readFile("./text1.txt",function(err,data){
        response.setHeader("Content-Type","text/plain;charset=utf-8");
        // 将数据返回给用户
        response.write(data);
        response.end();
    })
        
   
})

// 绑定端口
server.listen(5002,function(){
    console.log("server is running")
})