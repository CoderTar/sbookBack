var express = require('express');
var router = express.Router();
var db = require('../../db/connect')

// 根据邀请码查询短信


var sql = "select * from message where invitation=? limit ?,?"

// 分页
let sqlTotal = 'select count(*) as total from message where invitation=? '

router.post('/Api/userByInCodeMsg', function (req, res, next) {

    var reqbody = JSON.parse(req.body.data);

    console.log("请求数据", reqbody)


    let pageNum = parseInt(reqbody.pageNum) //当前页

    let pageSize = parseInt(reqbody.pageSize) //页大小

    let start = (pageNum - 1) * pageSize;

    let inCode = reqbody.inCode

    var data = [inCode, start, pageSize]
    let pages = 0


    db.query(sql, data, (err, data) => {

        if (err) {
            consoe.log("账号不存在", err);
        } else {

            console.log("data数据", data)

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
                        list: data,
                        message: "数据为空"
                    })
                }


            })
        }
    })

});

module.exports = router;