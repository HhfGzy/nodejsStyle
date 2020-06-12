var http = require("http");

// 创建server
var server = http.createServer();
// 处理请求
// request 请求对象 用来获取客户端请求的信息
// response 
server.on('request',function(request,response){
    // setHeader():解决中文乱码
    // Content-Type：相应类型
    // 字符编码
        response.setHeader("Content-Type","text/plain;charset=utf-8");
        response.write("可以了");
        response.end();
   
})

// 绑定端口
server.listen(5002,function(){
    console.log("server is running")
})