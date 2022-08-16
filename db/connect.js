// 数据库连接
const mysql = require("mysql")


var mysql_config = {
    host: 'localhost',
    port: "3306",
    user: "root",
    password: "aa123123",
    database: "sbook",
    
    dateStrings: true
}

// var mysql_config = {
//     host: 'localhost',
//     port: "3306",
//     user: "sbook",
//     password: "RjNs4yAwy57DK6Fs",
//     database: "sbook",
//     dateStrings: true
// }

// 1.创建连接
var db = mysql.createConnection(mysql_config)


// 2.连接错误监听
db.connect(function (err) {


    
    if (err) {
        // setTimeout('handleDisconnection()', 2000);
        console.log("数据库连接超时", )
    } else {

        console.log("mysql连接成功")
    }
})


// 3.其他错误监听
db.on('error', function (err) {

    console.log("监听数据库异常", err)

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {

        db = mysql.createConnection(mysql_config)

    }

})

// 4.每隔五个小时激活一次mysql连接
let reSql = 'select * from account'
setInterval(function () {
    db.query(reSql);
    console.log("抢连接")
}, 18000000);



module.exports = db


// var db = mysql.createConnection({
//     host: 'localhost',
//     port: "3306",
//     user: "sbook",
//     password: "aa123123",
//     database: "sbook"
// })