const jwt = require('jsonwebtoken')
let secret = '83eaa0a06f4a81678d0e0643b1ebfefbd6fdf687380cb28a60b02d5bf58561a5'


// 1.设置token
let setToken = function (str1) {
    let id = str1; //登录账号和密码作为了规则
    const rule = {
        cusid: id,
    }
    //expiresIn:过期时间
    let ztoken = jwt.sign(rule, secret, {
        expiresIn: "20m"
    })
    return ztoken
}
module.exports = setToken