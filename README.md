# DengNi
The first project of the emmmm group(2017/10/2)
## 四.前台访问后台API规范

```
$.get("/",fuction(){

})
$.post("/",date,fuction(ans){

})
$.ajax({
url: "ajax/ajax_selectPicType.aspx",
data:{Full:"fu"},
type: "POST",
dataType:'json',
success:CallBack,
error:function(er){
BackErr(er);}
});
```


## 数据库相关知识：
### 这里使用了orm.js来管理SQLite数据库
#### 数据连接
```
//引入orm包
let orm = require('orm');
//设置orm连接
let db = orm.connect('sqlite:movie.db', function(err, db) {
    if (err) {
        return console.error('Connection error: ' + err);
    }else {
        return db;
    }
});
/*
    假设数据库movie.db里面已经有一张表person而且在这张表里面有id和name这两个字段(还可能有多个字段但是不影响取数据)
*/
//定义数据
let Per = db.define("person", {
    id: {type: 'number'},
    name: {type: 'text'}
});
//增加数据
Per.create({
    id : 2,
    name : '老王'
},function (err) {
    if(err){
        console.log(err);
    }
});
/*
    添加的数据
    id = 2
    name = 老王
    注意！这里添加的数据的Key必须与数据库里面的字段对应
*/
//查询数据
Per.find({id:1},function (err,ans) {
    console.log(ans.length);
    console.log(ans[0].name);
});
/*
    输出的数据
    1
    小王
    注意！这里取出的数据ans是一个数组对象
*/
//修改数据
Per.find({id:1},function (err,ans) {
    console.log(ans[0].name);
    ans[0].name = '小李';
    ans[0].save(function (err) {
        if(err){
            console.log(err);
        }
    })
});
/*
    输出的数据
    小王
    注意！执行save函数后如果未抛出异常即数据库person表内id为1的这条数据中的name值有小王更改为小李
*/
//删除数据
Per.find({id:1},function (err,ans) {
    console.log(ans[0].name);
    ans[0].remove(function (err) {
        if(err){
            console.log(err);
        }
    })
});
/*
    注意！执行remove函数后如果未抛出异常即数据库person表内id为1的这条数据从数据库中移除
*/
```
[orm中文文档地址](https://wizardforcel.gitbooks.io/orm2-doc-zh-cn/content/index.html)

[orm官方文档的地址](https://www.npmjs.com/package/orm)
#### 结合express使用orm
```
//引入依赖文件
let express = require('express');
let orm = require('orm');
let app = express();
//express引入数据对象
app.use(orm.express("sqlite:testDB.db", {
    define: function (db, models, next) {
        models.Per = db.define("person", {
            id: {type: 'number'},
            name: {type: 'text'},
            age: {type: 'text'},
            continent: {type: 'text'},
            photo: {type: 'text'}
        });
        //otherTable...
        next();
    }
}));
//数据添加
app.get('/',function (req,res) {
    req.models.Per.create({
        id:1,
        name:"小王"
    },function (err) {
        console.log(err);
    })
});
/*
    用浏览器访问根地址既可以在数据库中添加一条数据
*/
//数据查询
app.get('/',function (req,res) {
    req.models.Per.find({id:1},function (err,ans) {
        res.json(ans[0]);
    })
});
/*
    用浏览器访问根地址返回的数据为
    {"id":1,"name":"小王","age":null,"continent":null,"photo":null}
    可以用axios接收数据进行处理
*/
//修改数据
app.get('/',function (req,res) {
    req.models.Per.find({id:1},function (err,ans) {
        ans[0].name = "小李";
        ans[0].save();
        res.json(ans[0]);
    })
});
/*
    用浏览器访问根地址返回的数据为
    {"id":1,"name":"小李","age":null,"continent":null,"photo":null}
    即数据已经修改
*/
//删除数据
app.get('/',function (req,res) {
    req.models.Per.find({id:1},function (err,ans) {
        ans[0].remove();
    })
});
/*
    用浏览器访问根地址
    查看数据库，数据已经被删除
*/
```

