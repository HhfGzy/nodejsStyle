const http = require("http");
const fs = require("fs");
const url = require("url");
const template = require("art-template");
const querystring = require("querystring");
let movie = [
    { id: "001", movieName: "夺冠", moviePrice: "30.0", movieTime: "2020-4-13" },
    { id: "002", movieName: "花木兰", moviePrice: "32.0", movieTime: "2020-4-14" },
    { id: "003", movieName: "唐人街探案", moviePrice: "33.0", movieTime: "2020-4-15" },
    { id: "004", movieName: "姜子牙", moviePrice: "30.0", movieTime: "2020-4-16" }
];

http.createServer().on('request', (Request, Response) => {
    const urlObj = url.parse(Request.url, true);
    if (urlObj.pathname === "/") {

        fs.readFile('./view/index.html', (err, data) => {
            const newHtml = template.render(data.toString(), {
                movies: movie,
            })
            Response.end(newHtml);
        });
    }
    if (urlObj.pathname.indexOf('/del') !== -1) {
        movie.forEach((item, index) => {
            // 如果传入的id值和数组中的id值相同的h话就删除
            if (item.id === urlObj.query.id) {
                movie.splice(index, 1);
                //console.log(movie);
            }
        });
        // 重新对页面进行渲染
        // fs.readFile('./view/index.html',(err,data)=>{

        //     const newHtml = template.render(data.toString(),{
        //          movies : movie,
        //      })
        //      Response.end(newHtml);
        //  });
        Response.statusCode = 302;
        // 设置头部 
        Response.setHeader("Location", "/");
        Response.end();

    }

    // 添加用户,post
    if (urlObj.pathname === "/add") {
        console.log("添加")

        let requestData = "";
        // 获取数据
        Request.on('data', (res) => {
            requestData += res;
        })
        // 获取数据结束
        Request.on('end', () => {
            //console.log(requestData) 
            // 将字符串转化成对象
            let newRequestData = querystring.parse(requestData);
            console.log(newRequestData);
            movie.push(newRequestData);
        })
        Response.statusCode = 302;
        Response.setHeader("Location", '/');
        Response.end();
    }

    // 修改用户
    if (urlObj.pathname.indexOf("update") !== -1) {
        console.log("正在修改")
        console.log(urlObj.query.id);
        //    此時返回出來的是数组
        let updateData = movie.filter((item, index, array) => {
            return item.id === urlObj.query.id
        })
        fs.readFile("./view/updatePage.html", (err, data) => {
            const newUpdate = template.render(data.toString(), {
                updateData: updateData
            })
            Response.end(newUpdate);
        })
    }

    if (urlObj.pathname === "/modify") {
        let modifyDate = '';
        Request.on('data', (ref) => {
            modifyDate += ref;
            //console.log(modifyDate);
        });
        Request.on('end', () => {
            // 将数据转化成字符串
            modifyDate = querystring.parse(modifyDate);
            console.log(movie)
            console.log(modifyDate);
            movie.forEach((item, index) => {
                if (item.id === modifyDate.id) {                
                    movie.splice(index, 1, modifyDate);
                    Response.statusCode = 302;
                    Response.setHeader("Location", '/');
                     Response.end();
                }
            });
        })
    }







}).listen('5002', () => {
    console.log("5002端口已开启");


})