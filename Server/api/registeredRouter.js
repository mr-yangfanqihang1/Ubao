/* 用户注册路由模块 */

//导入express模块
const express = require('express');
//导入时间格式处理模块
const moment = require('moment');
//导入mysql模块
const mysql = require('mysql');
//读取mysql配置文件
const dbConfig = require('../module/database');


const apiRouter = express.Router();

//用户注册接口
apiRouter.post("/registered", (req, res) => {
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

    //用户注册处理
    const sql1 = 'select username from account where username=?';
    connection.query(sql1, [qData.username], (err, results) => {
        //打印错误信息
        if (err) {
            res.data = {
                status: 2,
                message: '查询数据库失败！'
            };
            res.send(res.data);
            connection.end();
            return console.log('查询数据库失败！' + err.stack);
        }
        //判断是否存在用户名
        if (results.length > 0) {
            res.data = {
                status: 3,
                message: '用户名已存在！'
            };
            res.send(res.data);
            connection.end();
            return;
        } else if (results.length === 0) {
            //查询邮箱是否存在
            const sql2 = 'select email from account where email=?';
            connection.query(sql2, [qData.email], (err, results) => {
                if (err) {
                    res.data = {
                        status: 2,
                        message: '查询数据库失败！'
                    };
                    res.send(res.data);
                    connection.end();
                    return console.log('查询数据库失败！' + err.stack);
                }
                if (results.length > 0) {
                    res.data = {
                        status: 5,
                        message: '邮箱已被注册！'
                    };
                    res.send(res.data);
                    connection.end();
                    return;
                } else if (results.length === 0) {
                    //判断用户数据是否合法
                    let checkFlag = true;
                    //用户名正则
                    const userReg = /^[\u4E00-\u9FA5A-Za-z0-9_]{6,16}$/;
                    //密码正则
                    const pwdReg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/;
                    //邮箱正则
                    const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                    if (!userReg.test(qData.username) || !pwdReg.test(qData.password) || !emailReg.test(qData.email)) {
                        checkFlag = false;
                        connection.end();
                        return;
                    }

                    if (checkFlag) {
                        //获取在服务器上的注册时间
                        const regTime = moment().format("YYYY-MM-DD HH:mm:ss");
                        //定义插入用户账号信息sql语句
                        const sql3 = 'insert into account (username,email,password,create_date) values(?,?,?,?) ';
                        //执行插入数据请求
                        connection.query(sql3, [qData.username, qData.email, qData.password, regTime], (err, results) => {
                            if (err) {
                                res.data = {
                                    status: 4,
                                    message: '用户注册失败，请求数据库出错！'
                                };
                                res.send(res.data);
                                connection.end();
                                return console.log('用户注册失败，请求数据库出错！' + err.stack);
                            }
                            if (results.affectedRows === 1) {
                                res.data = {
                                    status: 1,
                                    message: '注册成功！'
                                };
                                res.send(res.data);
                                connection.end();
                                return;
                            }
                        });
                    }

                }

            });

        }

    });

});

//查询用户名是存在接口
apiRouter.get("/registered/user", (req, res) => {
    const qData = req.query;
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
    //查询用户名
    const sql = 'select username from account where username=?';
    connection.query(sql, [qData.username], (err, results) => {
        if (err) {
            return console.log('数据库连接错误' + err.stack);
        }
        if (results.length > 0) {
            res.data = {
                status: 2,
                message: '用户名已存在'
            };
            res.send(res.data);
        } else if (results.length === 0) {
            res.data = {
                status: 1,
                message: '用户名还未被注册'
            };
            res.send(res.data);
        }
    });
});

//查询邮箱是否存在接口
apiRouter.get("/registered/email", (req, res) => {
    const qData = req.query;
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
    //查询邮箱
    const sql = 'select email from account where email=?';
    connection.query(sql, [qData.email], (err, results) => {
        if (err) {
            return console.log('数据库连接错误' + err.stack);
        }
        if (results.length > 0) {
            res.data = {
                status: 2,
                message: '邮箱已存在'
            };
            res.send(res.data);
        } else if (results.length === 0) {
            res.data = {
                status: 1,
                message: '邮箱还未被注册'
            };
            res.send(res.data);
        }
    });
});

//对外接口
module.exports = apiRouter;