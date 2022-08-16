var express = require('express');
var router = express.Router();
var db = require('../../db/connect')
var request = require('request');
// 根据邀请码查询短信


var sql = "select * from message where invitation=? limit ?,?"

// 分页
let sqlTotal = 'select count(*) as total from message where invitation=? '

router.get('/get', function (req, res, next) {

    let ip = "117.136.80.112"
    request({
        url: "http://ip-api.com/json/" + ip + "?lang=zh-CN",
        method: 'GET',
    }, function (err, response, body) {
        let data = JSON.parse(body)
        console.log(response)
        res.send({
            data: data.country + data.regionName + data.city
        })
    })
});

module.exports = router;