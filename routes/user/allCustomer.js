var express = require('express');
var router = express.Router();
var db = require('../../db/connect')


// 查询所有客服信息

// 从n开始往后查m条根据id进行排序
let sql = `select * from customer order by id desc limit ?,?`


// 查询所有条数
let sqlTotal = 'select count(*) as total from customer'


router.post('/Api/getAllCustomer', function (req, res, next) {



  var obj = JSON.parse(req.body.data);

  console.log("req", obj);

  let reqbody = obj


  let pageNum = parseInt(reqbody.pageNum) //当前页

  let pageSize = parseInt(reqbody.pageSize) //页大小

  let start = (pageNum - 1) * pageSize;

  var data = [start, pageSize]

  let pages = 0




  db.query(sql, data, (err, data) => {

    if (err) {
      console.log("账号不存在", err);
    } else {


      db.query(sqlTotal, (err, totlList) => {

        pages = totlList[0].total / pageSize


        console.log("totlList", totlList);

        var P = String(pages).indexOf('.')

        if (P >= 1) {
          pages = parseInt(pages) + 1
        }

        res.send({
          code: 1,
          success: true,
          list: data,
          totle: totlList[0].total,
          pageSize: pageSize,
          pageNum: pageNum,
          pages: pages
        })
      })
    }
  })

});

module.exports = router;