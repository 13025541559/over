const express = require('express');
const router = express.Router();
const DB = require('../module/DB/DB');

router.get('/list.html',function (req,res) {
    let pageNo = req.query.pageNo?req.query.pageNo:1;
    let queryUserName = req.query.userName;
    let queryObj = {};
    if(queryUserName){
        queryObj.userName = eval('/'+queryUserName+'/')
    }
    let pageSize = 5;
    // var arr1=[];
    // DB.find('bill',{},function (err,result) {
    //     for(let i=0;i<result.length;i++){
    //         DB.find("provider",{id:result[i].id},function (error,data) {
    //
    //             arr1.push(data[0].proName);
    //             console.log(arr1);
    //         })
    //
    //     }
    //
    // });

    DB.count('bill',queryObj,function (error,totalCount) {
        if(error){console.log(error);return;}
        let totalPageCount = Math.ceil(totalCount/pageSize);
        let start = (pageNo-1)*pageSize;
        DB.pagination('bill',queryObj,start,pageSize,function (err,billlist) {
            res.render("bill/billlist",{billlist,pageSize,pageNo,totalCount,totalPageCount})
        })
    })

});
module.exports=router;