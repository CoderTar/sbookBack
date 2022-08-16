var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


// 移动端更新客户最后进入的时间

router.post("/Api/lastLoginTime", function (req, res, next) {



    console.log("req", obj);

    var sql = 'update account set  lastTime=? where id=?'

    let data = [req.body.lastTime, req.body.id]

  
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