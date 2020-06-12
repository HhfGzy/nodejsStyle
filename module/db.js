const mysql = require('mysql');
// 创建链接数据库
const conn = mysql.createConnection({
    host:'localhost',
    port:'3303',
    user:'root',
    password:'123456',
    database:'hhf1'
});

// 链接
conn.connect();


// 定义变量
let sql = "";
let params = "";

exports.selectOne = function(mess,callback){
    // console.log(mess.name)
    sql = "select * from login5 where name =? and password =?";
    params = [mess.name, mess.pwd];
    conn.query(sql,params,(err,result)=>{
        //  console.log(result)
        callback(result)
    })
};
exports.selectAll = function(callback){
   
    sql = "select * from movie";
    conn.query(sql,(err,result)=>{
        // 将数据传出去
        callback(result);
    })
}



