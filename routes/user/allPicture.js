var express = require('express');
var router = express.Router();
var db = require('../../db/connect')



var sql = `select * from picture order by id desc limit ?,?`


// 从n开始往后查m条
let sqlTotal = 'select count(*) as total from picture'


router.post('/Api/getAllPicture', function (req, res, next) {



    var reqbody = JSON.parse(req.body.data);

    console.log("req", reqbody);



    let pageNum = parseInt(reqbody.pageNum) //当前页

    let pageSize = parseInt(reqbody.pageSize) //页大小

    let start = (pageNum - 1) * pageSize;

    var data = [start, pageSize]

    let pages = 0




    db.query(sql, data, (err, data) => {

        if (err) {
            console.log("账号不存在", err);
        } else {



            console.log("datadatadatadata", data)

            db.query(sqlTotal, (err, totlList) => {

                pages = totlList[0].total / pageSize


                console.log("totlList", totlList);

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