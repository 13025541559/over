const express = require('express');
const router = express.Router();
const DB = require('../module/DB/DB')


router.get('/list.html',function (req,res) {
    let pageNo = req.query.pageNo?req.query.pageNo:1;  // 当前页数
    let queryProName = req.query.proName;
    // console.log(pageNo);
    let queryObj = {};
    // 拼接查询条件
    if(queryProName){
        queryObj.proName = eval('/'+queryProName+'/')
        // eval方法，用于将字符串转换为js代码
    }

    let pageSize = 5;// 页大小
    DB.count('provider',queryObj,function (error,totalCount) {
        if(error){console.log(error);return;}
        let totalPageCount = Math.ceil(totalCount/pageSize) ;// 获得总页数
        let start = (pageNo-1)*pageSize;
        DB.pagination('provider',queryObj,start,pageSize,function (err,providerlist) {
            res.render("provider/providerlist",{providerlist,pageSize,pageNo,totalCount,totalPageCount})
        })
    })
});
router.get('/view/:_id.html',function (req,res) {
    let _id = DB.ObjectId(req.params._id);
    DB.find('provider',{_id},function (err,result) {
        res.render('provider/providerview',{provider:result[0]})
    })
});
router.get('/remove/:_id',function (req,res) {
    let _id = DB.ObjectId(req.params._id);
    DB.removeOne('provider',{_id},function (err,result) {
        res.redirect('/provider/list.html')
    })
});
router.get('/add.html',function (req,res) {
    res.render('provider/provideradd');
});
router.post('/save',function (req,res) {
    let provider = {
        proCode: req.body.proCode,
        proName: req.body.proName,
        proContact: req.body.proContact,
        proPhone: req.body.proPhone,
        proAddress: req.body.proAddress,
        proFax: req.body.proFax,
        proDesc: req.body.proDesc,
        creationDate: req.body.creationDate
    };
    DB.insertOne('provider',provider,function (err,data) {
        if(err){console.log(err);return;}
        res.redirect('/provider/list.html')
    })
});
router.get('/update/:_id.html',function (req,res) {
    let _id = DB.ObjectId(req.params._id);
    DB.find('provider',{_id},function (err,result) {
        res.render('provider/providerupdate',{provider:result[0]});
    })
});
router.post('/updated',function (req,res) {
    let date=new Date();
    let _id = DB.ObjectId(req.body._id);
    let provider = {
        proCode: req.body.proCode,
        proName: req.body.proName,
        proContact: req.body.proContact,
        proPhone: req.body.proPhone,
        proAddress: req.body.proAddress,
        proFax: req.body.proFax,
        proDesc: req.body.proDesc,
    };
    DB.updateOne('provider',{_id},provider,function (err, result) {
        if(err){console.log(err);return;}
        res.redirect('/provider/list.html')
    })
})
module.exports = router;