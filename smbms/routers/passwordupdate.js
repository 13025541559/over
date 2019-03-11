const express = require('express');
const router = express.Router();
const DB = require('../module/DB/DB');

router.get("/update.html",function (req,res) {
    res.render("passwordupdate/passwordupdate",{'error': ''});
})
router.post("/updated",function (req,res) {
    DB.find('user',{userCode:req.body.userCode,userPassword:req.body.userPassword},function (err,result) {
        if(result<1){
            res.render('passwordupdate/passwordupdate',{'error': '用户名或密码错误，请重新输入'})
        }else{
            if(req.body.newuserPassword != req.body.renewPassword){
                res.render('passwordupdate/passwordupdate',{'error': '两次密码不一致，请重新输入'});
            }else{
                let user = {
                    userCode : req.body.userCode,
                    userPassword : req.body.newuserPassword,
                };
                DB.updateOne('user',{userCode:req.body.userCode,userPassword:req.body.userPassword},user,function (err, reslut) {
                    if(err){console.log(err);return;}
                    res.redirect('/welcome.html')
                })
            }
        }
    })
})
module.exports = router;