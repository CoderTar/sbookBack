var express = require('express');
var router = express.Router();
var db = require('../../db/connect')

// 根据电话号码查询短信

// 1.号码查询
var sql = "select * from message where loginNum=? limit ?,?"

// 分页
let sqlTotal = 'select count(*) as total from message where loginNum=? '

router.post('/Api/userByNumMsg', function (req, res, next) {

    var reqbody = JSON.parse(req.body.data);
    let pageNum = parseInt(reqbody.pageNum) //当前页

    let pageSize = parseInt(reqbody.pageSize) //页大小

    let start = (pageNum - 1) * pageSize;

    let loginNum = reqbody.loginNum

    var data = [loginNum, start, pageSize]
    let pages = 0

    db.query(sql, data, (err, data) => {

        if (err) {
            consoe.log("账号不存在", err);
        } else {

            db.query(sqlTotal, [loginNum], (err, totlList) => {



                console.log("duagnxxhcaikgfdafdsa", totlList)
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