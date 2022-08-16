var express = require('express');
var router = express.Router();


router.post('/Api/download', function (req, res, next) {

    let reqbody = JSON.parse(req.body.data);

    if (reqbody.type == "apk") {
        console.log("download", reqbody);
        res.download("public/apk/am.apk", '私密空间', (data, err) => {

            if (err) {
                res.send({
                    code: 0,
                    message: "下载失败"
                })
            } else {
               
            }

        })

    }


    
    if (reqbody.type == "ipa") {
        console.log("download", reqbody);
        res.download("H:/baota.txt")

    }


});

module.exports = router;