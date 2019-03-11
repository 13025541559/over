const express = require('express');
const router = express.Router();
const DB = require('../module/DB/DB');
const multiparty = require('multiparty')

router.get('/list.html',function (req,res) {
    let pageNo = req.query.pageNo?req.query.pageNo:1;  // 当前页数
    let queryUserName = req.query.userName;
    // console.log(pageNo);
    let queryObj = {};
    // 拼接查询条件
    if(queryUserName){
        queryObj.userName = eval('/'+queryUserName+'/')
        // eval方法，用于将字符串转换为js代码
    }

    let pageSize = 5;// 页大小
    DB.count('user',queryObj,function (error,totalCount) {
        if(error){console.log(error);return;}
        let totalPageCount = Math.ceil(totalCount/pageSize) ;// 获得总页数
        let start = (pageNo-1)*pageSize;
        DB.pagination('user',queryObj,start,pageSize,function (err,userlist) {
            res.render("user/userlist",{userlist,pageSize,pageNo,totalCount,totalPageCount})
        })
    })
});

router.get('/view/:_id.html',function (req,res) {
    let _id = DB.ObjectId(req.params._id);
    DB.find('user',{_id},function (err,result) {
        res.render('user/userview',{user:result[0]})
    })
});
// router.get('/removedata/:_id',function (req,res) {
//     let _id = DB.ObjectId(req.params._id);
//     DB.find('user',{_id},function (err,result) {
//         console.log(result);
//         res.send(result[0]);
//     })
// });
router.get('/remove/:_id',function (req,res) {
    let _id = DB.ObjectId(req.params._id);
    console.log(_id);
    DB.removeOne('user',{_id},function (err,result) {
        res.redirect('/user/list.html')
    })
})
router.get('/add.html',function (req,res) {
    res.render('user/useradd');
});
router.post('/save',function (req,res) {
    let form = new multiparty.Form();
    form.uploadDir = 'upload';
    form.parse(req,function (err, fields, files) {
        let user = {
            userCode: fields.userCode[0],
            userName: fields.userName[0],
            userPassword: fields.userPassword[0],
            gender: fields.gender[0],
            birthday: fields.birthday[0],
            phone: fields.phone[0],
            address: fields.address[0],
            userRole: fields.userRole[0],
            idPicPath : files.pic[0].path
        };
        DB.insertOne('user',user,function (err,data) {
            if(err){console.log(err);return;}
            res.redirect('/user/list.html')
        })
    })
});
router.get('/update/:_id.html',function (req,res) {
    let _id = DB.ObjectId(req.params._id);
    DB.find('user',{_id},function (err,result) {
        res.render('user/userupdate',{user:result[0]});
    })
});
router.post('/updated',function (req,res) {
    let form = new multiparty.Form();
    form.uploadDir = 'upload';
    form.parse(req,function (err, fields, files) {
        console.log(fields) // 获取普通表单的数据
        //console.log(files) // 文件上传后返回的信息
        let _id = DB.ObjectId(fields._id[0]);

        let user = {
            userName: fields.userName[0],
            gender: fields.gender[0],
            birthday: fields.birthday[0],
            phone: fields.phone[0],
            address: fields.address[0],
            userRole: fields.userRole[0],
        }
        console.log(new Date().getFullYear());
        console.log(fields.birthday[0].getFullYear());
        // 当存在原始文件名的时候，表示有上传文件
        if(files.pic[0].originalFilename){
            user.idPicPath = files.pic[0].path;
        }else{// 没有上传的文件，需要删除冗余的占位文件
            console.log(files.pic[0].path);
            fs.unlink(files.pic[0].path,function (err) {})
        }
        DB.updateOne('user',{_id},user,function (err, reslut) {
            if(err){console.log(err);return;}
            res.redirect('/user/list.html')
        })
    })
})
module.exports=router;