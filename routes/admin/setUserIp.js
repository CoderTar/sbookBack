var express = require('express');
var router = express.Router();
var db = require('../../db/connect')

//根据用户id更新ip-地址-登录时间
router.post("/Api/adminSetIp", function (req, res, next) {


    var obj = JSON.parse(req.body.data);

    console.log("req", obj);

    let reqbody = obj

    var sql = 'update account set  address=?, location=? where id=?'

    let data = [reqbody.address, reqbody.location, reqbody.id]



    db.query(sql, data, (err, data) => {


        if (err) {
            console.log("操作失误");
        } else {

            res.send({
                code: 1,
                message: "修改成功",
            })
        }
    })
})

module.exports = router;