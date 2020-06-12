var fs = require('fs');
// 打开文件,和关闭文件
// fs.open("./text1.txt",'a',function(err,fd){
//     console.log(err,fd);
//     // fs.close(fd,function(ele){
//     //     console.log(fd,"已经关闭")
//     // })
// })

// 追加文件
// fs.writeFile("demo作业/text1.txt", "你说什么就是什么吧",{flag:'a'}, function (err) {
//     if (err == null) {
//         // 读取文件
//         fs.readFile("demo作业/text1.txt", function (err, data) {
//             console.log(data.toString());
//         })
//     }
// })
// 删除文件
// fs.unlink("demo作业/text2.txt",function(err){
//     if(err == null ){
//         console.log('删除成功')
//     }
// })

//  创建新的文件夹
// fs.mkdir("newIndex", (err) => {
//     if (err == null) {
//         console.log(`创建文件夹成功`)
//     }
// })

// 读取目录
// fs.readdir("newIndex", function (err, files) {
//     files.forEach(function (ele) {
// //删除文件夹中的文件
//         fs.unlink(`newIndex/${ele}`, function (err) {
//             if (err == null) {
//                 console.log(`删除了${ele}文件`)
//             }
//         })
//     })
// 删除文件夹
//     fs.rmdir("newIndex", function (err) {
//         if (err == null) {
//             console.log("删除成功")
//         } else {
//             console.log('删除失败')
//         }
//     })
// })










