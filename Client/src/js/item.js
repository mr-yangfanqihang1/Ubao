//渲染商品页面

//渲染顶部购物车
renderHeaderShopCart();
//获取url携带的商品ID
var goodsId = parseInt(location.search.substr(location.search.indexOf('=') + 1));

var goodsMain = document.querySelector('.goods-main');
//发起获取商品详情数据请求
$.ajax({
    url: '/api/item',
    method: 'GET',
    data: {
        id: goodsId
    },
    success: function(res) {
        switch (res.status) {
            case 0:
                goodsMain.innerHTML = '<h2 style="padding:100px 0;text-align:center;font-size:60px;color:#f40;">数据库连接错误，请检查设置！</h2>';
                break;
            case 2:
                goodsMain.innerHTML = '<h2 style="padding:100px 0;text-align:center;font-size:60px;color:#f40;">数据库请求过程中发生错误，请重新尝试！</h2>';
                break;
            case 3:
                goodsMain.innerHTML = '<h2 style="padding:100px 0;text-align:center;font-size:60px;color:#f40;">很遗憾，所请求的商品不存在！</h2>';
                break;
            case 1:
                var d = res.data;
                //设置网站标题
                document.title = d.goods_title;

                //判断是否是金牌卖家
                var shopStr = '';
                if (d.gold_periods) {
                    shopStr = '<div class="gold-seller"><a href="javascript:;"><div class="gold-periods">连续<span class="gold-periods-num">' + d.gold_periods + '</span>期</div><img src="./images/gold-seller.png" alt=""></a><a href="javascript:;" class="gold-img-wrap"></a></div>';
                }
                //判断店铺年数
                if (d.shop_years) {
                    shopStr += '<div class="shop-age"><a href="javascript:;"><div class="shop-age-content"><i class="shop-age-icon"></i><span class="shop-age-num">' + d.shop_years + '</span><span class="shop-age-text">年老店</span></div></a></div>';
                }

                //处理无效的描述图片
                var goodsImgStr = d.goods_desc.replace(/\/\/img.alicdn.com\/tps\/i4\/T10B2IXb4cXXcHmcPq-85-85.gif/gi, './images/loading.gif');

                // 处理无效的参数图片
                var goodsParamsStr = d.goods_params.replace(/<img src/gi, '<img src="./images/loading.gif" data-src');

                //商品详情页面模板
                var goodsStr = '<div class="goods-detail-info clearfix"><div class="goods-info-left clearfix"><div class="goods-pre-img"><div class="preview-box"><div class="mask"></div><img src="' + d.goods_img + '" alt=""></div><div class="bigImg-box"><div class="bigImg-wrap"><img src="' + d.goods_img + '" alt="" class="big-img"></div></div></div><div class="goods-info-wrap"><div class="goods-info-inner"><div class="goods-title"><h3>' + d.goods_title + '</h3></div><div class="sales-box"><ul class="clearfix"><li class="price-box"><span class="txt">价格</span><strong><em class="rmb-symbol">￥</em><em class="goods-price">' + d.goods_price.toFixed(2) + '</em></strong></li><li class="goods-data-count clearfix"><div class="cmt-box"><a href="javascript:;"><strong class="cmt-count">' + d.cmt_num + '</strong><span>累计评论</span></a></div><div class="sales-data"><a href="javascript:;"><strong class="sals-count">' + d.goods_sales + '</strong><span>交易成功</span></a></div></li></ul></div><div class="logistics"><div class="logistics-inner clearfix"><div class="line-name">配送</div><div class="logistics-info clearfix"><div class="area-info"><span class="from-address">广东深圳</span> 至 <span class="target-address">广东深圳宝安区</span></div></div></div></div><div class="purchase-box"><div class="purchase-inner"><div class="goods-amount clearfix"><div class="line-name">数量</div><div class="goods-num-box clearfix"><a href="javascript:;" class="tb-reduce-goods ban">-</a><input type="text" class="tb-goods-num" value="1"><a href="javascript:;" class="tb-add-goods">+</a></div><div class="goods-reserve">件(库存<em>' + d.goods_reserve + '</em>件)</div></div></div></div><div class="goods-action"><div class="goods-action-inner clearfix"><div class="tb-buy-wrap"><a href="javascript:;" class="buy-goods-btn">立即购买</a></div><div class="tb-add-wrap"><a href="javascript:;" class="add-goods-btn"><i class="iconfont icon-tianchongxing-"></i>加入购物车</a></div></div></div><div class="goods-service"><dl class="clearfix"><dt>承诺</dt><dd class="clearfix"><a href="javascript:;"><img src="./images/goods-service-icon1.png" alt="">15天退货</a><a href="javascript:;"><img src="./images/goods-service-icon2.png" alt="">公益宝贝</a></dd></dl><dl class="clearfix"><dt>支付</dt><dd class="clearfix"><a href="javascript:;"><img src="./images/goods-service-icon3.png" alt="">蚂蚁花呗</a><a href="javascript:;"><img src="./images/goods-service-icon4.png" alt="">信用卡支付</a></dd></dl><dl class="clearfix"><dt>支持</dt><dd class="clearfix">折旧变现，买新更省钱。<a href="javascript:;" style="float: none;display: inline;text-decoration: underline;">详情</a></dd></dl></div></div></div></div><div class="goods-info-right"><div class="shop-sidebar">' + shopStr + '<div class="shop-info"><div class="shop-info-inner"><div class="line line1 "><span class="shop-name">' + d.shop_name + '</span></div><div class="line line2 "><dl class="clearfix"><dt>信誉：</dt><dd class="shop-reputation clearfix">' + d.reputation + '</dd></dl></div><div class="line line3 "><dl class="clearfix"><dt>掌柜：</dt><dd class=" clearfix"><span class="shopkeeper">' + d.seller + '</span></dd></dl></div><div class="line line4 "><dl class="clearfix"><dt>联系：</dt><dd class=" clearfix"><a href="javascript:;" class="contact-me"></a></dd></dl></div><div class="line line5 "><dl class="clearfix"><dt>资质：</dt><dd class=" clearfix"><a href="javascript:;" class="qualification-icon"></a><a href="javascript:;" class="shop-bond"><span class="shop-bond-icon"></span><span class="shop-bond-num">' + parseInt(d.qualify) + '<span>元</span> </span></a></dd></dl></div><div class="shop-score clearfix"><dl><dt>描述</dt><dd><a href="javascript:;" class="shop-desc-score">' + d.grade_desc.toFixed(1) + '</a></dd></dl><dl><dt>服务</dt><dd><a href="javascript:;" class="shop-service-score">' + d.grade_service.toFixed(1) + '</a></dd></dl><dl><dt>物流</dt><dd><a href="javascript:;" class="shop-logistics-score">' + d.grade_logistics.toFixed(1) + '</a></dd></dl></div><div class="shop-info-ft clearfix"><a href="javascript:;" class="shop-link">进入店铺</a><a href="javascript:;" class="collect-shop">收藏店铺</a></div></div></div></div></div></div><div class="goods-content clearfix"><div class="goods-cont-inner clearfix"><div class="goods-cont-left"></div><div class="goods-cont-right"><div class="tab-bar"><ul class="tab-bar-list clearfix"><li class="activity"><a href="javascript:;">宝贝详情</a><div class="activity-line"></div></li><li><a href="javascript:;">累计评论</a></li><li><a href="javascript:;">专享服务</a></li></ul></div><div class="main-wrap"><div class="goods-params"><div class="goods-params-inner"><h3>产品参数</h3><ul class="goods-params-list clearfix">' + goodsParamsStr + '</ul></div></div><div class="goods-description"><div class="description-inner"><p>' + goodsImgStr + '</p></div></div></div></div></div></div>';

                //渲染页面
                goodsMain.innerHTML = goodsStr;

                //执行放大镜功能
                zoom();
                //执行添加到购物车功能
                addGoods();
                break;
            default:
                goodsMain.innerHTML = '<h2 style="padding:100px 0;text-align:center;font-size:60px;color:#f40;">请求商品数据失败，原因未知！</h2>';

                break;
        }

    },
    error: function(res) {
        return goodsMain.innerHTML = '<h2 style="padding:100px 0;text-align:center;font-size:60px;color:#f40;">请求商品数据失败，请检查网络设置！</h2>';
    }
});

//加入购物车功能
function addGoods() {
    layui.use('layer', function() {
        var layer = layui.layer;

        //商品数量控制
        var goodsNumInput = document.getElementsByClassName('tb-goods-num')[0];
        var limitFlag = false;

        goodsNumInput.oninput = function() {
            goodsNumLimit();
        };

        //增加商品数量
        $(".tb-add-goods").on("click", function() {
            //判断是否为可点击状态
            if (!$(this).hasClass("ban")) {
                //加1数量
                $(goodsNumInput).val(parseInt($(goodsNumInput).val()) + 1);
                //数量限制处理
                goodsNumLimit();
            } else {
                return;
            }
        });

        //减少商品数量
        $(".tb-reduce-goods").on("click", function() {
            //判断是否为可点击状态
            if (!$(this).hasClass("ban")) {
                //减1数量
                $(goodsNumInput).val(parseInt($(goodsNumInput).val()) - 1);
                //数量限制处理
                goodsNumLimit();
            } else {
                return;
            }
        });

        //加入到购物车
        $(".add-goods-btn").on("click", function() {
            if (localStorage.getItem('token')) {
                var qData = {
                    goodsId: goodsId,
                    goodsNum: parseInt(goodsNumInput.value)
                };
                //商品数量限制
                goodsNumLimit(add);

                function add() {
                    $.ajax({
                        url: '/shop/addGoods',
                        method: 'POST',
                        data: qData,
                        success: function(res) {
                            if (res.status !== 1) {
                                return layer.msg(res.message);
                            }
                            //添加成功后更新顶部购物车
                            renderHeaderShopCart();
                            layer.msg(res.message);
                            return;
                        },
                        error: function() {
                            return layer.msg("加入购物车失败，请检查网络设置！");
                        }
                    });
                }
            } else {
                layer.msg("请先登录！");
                setTimeout(function() {
                    return location.href = './login.html?source=' + location.href;
                }, 1500);
            }
        });


        //商品数量限制
        function goodsNumLimit(cb) {
            //数量只能为大于等于1的整数
            if (!parseInt(goodsNumInput.value) || goodsNumInput.value == 1) {
                goodsNumInput.value = 1;
                //禁用减少按钮
                $(".tb-reduce-goods").addClass("ban");
                //执行传递进来的回调函数
                if (cb) {
                    cb();
                }
            } else {
                //数量不能超过库存
                //获取库存数量
                $.ajax({
                    url: '/api/item/goods_num',
                    method: 'GET',
                    data: {
                        goodsId: goodsId
                    },
                    success: function(res) {
                        if (parseInt(goodsNumInput.value) >= parseInt(res.data.goods_reserve)) {
                            goodsNumInput.value = parseInt(res.data.goods_reserve);
                            //禁用增加数量按钮
                            $(".tb-add-goods").addClass("ban");
                            layer.msg("已达到最大库存量，不能再继续添加！");
                        } else {
                            goodsNumInput.value = parseInt(goodsNumInput.value);
                            //激活增加按钮
                            $(".tb-add-goods").removeClass("ban");
                        }
                        //数量大于1激活减少按钮
                        if (parseInt(goodsNumInput.value) > 1) {
                            $(".tb-reduce-goods").removeClass("ban");
                        }
                        //执行传递进来的回调函数
                        if (cb) {
                            cb();
                        }
                    },
                    error: function() {
                        return layer.msg('获取商品库存失败，请检查网络设置！');
                    }
                });
            }
        }


    });

}

//放大镜功能
function zoom() {
    var box = document.querySelector('.goods-pre-img');
    var mask = box.querySelector('.mask');
    var previewBox = box.querySelector('.preview-box');
    var bigImgBox = box.querySelector('.bigImg-box');
    var bigImg = box.querySelector('.bigImg-wrap');

    // 设置遮罩层的大小
    var w = previewBox.clientWidth * bigImgBox.clientWidth / bigImg.clientWidth;
    mask.style.width = w + 'px';
    mask.style.height = w + 'px';

    bigImgBox.style.display = 'none';

    // 鼠标移动遮罩层

    previewBox.onmouseenter = function() {
        mask.style.display = 'block';
        bigImgBox.style.display = 'block';
    };
    previewBox.onmouseleave = function() {
        mask.style.display = 'none';
        bigImgBox.style.display = 'none';
    };

    previewBox.onmousemove = function(e) {
        if (e.pageX - box.offsetLeft - box.clientLeft > mask.offsetWidth / 2) {
            mask.style.left = e.pageX - box.offsetLeft - box.clientLeft - mask.offsetWidth / 2 + 'px';
        } else {
            mask.style.left = '0px';
        }
        if (e.pageY - box.offsetTop - box.clientTop > mask.offsetHeight / 2) {
            mask.style.top = e.pageY - box.offsetTop - box.clientTop - mask.offsetHeight / 2 + 'px';
        } else {
            mask.style.top = '0px';
        }
        if ((box.clientWidth - (e.pageX - box.offsetLeft)) <= mask.offsetWidth / 2) {
            mask.style.left = (box.offsetWidth - Math.ceil(parseFloat(mask.style.width))) + 'px';
        }
        if ((box.clientHeight - (e.pageY - box.offsetTop)) <= mask.offsetHeight / 2) {
            mask.style.top = (box.offsetHeight - Math.ceil(parseFloat(mask.style.height))) + 'px';
        }
        bigImg.style.transform = 'translate(' + (-parseFloat(mask.style.left) * bigImg.offsetWidth / previewBox.clientWidth) + 'px,' + (-parseFloat(mask.style.top) * bigImg.offsetHeight / previewBox.clientHeight) + 'px)';
    };
}

//渲染顶部购物车状态
function renderHeaderShopCart() {
    layui.use('layer', function() {
        if (localStorage.getItem('token')) {
            $.ajax({
                url: '/shop/cartInfo',
                method: 'POST',
                success: function(res) {
                    if (res.status !== 1) {
                        //渲染顶部购物车
                        $(".shopping-cart-menu").html('<p>' + res.message + '<a href="./login.html" class="my-shopping-cart-link">重新登录</a></p>');
                        return layer.msg(res.message);
                    }
                    $(".header-right-nav .shopping-cart .good-num").text(res.data.length);
                    if (res.data.length > 0) {
                        var miniGoodsStr = '';
                        for (var i = 0; i < res.data.length; i++) {
                            if (i >= 3) {
                                break;
                            }
                            miniGoodsStr += '<div class="mini-item clearfix"><div class="mini-goods-img-wrap"><a href="./item.html?id=' + res.data[i].goods_id + '"><img src="' + res.data[i].goods_img + '" alt="" title="' + res.data[i].goods_name + '"></a></div><div class="mini-goods-title"><h4><a href="./item.html?id=' + res.data[i].goods_id + '" title="' + res.data[i].goods_name + '">' + res.data[i].goods_name + '</a></h4></div><div class="mini-goods-right"><div class="mini-goods-price"><em class="rmb-symbol">￥</em><em class="goods-price">' + parseFloat(res.data[i].goods_price).toFixed(2) + '</em></div><div class="goods-option"><a href="javascript:;" class="hd-mini-cart-delete">删除</a></div></div></div>';
                        }
                        var miniCartStr = '<div class="mini-cart-hd"><h4>最近加入的宝贝：</h4></div><div class="mini-cart-goods">' + miniGoodsStr + '</div><div class="mini-cart-ft clearfix"><h3>更多请查看完整版购物车→</h3><a href="./cart.html" class="my-shopping-cart-link">查看我的购物车</a></div>';
                        //渲染顶部迷你购物车
                        $(".shopping-cart-menu").html(miniCartStr);
                    } else {
                        $(".shopping-cart-menu").html('<p>您购物车里还没有任何宝贝。<a href="./cart.html" class="my-shopping-cart-link">查看我的购物车</a></p>');
                    }
                },
                error: function() {
                    //渲染顶部购物车
                    $(".shopping-cart-menu").html('<p>请检查网络设置，或者重新登陆。<a href="./login.html" class="my-shopping-cart-link">重新登录</a></p>');
                    return layer.msg('请求购物车信息失败，请检查网络设置！');
                }
            });
        } else {
            $(".shopping-cart-menu").html('<p>您还未登录，请先登录。<a href="./login.html" class="my-shopping-cart-link">点我登录</a></p>');
            return;
        }

    });
}