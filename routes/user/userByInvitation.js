var express = require('express');
var router = express.Router();
var db = require('../../db/connect')

// 根据邀请码查询用户

// 1.查询邀请码
var sql = "select * from customer where invitation=? order by lastTime desc limit ?,?"

// 分页
let sqlTotal = 'select count(*) as total from customer where invitation=?'

router.post('/Api/userBycode', function (req, res, next) {

    // 1.查询邀请码


    var reqbody = JSON.parse(req.body.data);

    let pageNum = parseInt(reqbody.pageNum) //当前页

    let pageSize = parseInt(reqbody.pageSize) //页大小

    let start = (pageNum - 1) * pageSize;

    let inCode = reqbody.inCode

    var data = [inCode, start, pageSize]
    let pages = 0

    db.query(sql, data, (err, data) => {

        if (err) {
            console.log("账号不存在", err);

            res.send({
                code: 0,
                message: "操作失败"
            })
        } else {

            db.query(sqlTotal, [inCode], (err, totlList) => {

                pages = totlList[0].total / pageSize
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
                        message: "查找失败"
                    })
                }

            })
        }
    })

});

module.exports = router;