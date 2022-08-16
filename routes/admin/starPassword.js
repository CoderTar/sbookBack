var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


router.post("/Api/adminStarPassword", function (req, res, next) {



    var obj = JSON.parse(req.body.data);


    let reqbody = obj

    console.log("object", reqbody);

    var sql = 'update account set  passWord=? where id=?'

    let data = [reqbody.passWord, reqbody.id]

    console.log("object", data);

    db.query(sql, data, (err, data) => {




        if (err) {

            console.log("数据库错误", err);
            res.send({
                code: 0,
                message: "操作失败",
            })

        } else {

            console.log("数据库状态", data.affectedRows);
            if (data.affectedRows > 0) {
                res.send({
                    code: 1,
                    message: "修改成功",
                })

            } else {
                res.send({
                    code: 0,
                    message: "修改失败",
                })
            }


        }
    })
})

module.exports = router;