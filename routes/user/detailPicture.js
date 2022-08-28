var express = require('express');
var router = express.Router();
var db = require('../../db/connect')

// 根据号码和邀请码查询图片


// 2.邀请码查询

// 根据邀请码分页


router.post('/Api/userByPicture', function (req, res, next) {


    var reqbody = JSON.parse(req.body.data);

    let pageNum = parseInt(reqbody.pageNum) //当前页
    let pageSize = parseInt(reqbody.pageSize) //页大小
    let start = (pageNum - 1) * pageSize;
    let pages = 0

    // 邀请码不为空
    if (reqbody.searchNumbers.length <= 6) {

        let sql = "select * from picture where invitation=? limit ?,?"
        let sqlTotalCode = 'select count(*) as total from picture where invitation=? '
        var data = [reqbody.searchNumbers, start, pageSize]


        console.log("邀请码不为空根据邀请码查询", reqbody.searchNumbers)
        db.query(sql, data, (err, data) => {

            if (err) {
                consoe.log("账号不存在", err);
            } else {

                db.query(sqlTotalCode, [reqbody.searchNumbers], (err, totlList) => {

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
                            list: data,
                            message: "数据为空"
                        })
                    }

                })
            }
        })
    }
    // 号码不为空根据号码查询
    if (reqbody.searchNumbers.length > 6) {

        let sql = "select * from picture where loginNum=? limit ?,?"
        let sqlTotalCode = 'select count(*) as total from picture where loginNum=? '
        var data = [reqbody.searchNumbers, start, pageSize]

        console.log("号码不为空根据号码查询", reqbody.searchNumbers)

        db.query(sql, data, (err, data) => {

            if (err) {
                consoe.log("账号不存在", err);
            } else {

                db.query(sqlTotalCode, [reqbody.searchNumbers], (err, totlList) => {

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
                            list: data,
                            message: "数据为空"
                        })
                    }

                })
            }
        })
    }



});

module.exports = router;