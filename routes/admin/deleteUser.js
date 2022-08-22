var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


var sqldelete = 'delete from account  where id=?'

router.delete('/Api/deleteUser', function (req, res, next) {

    var obj = JSON.parse(req.body.data);
    console.log("obj", obj);

    db.query(sqldelete, obj.id, (err, data) => {

        if (err) {
            res.send({
                code: 0,
                message: "删除失败"
            })
        } else {

            if (data.affectedRows > 0) {
                res.send({
                    code: 1,
                    message: "删除成功",
                })

            } else {
                res.send({
                    code: 0,
                    message: "删除失败",
                })
            }
        }

    })


});

module.exports = router;