// 1.通过账号查询

var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


router.post('/Api/selectByNickName', function (req, res, next) {

    var obj = JSON.parse(req.body.data);
    let sql = "select id,nickName,realName,online,state,loginTime,updateTime,createTime,state,memo from account where nickName=? "

    db.query(sql, obj.nickName, (err, data) => {

        if (err) {
            console.log("数据库连接错误");

            res.send({
                code: 0,
                message: "操作失败",
            })

        } else {

            console.log("data", data);

            if (data.length != 0) {

                res.json(200, {
                    code: 1,
                    data: data,
                    message: "查找成功"
                })

            } else {

                res.json(200, {
                    code: 0,
                    message: "账号不存在",
                    data: []
                })
            }
        }
    })
})


module.exports = router;