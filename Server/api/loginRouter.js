/* 用户登录路由模块 */

//导入express模块
const express = require('express');
//导入时间格式处理模块
const moment = require('moment');
//导入mysql模块
const mysql = require('mysql');
//导入用于生成JWT字符串的包
const jwt = require('jsonwebtoken');
//读取mysql配置文件
const dbConfig = require('../module/database');

//定义secret密钥
const secretKey = 'xiaoyuan NO1 ^_^';

const apiRouter = express.Router();

//用户登录接口
apiRouter.post('/login', (req, res) => {
    const qData = req.body;
    //连接数据库
    const connection = mysql.createConnection(dbConfig.mysqlConfig);
    connection.connect(function(err) {
        if (err) {
            res.data = {
                status: 0,
                message: '数据库连接错误'
            };
            res.send(res.data);
            return console.log('数据库连接错误' + err.stack);
        }
    });
    //查询用户名是否存在
    const sql = 'select username from account where username=?';
    connection.query(sql, [qData.username], (err, results) => {
        if (err) {
            res.data = {
                status: 4,
                message: '数据库查询失败！'
            };
            res.send(res.data);
            connection.end();
            return console.log('数据库查询错误' + err.stack);
        }
        if (results.length > 0) {
            //验证密码是否正确
            const sql2 = 'select password from account where username=?';
            connection.query(sql2, [qData.username], (err, results) => {
                if (err) {
                    res.data = {
                        status: 4,
                        message: '数据库查询失败！'
                    };
                    res.send(res.data);
                    connection.end();
                    return console.log('数据库查询错误' + err.stack);
                }
                if (results[0].password === qData.password) {
                    res.data = {
                        status: 1,
                        message: '登陆成功！',
                        //设置token，时效为7天
                        token: jwt.sign({ username: qData.username }, secretKey, { algorithm: 'HS256', expiresIn: '7 days' })
                    };
                    res.send(res.data);
                    //更新用户最后一次登录时间
                    const loginTime = moment().format('YYYY-MM-DD HH:mm:ss');
                    const sql3 = 'update account set last_login=? where username=?';
                    connection.query(sql3, [loginTime, qData.username], (err, results) => {
                        if (err) {
                            res.data = {
                                status: 4,
                                message: '数据库查询失败！'
                            };
                            res.send(res.data);
                            connection.end();
                            return console.log('数据库查询错误' + err.stack);
                        }
                    });
                    connection.end();
                    return;
                } else {
                    res.data = {
                        status: 3,
                        message: '用户名或密码错误，请重新输入！'
                    };
                    res.send(res.data);
                    connection.end();
                    return;
                }
            });

        } else {
            res.data = {
                status: 2,
                message: '用户不存在，请重新输入！'
            };
            res.send(res.data);
            connection.end();
            return;
        }
    });
});

//对外接口
module.exports = apiRouter;