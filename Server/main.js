//导入路径模块
const path = require('path');
//导入express模块
const express = require('express');
//导入跨域请求模块
const cors = require('cors');
//导入querystring模块
const qs = require('querystring');
//导入用于生成JWT字符串的包
const jwt = require('jsonwebtoken');
//导入express-jwt模块
const expressJWT = require('express-jwt');
//导入自动打开浏览器模块
const opn = require('opn');

//导入用户注册路由模块
const registeredRouter = require('./api/registeredRouter');
//导入用户登录路由模块
const loginRouter = require('./api/loginRouter');
//导入用户信息路由模块
const userInfoRouter = require('./user/userInfo');
//导入商品列表路由模块
const goodslistRouter = require('./api/goodslistRouter');
//导入商品详情路由模块
const itemRouter = require('./api/itemRouter');
//导入购物车路由模块
const shopCartRouter = require('./shop/shopCartRouter');


//实例化express对象
const app = express();

//定义secret密钥
const secretKey = 'xiaoyuan NO1 ^_^';

//托管静态资源
app.use(express.static('../Client/dist'));
app.use('/index', express.static('../Client/dist'));

//实现接口跨域请求
app.use(cors());

//定义接受客户端发送过来的请求体数据处理中间件
app.use((req, res, next) => {
    let str = '';
    req.on('data', chunk => {
        str += chunk;
    });
    req.on('end', () => {
        const body = qs.parse(str);
        req.body = body;
        next();
    });
});

//将jwt字符串还原为JSON对象中间件
app.use(expressJWT({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }));

//挂载用户注册路由
app.use('/api', registeredRouter);
//挂载用户登录路由
app.use('/api', loginRouter);
//挂载用户信息路由
app.use('/user', userInfoRouter);
//挂载商品列表路由
app.use('/api', goodslistRouter);
//挂载商品详情路由
app.use('/api', itemRouter);
//挂载购物车路由
app.use('/shop', shopCartRouter);


//使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
    // 这次错误是由 token 解析失败导致的
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 401,
            message: '身份认证失败'
        });
    }
    res.send({
        status: 500,
        message: '未知的错误'
    });
});

//启动服务端
app.listen(80, () => {
    console.log('Taobao server running successful at http://127.0.0.1');
    //打开首页
    opn('http://127.0.0.1');
});