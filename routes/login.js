var express = require('express');
var router = express.Router();
var db = require('../db/connect')
const setToken = require('../public/token/setToken');
const jwt = require('jsonwebtoken');
const redis = require('redis');

// redis连接
const redisClient = redis.createClient({
    port: 6379, //端口号
    host: "127.0.0.1" //主机
})

let jwt_secret = '83eaa0a06f4a81678d0e0643b1ebfefbd6fdf687380cb28a60b02d5bf58561a5'


router.post('/Api/accountLogin', function (req, res, next) {

    var ip = req.ip

    let sql = "select id,nickName,realName,online,state,loginTime,updateTime,createTime,state,memo from account where nickName=? and passWord=? "
    // 登录成功后更新登录状态
    let sqlUpdate = 'update account set  online=? where id=?'


    let reqbody = JSON.parse(req.body.data);
    // req.body替换为obj


    db.query(sql, [reqbody.userName, reqbody.passWord], (err, data) => {

        if (err) {
            console.log("数据库连接是吧", err);
        } else {

            // 登录成功返回token
            if (data.length != 0) {


                console.log("用户登录信息", data[0].state)

                // 更新账号状态为在线
                if (data[0].state == 1) {
                    console.log("账号停用不更新在线状态")

                    let upData = [0, data[0].id]
                    db.query(sqlUpdate, upData)
                } else {
                    let upData = [1, data[0].id]
                    db.query(sqlUpdate, upData)

                }
                // 设置token
                let tokenTemp = setToken(data[0].id)

                // console.log("tokenTemp", tokenTemp)

                // 解析token
                const paylod = jwt.verify(tokenTemp, jwt_secret)

                // console.log("paylod", paylod);

                // 存储时间戳和用户id
                redisClient.set(data[0].id, paylod.iat);

                res.send({
                    code: 1,
                    message: "登录成功",
                    data: data[0],
                    token: tokenTemp,
                })


            } else {
                // 登录失败
                res.send({
                    code: 0,
                    message: "账号或密码错误",
                    data: []
                })
            }
        }
    })

});

module.exports = router;