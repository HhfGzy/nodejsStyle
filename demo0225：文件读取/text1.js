var fs = require("fs");
// fs.open('./demo.txt', "a",function(err,fd){

//     if(err == null){
//         console.log('执行正确')
//                 fs.close(fd,(err) => {
//                     if(err == null){
//                         console.log('关闭成功')
//                     }
//                 })
//     }else{
//         console.log('执行错误')
//     }
// })

// 读取文件
// fs.readFile("./demo.txt","utf-8",function(err,data){
//     console.log(err);
//     console.log(data);
// });

// fs.readFile("./demo.txt",function(err,data){
//     console.log(err);
//     console.log(data.toString());
// });

// 写入文件 
// fs.writeFile("./demo.txt","真的是这样子",{flag:'a'},function(err,data){
//         console.log(err);
//     });
// 删除文件
// fs.unlink("./demo1.txt",(err)=>{
//     console.log(err);
// })



// 新建目录
// fs.mkdir("./success", (err) => {
//     console.log(err);
// })
// 读取目录
// fs.readdir("./success", function (err,files) {
//     files.forEach(function (ele) {
//         console.log(ele);
//         fs.unlink(`./success/${ele}`,(err) =>{
//             if(err == null){
//                 console.log(`删除了${ele}文件`)
//             } else{
//                 console.log('你是猪')
//             }    
//         });
//     })
//     console.log(err);
// })
// 删除目录
// fs.rmdir("./success",(err)=>{
//     if(err == null){
//         console.log(已经删除文件夹)
//     }    
// })


// fs.writeFile("demo0225/demo.txt","bbbb",{flag:'3'},function (err) {
//     console.log(err)
// })

fs.writeFile("demo0225：文件读取/demo.txt","aaaa",{flag:'a'},function (err) {
    console.log(err)
})
fs.writeFile("./demo.txt","bbbbb",{flag:'a'},function (err) {
    console.log(err)
})
