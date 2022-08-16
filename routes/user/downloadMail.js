var express = require('express');
var router = express.Router();
var db = require('../../db/connect')

// 根据用户id查询所有的电话号码

// 1.号码查询
var sql = "select * from phone where cusid=?"


router.post('/Api/downloadAllMail', function (req, res, next) {



    var reqbody = JSON.parse(req.body.data);


    console.log("downloadall", reqbody.cusid);


    db.query(sql, [reqbody.cusid], (err, data) => {

        if (err) {
            consoe.log("账号不存在", err);
        } else {

            if (data.length != 0) {
                console.log("data", data);
                res.send({
                    code: 1,
                    data: data
                })
            } else {
                res.send({
                    code: 0,
                    data: data
                })
            }



        }
    })

});

module.exports = router;