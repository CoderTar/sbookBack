var express = require('express');
var router = express.Router();
var db = require('../../db/connect')



var sql = "select id,nickName,realName,loginTime,address,location,memo from account where online=? limit ?,?"
// n-m
// 从n开始往后查m条
let sqlTotal = 'select count(*) as total from account where online=? '

router.post('/Api/GetOnlineAccount', function (req, res, next) {


    var obj = JSON.parse(req.body.data);

    let pageNum = parseInt(obj.pageNum) //当前页

    let pageSize = parseInt(obj.pageSize) //页大小

    let start = (pageNum - 1) * pageSize;

    var data = [1, start, pageSize]

    let pages = 0



    db.query(sql, data, (err, data) => {

        if (err) {
            console.log("账号不存在", err);
            res.send({
                code: 0,
                message: "操作失败"
            })
        } else {


            db.query(sqlTotal, [1], (err, totlList) => {


                pages = totlList[0].total / pageSize
                var P = String(pages).indexOf('.')

                if (P >= 1) {
                    pages = parseInt(pages) + 1
                }

                res.send({
                    code: 1,
                    success: true,
                    list: data,
                    totle: totlList[0].total,
                    pageSize: pageSize,
                    pageNum: pageNum,
                    pages: pages
                })
            })
        }
    })

});

module.exports = router;