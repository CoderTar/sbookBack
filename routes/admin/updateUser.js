var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


router.post("/Api/adminUpdateUser", function (req, res, next) {


    var obj = JSON.parse(req.body.data);


    console.log("obj", obj);


    var sql = 'update account set  realName=?,memo=? where id=?'

    let data = [obj.realName, obj.memo, obj.id]

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