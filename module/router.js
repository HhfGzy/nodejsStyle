const express = require('express');
const service = require('./service');
const fs = require('fs');
// console.log('router模块');
// 创建路由
const router = express.Router();
router.get('/', (req, res) => {
    // console.log('--------------')
    // fs.readFile('./view/login.html',(err,data)=>{
    //     // console.log(err)
    //     // console.log(data.toString())
    //     res.end(data.toString());
    // })
    service.loginPage(function (data) {
        //    将数据返回给页面
        res.end(data)
    })
}).post('/login', (req, res) => {
    service.userLogin(req.body, function (num, data) {
        //这时候是返回一个html页面
        // 1.用fs
        // 2.用渲染引擎

        if (num===1) {
            res.redirect(302,'/selectAll')
        } else {
            res.render(data,{})
        }
 
    })
}).get('/selectAll',(req,res)=>{
    service.showAll(function (data) {
        res.render('show.html',{
            movies:data
        })

      } )
    
})








// 导出路由
module.exports = router;










