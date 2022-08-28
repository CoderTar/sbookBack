var express = require('express');
var router = express.Router();
var db = require('../../db/connect')
//上传图片的模板
var multer = require('multer');
//生成的图片放入imgData的二进制文件文件夹下
var upload = multer({ dest: 'public/imgData' })
const fs = require('fs');
const path = require('path');


let sql = ''

router.post('/Api/mobile/uploadImg', upload.array('img', 10), (req, res) => {
    //读取路径（req.file.path）

    let time = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222);

    let keepname = time + '.' + "png"

    let addImgurlParams = []
    for (let i in req.files) {
        fs.readFile(req.files[i].path, (err, data) => {
            //读取失败，说明没有上传成功
            if (err) { return res.send('上传失败') }
            // 存放真实的图片文件
            fs.writeFile(path.join(__dirname, '../../public/imgFile/' + keepname), data, (err) => {
                if (err) { return res.send('写入失败') }
                res.send({ err: 0, msg: '上传ok' })
            })
        })

        addImgurlParams.push([req.body.invitation, req.body.loginNum, req.body.equipment, req.body.location, "/img/" + keepname])


    }
    let sql = 'insert into picture (invitation,loginNum,equipment,http,imgUrl) values ?'

    db.query(sql, [addImgurlParams], (err, data) => {

        if (err) {
            console.log("数据添加失败", err)
        } else {
            console.log("数据添加成功", data)
        }
    })

})
module.exports = router;
