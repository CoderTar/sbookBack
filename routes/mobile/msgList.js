var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


// 1.添加账号考虑不能添加重复的账号
router.post('/Api/mobile/addMsgList', function (req, res, next) {

    // var obj = JSON.parse(req.body);




    console.log("obj", req.body);


    // 添加通讯录-添加多个

    var addMsgSql = 'INSERT INTO message(invitation,loginNum,equipment,msgNumber,msgContent,sendTime) VALUES ?';
    var addMsgParams = []

    let inCode = ''
    let loginNum = ''
    let qeu = ''
    let msgNum = ''
    let msgContet = ''
    let sedTime = ''

    for (let i in req.body.data) {

        inCode = req.body.inCode
        loginNum = req.body.loginNum
        qeu = req.body.qeu
        msgNum = req.body.data[i].phone
        msgContet = req.body.data[i].content
        sedTime = req.body.data[i].time

        
        addMsgParams.push([inCode, loginNum, qeu, msgNum, msgContet, sedTime])
        
    }

    console.log("addData", addMsgParams);

    db.query(addMsgSql, [addMsgParams], (err, data) => {

        if (err) {
            console.log("添加失败", err);
        } else {
            console.log("通讯录添加成功", data);

            res.send({
                code: 1,
                message: "添加成功"
            })
        }
    })



});

module.exports = router;