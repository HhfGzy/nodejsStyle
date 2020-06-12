var http = require("http");

// 创建server
var server = http.createServer();
// 处理请求
// request 请求对象 用来获取客户端请求的信息
// response 
server.on('request',function(request,response){
    console.log("得到请求")
    
    if (request.url =="/ok") {
        response.setHeader()
        response.write("可以了");
        response.end();
    } else if(request.url == "/aa"){
        response.write("走开吧你")
        response.end();
    }
})

// 绑定端口
server.listen(5001,function(){
    console.log("server is running")
})