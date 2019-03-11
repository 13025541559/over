const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const index = require('./routers/index');
const user = require('./routers/user');
const role = require('./routers/role');
const bill = require('./routers/bill');
const provider = require('./routers/provider');
const passwordupdate = require('./routers/passwordupdate');


const app = express();

app.set('view engine','ejs')// 设置模板引擎类型为ejs
app.set('views',path.join(__dirname,'views'))// 设置模板页面位置
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: false }))// parse application/x-www-form-urlencoded
app.use(bodyParser.json())// parse application/json

app.use(session({
    secret:'is a random string',// 返回给客户端保存在cookie中的value的加密签名方式，可以随意写
    name:'session_id',// 保存在客户端cookie中的key名，默认是connect.sid，可以不写
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*30 // session默认过期时间 30分钟
    },
    rolling:true//每次操作强制刷新session过期时间
}));

app.use('/',index);
app.use('/user',user);
app.use('/role',role);
app.use('/bill',bill);
app.use('/provider',provider);
app.use('/passwordupdate',passwordupdate);


app.listen(3000);