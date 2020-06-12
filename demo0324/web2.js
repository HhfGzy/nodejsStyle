var http = require("http");
var fs = require("fs");
var server = http.createServer();// 创建服务
server.on("request",function(request,response){// 当服务器被链接时候
    console.log("已经链接")
    let obj = '';
    let path = "C:/nodejsStyle";
    fs.readdir(path,function(err,fill){
        for(let i = 0;i<fill.length;i++){
            obj= obj +"  "+ fill[i];
        };
        //console.log(obj);
        return obj;
        // let strong = document.createElement("strong");
        // string.innerHTML = arr;
        // console.log(arr);
        // document.body.appendChild(strong);
    })   ;
    fs.writeFile("./文件目录.html",obj,{flag:"a"},function(err){
      console.log(err);
    })
    fs.readFile("./文件目录.html",function(err,data){
        response.setHeader("Content-Type","text/html;charset=utf-8");
        // 将数据返回给用户
        // response.write(data);
        response.end(data);
    })
})
server.listen(5002,function(){
    console.log("正在监听中")
})