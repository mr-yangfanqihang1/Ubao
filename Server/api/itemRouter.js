/* 商品详情路由模块 */

//导入express模块
const express = require('express');
//导入mysql模块
const mysql = require('mysql');
//读取mysql配置文件
const dbConfig = require('../module/database');

const apiRouter = express.Router();

//返回商品详情数据
apiRouter.get('/item', (req, res) => {
    //连接数据库
    const connection = mysql.createConnection(dbConfig.mysqlConfig);

    connection.connect(err => {
        if (err) {
            res.data = {
                status: 0,
                message: '数据库连接错误'
            };
            res.send(res.data);
            return console.log('数据库连接错误' + err.stack);
        }
    });

    //根据传入ID值查询商品数据
    const sql = 'select * from goods where id=?';
    connection.query(sql, [req.query.id], (err, results) => {
        if (err) {
            res.data = {
                status: 2,
                message: '数据库请求错误'
            };
            res.send(res.data);
            connection.end();
            return console.log('数据库请求错误' + err.stack);
        }
        if (results.length > 0) {
            res.data = {
                status: 1,
                message: '获取商品详情数据成功',
                data: results[0]
            }
            res.send(res.data);
            connection.end();
        } else {
            res.data = {
                status: 3,
                message: '该商品不存在！'
            }
            res.send(res.data);
            connection.end();
        }

    })
});

//返回商品库存数量
apiRouter.get('/item/goods_num', (req, res) => {
    const goodsId = req.query.goodsId;

    //连接数据库
    const connection = mysql.createConnection(dbConfig.mysqlConfig);

    connection.connect(err => {
        if (err) {
            res.data = {
                status: 0,
                message: '数据库连接错误'
            };
            res.send(res.data);
            throw '数据库连接错误' + err.stack;
        }
    });

    const sql = 'select goods_reserve from goods where id=?';
    connection.query(sql, [goodsId], (err, results) => {
        if (err) {
            res.data = {
                status: 2,
                message: '数据库请求错误：' + err
            };
            res.send(res.data);
            connection.end();
            throw '数据库请求发生错误：' + err;
        }
        //返回商品库存查询结果
        if (results.length === 1) {
            res.data = {
                status: 1,
                message: '获取商品库存成功！',
                data: results[0]
            };
            res.send(res.data);
            connection.end();
            return;
        } else {
            res.data = {
                status: 3,
                message: '获取商品库存失败！'
            };
            res.send(res.data);
            connection.end();
            return;
        }

    });
});


//对外接口
module.exports = apiRouter;