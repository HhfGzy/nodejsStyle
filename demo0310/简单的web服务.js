var http = require("http");

// 创建server
var server = http.createServer();
// 处理请求
// request 请求对象 用来获取客户端请求的信息
// response 
server.on('request',function(request,response){
    console.log("得到请求")
    
    if (request.url =="/ok") {
        response.write("123你是猪");
        response.end();
    } else if(request.url == "/aa"){
        console.log("走开吧你")
    }
})

// 绑定端口
server.listen(5000,function(){
    console.log("server is running")
})