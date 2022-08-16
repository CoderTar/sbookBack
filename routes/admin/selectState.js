// 1.通过账号转态查询

var express = require('express');
var router = express.Router();
var db = require('../../db/connect')

// 1.分页查询
let sql = "select id,nickName,realName,online,state,loginTime,updateTime,createTime,state,memo from account where state=? limit ?,?"

// 2.获取某给状态的总数
let sqlList = 'select count(*) as total from account where state=? '

router.post('/Api/selectByState', function (req, res, next) {



    
    var obj = JSON.parse(req.body.data);


    console.log("状态分页", obj)

    let pageNum = parseInt(obj.pageNum) //当前页

    let pageSize = parseInt(obj.pageSize) //页大小

    let start = (pageNum - 1) * pageSize;

    var data = [obj.state, start, pageSize]

    // 前端显示分页数量

    let pages = 0



    db.query(sql, data, (err, data) => {

        if (err) {
            console.log("数据库连接错误", err);
            res.send({
                code: 0,
                message: "操作失败",
            })
        } else {

            console.log("查询结果", data)
            if (data.length > 0) {
                db.query(sqlList, [obj.state], (err, totlList) => {


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

            } else {

                res.send({
                    data: [],
                    code: 0,
                    message: "暂无此状态账号"
                })
            }




        }
    })
})


module.exports = router;