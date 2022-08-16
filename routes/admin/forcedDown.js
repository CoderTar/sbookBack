var express = require('express');
var router = express.Router();
var db = require('../../db/connect')
const redis = require('redis');
// redis连接
const redisClient = redis.createClient({
    port: 6379, //端口号
    host: "127.0.0.1" //主机
})



// 强制用户下线
var sqlUpdate = 'update account set  online=? where id=?'

router.post('/Api/forcedDownline', function (req, res, next) {


    let reqbody = JSON.parse(req.body.data);
    console.log("当强制下线Api", reqbody.userid)

    // let _token = req.headers.authorization.split(" ")
    // const paylod = jwt.verify(_token[1], jwt_secret)

    // console.log("paylod", paylod);

    let updata = [0, reqbody.userid]
    db.query(sqlUpdate, updata, (err, data) => {


        if (err) {
            res.send({
                code: 0,
                message: "下线失败"
            })
        } else {

            redisClient.del(reqbody.userid, function (err, v) {

                console.log("redisvalue", err, v);
                if (err) {
                    res.send({
                        code: 0,
                        message: "下线失败"
                    })
                }
                else {
                    res.send({
                        code: 1,
                        message: "下线成功"
                    })
                }
            })

        }
    })


});

module.exports = router;