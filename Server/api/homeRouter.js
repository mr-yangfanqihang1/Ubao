const express = require('express');
const mysql = require('mysql');
//读取mysql配置文件
const dbConfig = require('../module/database');

const apiRouter = express.Router();

apiRouter.get('/homeGoods', (req, res) => {
    //连接数据库
    const connection = mysql.createConnection(dbConfig.mysqlConfig);
    connection.connect(function(err) {
        if (err) {
            res.data = {
                status: 0,
                message: '数据库连接错误'
            };
            res.send(res.data);
            return console.log('数据库连接错误' + error);
        }
    });

    connection.query('select id from goods', (err1, results1) => {
        if (err1) {
            res.data = {
                status: 2,
                message: '数据库请求错误'
            };
            res.send(res.data);
            return console.log('数据库请求发生错误' + err1);
        }
        var idArr = [];
        for (var i = 0; i < 80; i++) {
            var temp = getRandom(0, results1.length);
        }
    })



    connection.query('select id,goods_title,goods_img,goods_price,goods_sales from goods')
});

//获取指定范围的随机整数函数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//对外接口
module.exports = apiRouter;