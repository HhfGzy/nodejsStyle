var name = "gzy";
var age = 18;
var obj = {
    a:1111,
    b:2222,
    c:3333,
};
var arr = ['a','b','c','d']

var sum = function(){
    console.log("sum的方法")
    return "好了"
}
console.log("你是不是猪呀？")
// module.exports.name = name;
// module.exports.age = age;
//module.exports ={name,age,sum,obj,arr};
exports.name = name;
exports.age = age;
