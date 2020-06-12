const db = require('./db');
const fs = require('fs')
// console.log('service模块');
//读取默认页面
exports.loginPage = function (callback) {
    fs.readFile('./views/login.html', (err, data) => {
        callback(data.toString())
    })
};
// 查询一个
exports.userLogin = function (mess, callback) {
    // 链接数据库
    // console.log(mess);
    db.selectOne(mess, function (data) {
        // 将数据转换成json格式
        data = JSON.parse(JSON.stringify(data))
        // console.log(data)
        if (data[0] !== undefined) {
            // 登录成功
            // callback(data[0].name, 'success.html');
            callback(1, 'success.html')
            
        } else {
            //登录失败
            callback(2,'fail.html')
        }
    })
};

// 显示全部
exports.showAll = function (callback) {

    db.selectAll( function(data){
        // 将数据传出
        callback(data)
    })

 }