
// 2.解析token
const jwt = require('jsonwebtoken')
let secret = '83eaa0a06f4a81678d0e0643b1ebfefbd6fdf687380cb28a60b02d5bf58561a5'
//async  await  解决异步请求获取不到问题
let parseToken = async function (token) {
    let response = await jwt.verify(token, secret, function (err, data) {
        if (err) return err
        else return data
    })

    return response
}

module.exports = parseToken