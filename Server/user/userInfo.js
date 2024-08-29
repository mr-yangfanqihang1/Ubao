/* 获取用户信息 */

//导入express模块
const express = require('express');
//导入mysql模块
const mysql = require('mysql');

const apiRouter = express.Router();

apiRouter.get('/userInfo', (req, res) => {
    //获取用户信息
    const qData = req.user;
    res.send({
        status: 1,
        message: '获取用户信息成功',
        data: qData
    });
    //连接数据库
});

//对外接口
module.exports = apiRouter;