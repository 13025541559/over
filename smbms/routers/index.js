const express = require('express');
const router = express.Router();
const DB = require('../module/DB/DB');

router.get(['/','/login','/login.html',{'error': '用户名或密码错误，请重新输入'}],function (req,res) {
    res.render('login');
});
router.post('/dologin',function (req,res) {
    DB.find('user',req.body,function (err,data) {
        if (err) { console.log( err ); return; }
        if (data.length<=0) {
            res.render('login',{'error': '用户名或密码错误，请重新输入'})
        }else {
            req.session.userinfo = data[0];
            req.app.locals.userName=req.session.userinfo.userName;
            res.redirect('/welcome.html');
        }
    })
});
router.get('/welcome.html',function (req,res) {
    res.render('welcome');
});
router.get('/logout',function (req,res) {
    req.session.destroy();
    res.redirect('/login')
})

module.exports = router;