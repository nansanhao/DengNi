'use strict';
let express =require('express');
let orm=require('orm');
let bodyparser=require("body-parser");
let mailer=require("./mailer");
let multer = require('multer');
let upload = multer();
let app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(orm.express("sqlite:public/DengNi.db",{
    define:function (db,models,next) {
        models.Users=db.define("USERS",{
            id:{type:'text'},
            password:{type:'text'},
            sex:{type:'text'},
            phoneNumber:{type:'number'},
            qqNumber:{type:'text'},
            BBS:{type:'text'},
            pairedId:{type:'text'},
            groups:{type:'text'}
        });
        models.Groups=db.define("GROUPS",{
            id:{type:'text'},
            name:{type:'text'},
            groupHolderId:{type:'text'},
            BBS:{type:'text'},
            tags:{type:'text'},
            description:{type:'text'}
        });
        next();
    }
}));
//API
//显示主页面
app.get('/',function (req,res) {
    res.sendFile(__dirname+"/public/html/index.html")


});


//服务器
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});

