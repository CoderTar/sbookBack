var express = require('express');
var router = express.Router();
var db = require('../db/connect')

const jwt = require('jsonwebtoken');
let jwt_secret = '83eaa0a06f4a81678d0e0643b1ebfefbd6fdf687380cb28a60b02d5bf58561a5'

var sqlUpdate = 'update account set  online=? where id=?'

router.get('/Api/accountLoginOut', function (req, res, next) {

    let _token = req.headers.authorization.split(" ")
    const paylod = jwt.verify(_token[1], jwt_secret)

    console.log("paylod", paylod);

    let updata = [0, paylod.cusid]
    db.query(sqlUpdate, updata, (err, data) => {

        if (err) {
            res.send({
                code: 0,
                message: "退出失败"
            })
        } else {
            res.send({
                code: 1,
                message: "退出成功"
            })
        }

    })


});

module.exports = router;