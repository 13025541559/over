const express = require('express');
const router = express.Router();
const DB = require('../module/DB/DB')


router.get("/list",function (req,res) {
    DB.find('role',{},function (err,data) {
        // res.render() 加载页面的
        // res.send() 发送数据
        res.send(data)
    })

})

module.exports = router;