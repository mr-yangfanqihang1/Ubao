/* 购物车路由模块 */

//导入express模块
const express = require('express');
//导入mysql模块
const mysql = require('mysql');
//读取mysql配置文件
const dbConfig = require('../module/database');

const apiRouter = express.Router();

//添加到购物车
apiRouter.post('/addGoods', (req, res) => {
    //读取用户信息
    const username = req.user.username;
    //读取添加的商品数据
    const qData = req.body;

    //用户ID
    let userId = null;
    //商品标题
    let goodsTitle = null;
    //商品价格
    let goodsPrice = null;
    //商品图片
    let goodsImg = null;
    //所属店铺
    let shopName = null;

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

    //查询用户信息
    const sql1 = 'select id from account where username=?';
    connection.query(sql1, [username], (err1, results1) => {
        if (err1) {
            res.data = {
                status: 2,
                message: '数据库请求错误：' + err1
            };
            res.send(res.data);
            connection.end();
            return console.log('数据库请求发生错误' + err1);
        }
        //获取到用户ID
        if (results1[0].id) {
            userId = results1[0].id;
        } else {
            res.data = {
                status: 3,
                message: '您当前所操作的账户不存在！'
            };
            res.send(res.data);
            connection.end();
            return;
        }

        //查询商品信息
        const sql2 = 'select goods_title,goods_price,goods_img,shop_name from goods where id=?';
        connection.query(sql2, [qData.goodsId], (err2, results2) => {
            if (err2) {
                res.data = {
                    status: 2,
                    message: '数据库请求错误：' + err2
                };
                res.send(res.data);
                connection.end();
                return console.log('数据库请求发生错误' + err2);
            }
            //获取到商品信息
            if (results2.length === 1) {
                //商品标题
                goodsTitle = results2[0].goods_title;
                //商品价格
                goodsPrice = results2[0].goods_price;
                //商品图片
                goodsImg = results2[0].goods_img;
                //所属店铺
                shopName = results2[0].shop_name;
            } else {
                res.data = {
                    status: 4,
                    message: '您要添加的商品已失效！'
                };
                res.send(res.data);
                connection.end();
                return;
            }


            //判断购物车中是否存在相同商品
            const sql3 = 'select user_id,goods_id,goods_num from cart where user_id=? and goods_id=?';
            connection.query(sql3, [userId, qData.goodsId], (err3, results3) => {
                if (err3) {
                    res.data = {
                        status: 2,
                        message: '数据库请求错误：' + err3
                    };
                    res.send(res.data);
                    connection.end();
                    return console.log('数据库请求发生错误' + err3);
                }

                if (results3.length === 1) {
                    //合并存在的数量
                    let newGoodsNum = parseInt(results3[0].goods_num) + parseInt(qData.goodsNum);
                    //判断合计数量是否超过库存
                    const sql5 = 'select goods_reserve from goods where id=?';
                    connection.query(sql5, [qData.goodsId], (err5, results5) => {
                        if (err5) {
                            res.data = {
                                status: 2,
                                message: '数据库请求错误：' + err5
                            };
                            res.send(res.data);
                            connection.end();
                            throw '数据库请求发生错误' + err5;
                        }
                        if (results5.length === 1) {
                            if (parseInt(results5[0].goods_reserve) <= newGoodsNum) {
                                res.data = {
                                    status: 6,
                                    message: '添加后购物车中该商品数量大于库存总量，请减少数量后重新添加！'
                                };
                                res.send(res.data);
                                connection.end();
                                return;
                            } else {
                                //更新数量
                                const sql6 = 'update cart set goods_num =? where user_id=? and goods_id=?';
                                connection.query(sql6, [newGoodsNum, userId, qData.goodsId], (err6, results6) => {
                                    if (err6) {
                                        res.data = {
                                            status: 2,
                                            message: '数据库请求错误：' + err6
                                        };
                                        res.send(res.data);
                                        connection.end();
                                        throw '数据库请求发生错误' + err6;
                                    }
                                    if (results6.affectedRows === 1) {
                                        res.data = {
                                            status: 1,
                                            message: '添加商品到购物车成功！'
                                        };
                                        res.send(res.data);
                                        connection.end();
                                        return;
                                    } else {
                                        res.data = {
                                            status: 5,
                                            message: '添加商品失败，请重新尝试！'
                                        };
                                        res.send(res.data);
                                        connection.end();
                                        return;
                                    }
                                });
                            }
                        }
                    });

                } else if (results3.length === 0) {
                    //添加商品到用户购物车中
                    const sql4 = 'insert into cart (user_id,username,goods_id,shop_name,goods_img,goods_name,goods_num,goods_price) values (?,?,?,?,?,?,?,?)';
                    connection.query(sql4, [userId, username, qData.goodsId, shopName, goodsImg, goodsTitle, qData.goodsNum, goodsPrice], (err4, results4) => {
                        if (err4) {
                            res.data = {
                                status: 2,
                                message: '数据库请求错误：' + err4
                            };
                            res.send(res.data);
                            connection.end();
                            return console.log('数据库请求发生错误' + err4);
                        }
                        if (results4.affectedRows === 1) {
                            res.data = {
                                status: 1,
                                message: '添加商品到购物车成功！'
                            };
                            res.send(res.data);
                            connection.end();
                            return;
                        } else {
                            res.data = {
                                status: 5,
                                message: '添加商品失败，请重新尝试！'
                            };
                            res.send(res.data);
                            connection.end();
                            return;
                        }

                    });
                }
            });


        });

    });
});

//购物车信息查询
apiRouter.post('/cartInfo', (req, res) => {
    //读取用户信息
    const username = req.user.username;

    //连接数据库
    const connection = mysql.createConnection(dbConfig.mysqlConfig);
    connection.connect(function(err) {
        if (err) {
            res.data = {
                status: 0,
                message: '数据库连接错误：' + err
            };
            res.send(res.data);
            throw '数据库连接错误' + err;
        }
    });
    //查询购物车商品种类
    const sql1 = 'select goods_id,goods_name,goods_price,shop_name,goods_num,goods_img from cart where username=? order by id desc';
    connection.query(sql1, [username], (err1, results1) => {
        if (err1) {
            res.data = {
                status: 2,
                message: '数据库请求错误：' + err1
            };
            res.send(res.data);
            connection.end();
            throw '数据库请求发生错误：' + err1;
        }
        //返回用户购物车的查询结果
        res.data = {
            status: 1,
            message: '购物车状态请求成功！',
            data: results1
        };
        res.send(res.data);
        connection.end();
        return;
    });

});


//更新用户购物车商品数量
apiRouter.post('/updateGoodsNum', (req, res) => {
    //读取用户信息
    const username = req.user.username;
    //读取请求数据
    const goodsNum = req.body.goodsNum;
    const goodsId = req.body.goodsId;

    //连接数据库
    const connection = mysql.createConnection(dbConfig.mysqlConfig);
    connection.connect(function(err) {
        if (err) {
            res.data = {
                status: 0,
                message: '数据库连接错误：' + err
            };
            res.send(res.data);
            throw '数据库连接错误' + err;
        }
    });

    let userId = null;
    //查询用户信息
    const sql1 = 'select id from account where username=?';
    connection.query(sql1, [username], (err1, results1) => {
        if (err1) {
            res.data = {
                status: 2,
                message: '数据库请求错误：' + err1
            };
            res.send(res.data);
            connection.end();
            throw '数据库请求发生错误' + err1;
        }
        //获取到用户ID
        if (results1[0].id) {
            userId = results1[0].id;
        } else {
            res.data = {
                status: 3,
                message: '您当前所操作的账户不存在！'
            };
            res.send(res.data);
            connection.end();
            return;
        }

        const sq2 = 'update cart set goods_num=? where username=? and goods_id=? and user_id=?';
        connection.query(sq2, [goodsNum, username, goodsId, userId], (err2, results2) => {
            if (err2) {
                res.data = {
                    status: 4,
                    message: '更新数据失败，请重试！' + err2
                };
                res.send(res.data);
                connection.end();
                throw '更新数据失败，请重试！' + err2;
            }
            if (results2.affectedRows === 1) {
                res.data = {
                    status: 1,
                    message: '更新购物车商品数量成功！'
                };
                res.send(res.data);
                connection.end();
                return;
            } else {
                res.data = {
                    status: 5,
                    message: '更新购物车商品数量失败，可能已被删除！'
                };
                res.send(res.data);
                connection.end();
                return;
            }
        });

    });



});

//删除购物车商品
apiRouter.post('/deleteCartGoods', (req, res) => {
    //读取用户信息
    const username = req.user.username;
    //读取请求数据
    const goodsId = req.body.goodsId;

    //连接数据库
    const connection = mysql.createConnection(dbConfig.mysqlConfig);
    connection.connect(function(err) {
        if (err) {
            res.data = {
                status: 0,
                message: '数据库连接错误：' + err
            };
            res.send(res.data);
            throw '数据库连接错误' + err;
        }
    });

    let userId = null;
    //查询用户信息
    const sql1 = 'select id from account where username=?';
    connection.query(sql1, [username], (err1, results1) => {
        if (err1) {
            res.data = {
                status: 2,
                message: '数据库请求错误：' + err1
            };
            res.send(res.data);
            connection.end();
            throw '数据库请求发生错误' + err1;
        }
        //获取到用户ID
        if (results1[0].id) {
            userId = results1[0].id;
        } else {
            res.data = {
                status: 3,
                message: '您当前所操作的账户不存在！'
            };
            res.send(res.data);
            connection.end();
            return;
        }

        const sql2 = 'delete from cart where user_id=? and username=? and goods_id=?';
        connection.query(sql2, [parseInt(userId), username, parseInt(goodsId)], (err2, results2) => {
            if (err2) {
                res.data = {
                    status: 4,
                    message: '删除商品失败，请重试！' + err2
                };
                res.send(res.data);
                connection.end();
                throw '删除商品失败，请重试！' + err2;
            }
            if (results2.affectedRows === 1) {
                res.data = {
                    status: 1,
                    message: '删除购物车商品成功！'
                };
                res.send(res.data);
                connection.end();
                return;
            } else {
                res.data = {
                    status: 5,
                    message: '删除购物车商品失败，可能已被删除！'
                };
                res.send(res.data);
                connection.end();
                return;
            }
        });

    });

});

//购物车结算
apiRouter.post('/settlement', (req, res) => {
    //读取用户信息
    const username = req.user.username;
    //读取请求数据
    const goodsId = parseInt(req.body.goodsId);
    const goodsNum = parseInt(req.body.goodsNum);

    //连接数据库
    const connection = mysql.createConnection(dbConfig.mysqlConfig);
    connection.connect(function(err) {
        if (err) {
            res.data = {
                status: 0,
                message: '数据库连接错误：' + err
            };
            res.send(res.data);
            throw '数据库连接错误' + err;
        }
    });

    let userId = null;
    //查询用户信息
    const sql1 = 'select id from account where username=?';
    connection.query(sql1, [username], (err1, results1) => {
        if (err1) {
            res.data = {
                status: 2,
                message: '数据库请求错误：' + err1
            };
            res.send(res.data);
            connection.end();
            return console.log('数据库请求发生错误' + err1);
        }
        //获取到用户ID
        if (results1[0].id) {
            userId = results1[0].id;
        } else {
            res.data = {
                status: 3,
                message: '您当前所操作的账户不存在！'
            };
            res.send(res.data);
            connection.end();
            return;
        }

        //判断商品数量是否大于库存
        let goodsReserve = 0;
        const sql2 = 'select goods_reserve from goods where id=?';
        connection.query(sql2, [goodsId], (err2, results2) => {
            if (err2) {
                res.data = {
                    status: 2,
                    message: '数据库请求错误：' + err2
                };
                res.send(res.data);
                connection.end();
                return console.log('数据库请求发生错误' + err2);
            }

            if (results2.length === 1) {
                if (parseInt(results2[0].goods_reserve) < goodsNum) {
                    res.data = {
                        status: 4,
                        message: '结算该商品失败，库存不足！'
                    };
                    res.send(res.data);
                    connection.end();
                    return;
                }
            } else {
                res.data = {
                    status: 5,
                    message: '结算该商品失败，原因未知！'
                };
                res.send(res.data);
                connection.end();
                return;
            }

            goodsReserve = parseInt(results2[0].goods_reserve);
            let newGoodsReserve = goodsReserve - goodsNum;

            //删除购物车中对应的商品
            const sql3 = 'delete from cart where user_id=? and username=? and goods_id=?';
            connection.query(sql3, [userId, username, goodsId], (err3, results3) => {
                if (err3) {
                    res.data = {
                        status: 6,
                        message: '结算商品失败，请重试！' + err3
                    };
                    res.send(res.data);
                    connection.end();
                    return console.log('结算商品失败，请重试！' + err3);
                }
                if (results3.affectedRows === 1) {

                } else {
                    res.data = {
                        status: 5,
                        message: '结算该商品失败，原因未知！'
                    };
                    res.send(res.data);
                    connection.end();
                    return;
                }

                //更新商品库存
                const sql4 = 'update goods set goods_reserve=? where id=?';
                connection.query(sql4, [newGoodsReserve, goodsId], (err4, results4) => {
                    if (err4) {
                        res.data = {
                            status: 6,
                            message: '结算商品失败，请重试！' + err4
                        };
                        res.send(res.data);
                        connection.end();
                        return console.log('结算商品失败，请重试！' + err4);
                    }
                    if (results4.affectedRows === 1) {
                        res.data = {
                            status: 1,
                            message: '结算成功！'
                        };
                        res.send(res.data);
                        connection.end();
                        return;
                    } else {
                        res.data = {
                            status: 5,
                            message: '结算该商品失败，原因未知！'
                        };
                        res.send(res.data);
                        connection.end();
                        return;
                    }
                });

            });
        });







    });

});

//清空购物车
apiRouter.post('/clearGoods', (req, res) => {
    //读取用户信息
    const username = req.user.username;


    //连接数据库
    const connection = mysql.createConnection(dbConfig.mysqlConfig);
    connection.connect(function(err) {
        if (err) {
            res.data = {
                status: 0,
                message: '数据库连接错误：' + err
            };
            res.send(res.data);
            throw '数据库连接错误' + err;
        }
    });
    let userId = null;
    //查询用户信息
    const sql1 = 'select id from account where username=?';
    connection.query(sql1, [username], (err1, results1) => {
        if (err1) {
            res.data = {
                status: 2,
                message: '数据库请求错误：' + err1
            };
            res.send(res.data);
            connection.end();
            return console.log('数据库请求发生错误' + err1);
        }
        //获取到用户ID
        if (results1[0].id) {
            userId = results1[0].id;
        } else {
            res.data = {
                status: 3,
                message: '您当前所操作的账户不存在！'
            };
            res.send(res.data);
            connection.end();
            return;
        }

        //执行清空用户购物车
        const sql2 = 'delete from cart where username=? and user_id=?';
        connection.query(sql2, [username, userId], (err2, results2) => {
            if (err2) {
                res.data = {
                    status: 2,
                    message: '数据库请求错误：' + err2
                };
                res.send(res.data);
                connection.end();
                return console.log('数据库请求发生错误' + err2);
            }
            if (results2) {
                res.data = {
                    status: 1,
                    message: '清空购物车成功'
                };
                res.send(res.data);
                connection.end();
                return;
            } else {
                res.data = {
                    status: 4,
                    message: '清空购物车失败，请重新尝试'
                };
                res.send(res.data);
                connection.end();
                return;
            }
        });
    });


});

//对外接口
module.exports = apiRouter;