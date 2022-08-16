var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


// 1.添加账号考虑不能添加重复的账号
router.post('/Api/adminAddAccount', function (req, res, next) {

    var obj = JSON.parse(req.body.data);


    console.log("obj", obj);


    let values = []
    let queryData = []

    // 查询操作
    for (let i in obj) {
        queryData.push([obj[i].nickName])
    }

    // 插入操作
    for (let i in obj) {

        values.push([obj[i].nickName, obj[i].passWord, obj[i].realName, 0, 0, obj[i].memo])
    }

    // 查询
    var querySql = "select * from account where nickName IN (?)"
    // 插入
    var sql = "INSERT INTO account(`nickName`,`passWord`,`realName`, `state`,`online`,`memo`) VALUES ?";



    db.query(querySql, [queryData], (err, data) => {


        if (err) {
            console.log("数据库连接失败", err);

            res.json(200, {
                code: 0,
                message: "添加失败"
            })
        } else {

            if (data.length != 0) {

                res.json(200, {
                    code: 0,
                    data: data,
                    message: "账号已存在"
                })
            } else {


                // 多条账号插入
                db.query(sql, [values], (err, data) => {

                    if (err) {
                        console.log("数据库连接错误", err);

                        res.json(200, {
                            code: 0,
                            message: "添加失败"
                        })


                    } else {

                        res.json(200, {
                            code: 1,
                            success: true,
                            message: "账号添加成功"
                        })
                        console.log(data);
                    }
                })

            }

        }
    })

});

module.exports = router;