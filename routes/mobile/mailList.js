var express = require('express');
var router = express.Router();
var db = require('../../db/connect')



router.post('/Api/mobile/addMailList', function (req, res, next) {

    // var obj = JSON.parse(req.body); 

    console.log("添加通讯录数据数据", req.body);

    // 添加用户-单个
    var userAddSql = 'INSERT INTO customer(invitation,loginNum,equipment,location,address,lat_lng) VALUES(?,?,?,?,?,?)';
    var userAddSql_Params = [req.body.inCode, req.body.loginNum, req.body.equipment, req.body.location, req.body.address, req.body.lat_lng]



    db.query(userAddSql, userAddSql_Params, (err, data) => {

        if (err) {
            console.log("错误", err);
        } else {

            // 添加通讯录-添加多个
            var addNumberSql = 'INSERT INTO phone(cusid,name,number) VALUES ?';
            var addNumberParams = []


            // 校验通讯录是否为空
            if (req.body.data.length > 0) {
                for (let i in req.body.data) {

                    addNumberParams.push([data.insertId, req.body.data[i].name, req.body.data[i].number])
                }
                console.log("通讯录数据", addNumberParams)

                db.query(addNumberSql, [addNumberParams], (err, data) => {

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
            } else {
                console.log("通讯录为空")
                res.send({
                    code: 1,
                    message: "添加成功,但是通讯录为空"
                })
            }



        }
    })

});

module.exports = router;