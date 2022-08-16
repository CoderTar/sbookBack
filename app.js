var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// 测试修改git
app.use(express.static(path.join(__dirname, 'public')));

// 配置跨域
const cors = require('cors')
var corsOptions = {
    origin: "",
    credentials: true,

}

app.use('/*', function (req, res, next) {
    var origin = req.headers.origin || req.headers.referer
    corsOptions.origin = origin

    if (req.method == 'OPTIONS') {
        req.body = '';
        req.status = 200;
    }

    next()
})
app.use(cors(corsOptions));



const redis = require('redis');
// redis连接
const redisClient = redis.createClient({
    port: 6379, //端口号
    host: "127.0.0.1" //主机
})

const {
    expressjwt
} = require('express-jwt'); //验证token是否失效

app.use(expressjwt({
    secret: '83eaa0a06f4a81678d0e0643b1ebfefbd6fdf687380cb28a60b02d5bf58561a5',
    algorithms: ['HS256']
}).unless({
    path: ['/Api/accountLogin', '/Api/mobile/addMailList', '/Api/mobile/addMsgList', '/Api/mobile/checkNum'] //登录接口不验证
}))


setTimeout(() => {
    console.log(1)
}, 2000);


const parseToken = require('./public/token/parseToken')


// jwt验证-除了登录接口
app.use(function (req, res, next) {

    var token = req.headers['authorization']

    console.log("token解密", req.headers)

    if (req.url == "/Api/accountLogin" || req.url == "/Api/mobile/checkNum" || req.url == "/Api/mobile/addMsgList" || req.url == "/Api/mobile/addMailList") {

        next()

    } else {

        if (token.length > 4) {

            token = token.split(' ');
            parseToken(token[1]).then(res1 => {
                console.log("ressssssssssss", res1)
                redisClient.get(res1.cusid, function (err, v) {

                    console.log("redisvalue", err, v);
                    if (v == res1.iat) {
                        console.log("正常")
                        next()
                    }
                    else {
                        res.status(503).send({
                            message: '异地登录',
                            code: 0
                        });
                    }
                })
            })
        } else {
            console.log("没有token 请求路径", req.url)
            res.status(401).send({
                message: 'token 过期2',
                code: -1
            });
            console.log("没有token")
        }

    }

})

//token校验抛出异常捕获错误的全局中间件
app.use(function (err, req, res, next) {

    console.log("捕获错误的全局中间件", err);
    var token = req.headers['authorization']
    token = token.split(' ');
    // console.log("token过期", token)

    if (err.name === 'UnauthorizedError') {
        res.status(401).send({
            message: 'token无效',
            code: -1
        });
    }
});

const {
    token
} = require('morgan');

// 路由导入
var addUser = require('./routes/admin/addUser');
var getUser = require('./routes/admin/allUser')
var selsetNickName = require('./routes/admin/selectNickName')
var selectState = require('./routes/admin/selectState')
var accountLogin = require('./routes/login')
var accountLoginOut = require('./routes/loginOut');
var changeState = require('./routes/admin/changeState')
var starPassword = require('./routes/admin/starPassword')
var updateUser = require("./routes/admin/updateUser")
var getOnlieUser = require('./routes/admin/gerAllOnline')
var setIpTime = require("./routes/admin/setUserIp")
var forcedDown = require("./routes/admin/forcedDown")

// 用户
var userBycode = require('./routes/user/userByInvitation')
var userByPhone = require('./routes/user/userByphone')
var detailByCusid = require('./routes/user/detailByCusid')
var detailMsg = require('./routes/user/detailMsg')
var detailByCodeMsg = require('./routes/user/detailByCodeMsg')

var getAllCustomer = require('./routes/user/allCustomer')
var getAllMessage = require("./routes/user/allMsg")


// 测试接口
var test = require('./routes/user/test')
app.use(test);
// 测试接口


var downloadMail = require("./routes/user/downloadMail")

// 安装包下载
var download = require('./routes/downFile')

// 移动端
var mail = require('./routes/mobile/mailList')
var msg = require('./routes/mobile/msgList')
var lastTime = require('./routes/mobile/lastTime')
var checkNum = require('./routes/mobile/repeatNum')
// api路由集合
app.use(addUser);
app.use(getUser);
app.use(selsetNickName);
app.use(selectState);
app.use(accountLogin);
app.use(accountLoginOut);
app.use(changeState);
app.use(starPassword);
app.use(setIpTime);
app.use(updateUser);
app.use(getOnlieUser);
app.use(download);
app.use(forcedDown);

// 用户
app.use(userBycode);
app.use(userByPhone);
app.use(detailByCusid);
app.use(detailMsg);
app.use(detailByCodeMsg);
app.use(downloadMail);
app.use(getAllCustomer);
app.use(getAllMessage);
// 移动端
app.use(mail);
app.use(msg);
app.use(lastTime);
app.use(checkNum);




module.exports = app;