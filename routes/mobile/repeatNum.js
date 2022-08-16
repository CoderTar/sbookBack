var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


// 校验客户不能重复使用号码登录
router.post('/Api/mobile/checkNum', function (req, res, next) {


    console.log("obj", req.body);


    // 添加通讯录-添加多个

    var sql = "select * from customer where loginNum=?"


    var data = [req.body.loginNum]

    db.query(sql, data, (err, data) => {

        if (err) {
            console.log("添加失败", err);
        } else {
            console.log("已经存在", data);

            if (data.length > 0) {
                res.send({
                    code: 0,
                    message: "重复号码"
                })
            } else {
                res.send({
                    code: 1,
                    message: "新的号码"
                })
            }
        }
    })

    


});

module.exports = router;