var express = require('express');
var router = express.Router();
var db = require('../../db/connect')

// 根据用户id查询所有的电话号码

// 1.号码查询
var sql = "select * from phone where cusid=? limit ?,?"

// 分页
let sqlTotal = 'select count(*) as total from phone where cusid=? '

router.post('/Api/userByCusid', function (req, res, next) {



    var reqbody = JSON.parse(req.body.data);

    let pageNum = parseInt(reqbody.pageNum) //当前页

    let pageSize = parseInt(reqbody.pageSize) //页大小

    let start = (pageNum - 1) * pageSize;

    let cusId = reqbody.cusId

    var data = [cusId, start, pageSize]


    let pages = 0
    let emptyData = [{
        name: "无",
        number: "无",
        uploadTime: "无"
    }]

    db.query(sql, data, (err, data) => {

        if (err) {
            consoe.log("账号不存在", err);
        } else {

            db.query(sqlTotal, [cusId], (err, totlList) => {

                pages = totlList[0].total / pageSize

                console.log("totlList", totlList);

                var P = String(pages).indexOf('.')

                if (P >= 1) {
                    pages = parseInt(pages) + 1
                }



                if (data.length != 0) {
                    res.send({
                        code: 1,
                        success: true,
                        list: data,
                        totle: totlList[0].total,
                        pageSize: pageSize,
                        pageNum: pageNum,
                        pages: pages
                    })
                } else {

                    res.send({
                        code: 0,
                        message: "通讯录为空",
                        list: emptyData,
                    })
                }


            })
        }
    })

});

module.exports = router;