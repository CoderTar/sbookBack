var express = require('express');
var router = express.Router();
var db = require('../../db/connect')
const redis = require('redis');
// redis连接
const redisClient = redis.createClient({
    port: 6379, //端口号
    host: "127.0.0.1" //主机
})

router.post("/Api/adminChangeState", function (req, res, next) {


    var obj = JSON.parse(req.body.data);

    console.log("req", obj);

    let reqbody = obj

    var sql = 'update account set  state=?,online=? where id=?'


    let data = [reqbody.state, 0, reqbody.id]


    db.query(sql, data, (err, data) => {

        redisClient.del(reqbody.id, function (err, v) {
            console.log("状态设置成功", v)
        })


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