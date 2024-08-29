$(function() {


    //渲染用户购物车商品
    renderUserShopCart();

    function renderUserShopCart() {
        layui.use('layer', function() {
            if (localStorage.getItem('token')) {
                $.ajax({
                    url: '/shop/cartInfo',
                    method: 'POST',
                    success: function(res) {
                        if (res.status !== 1) {
                            $(".cart-item-list").html('<h2 style="padding:100px 0;text-align:center;font-size:60px;color:#f40;">' + res.message + '</h2>');
                            return layer.msg(res.message);
                        }
                        if (res.data.length > 0) {
                            //根据店铺名进行商品分类
                            var shopArr = [];
                            for (var i = 0; i < res.data.length; i++) {
                                if (shopArr.indexOf(res.data[i].shop_name) === -1) {
                                    shopArr.push(res.data[i].shop_name);
                                }
                            }
                            //渲染购物车列表
                            var cartItemStr = '';
                            for (var i = 0; i < shopArr.length; i++) {
                                var cartGoodsStr = '';
                                for (var j = 0; j < res.data.length; j++) {
                                    if (res.data[j].shop_name === shopArr[i]) {
                                        cartGoodsStr += '<div class="cart-item-inner clearfix"><div class="p-checkbox"><div class="td-inner"><span class="diy-checkbox goods-select-checkbox"data-checked="false"></span><input type="hidden" class="s-goods-id" value="' + res.data[j].goods_id + '"></div></div><div class="p-goods"><div class="td-inner"><div class="p-img"><a href="./item.html?id=' + res.data[j].goods_id + '"><img src="' + res.data[j].goods_img + '"alt=""></a></div><div class="p-msg"><a href="./item.html?id=' + res.data[j].goods_id + '">' + res.data[j].goods_name + '</a></div></div></div><div class="p-category"><div class="td-inner"></div></div><div class="p-price"><div class="td-inner"><div class="td-item-price"><p class="price-line"><em class="now-price">￥' + parseFloat(res.data[j].goods_price).toFixed(2) + '</em></p></div></div></div><div class="p-num"><div class="td-inner"><div class="quantity-form"><a href="javascript:;"class="decrement btn">-</a><input type="text"class="itxt s-goods-num" value="' + res.data[j].goods_num + '"><a href="javascript:;"class="increment btn">+</a></div></div></div><div class="p-sum"><div class="td-inner"><em class="item-price-sum">￥' + (parseFloat(res.data[j].goods_price) * parseInt(res.data[j].goods_num)).toFixed(2) + '</em></div></div><div class="p-action"><div class="td-inner"><a href="javascript:;" class="s-collect-goods">移入收藏夹</a><a href="javascript:;" class="s-del-goods">删除</a></div></div></div>'
                                    }
                                }
                                cartItemStr += '<div class="cart-item check-cart-item clearfix"><div class="shop-info clearfix"><div class="shop-checkbox-wrap"><span class="diy-checkbox shop-select-checkbox"data-checked="false"></span></div><div class="shop-name-box"><span>&nbsp;&nbsp;店铺：</span><a href="javascript:;"class="shop-name">' + shopArr[i] + '</a><a href="javascript:;"class="wangwang-icon"></a></div></div>' + cartGoodsStr + '</div>';
                            }
                            $(".cart-item-list").html(cartItemStr);
                        } else {
                            $(".all-select-checkbox").attr("data-checked", "false");
                            $(".cart-item-list").html('<h2 style="padding:100px 0;text-align:center;font-size:60px;color:#f40;"><a href="./goodslist.html">您的购物车为空，请去添加商品吧！</a></h2>');
                        }
                        //加载购物车基本功能
                        shopCartModule();
                        //更新结算按钮状态
                        actSettlement();
                        //计算选中商品数量和价格
                        calcAllGoodsSum();
                        //控制结算栏位置
                        floatBar();
                    },
                    error: function() {

                        $(".cart-item-list").html('<h2 style="padding:100px 0;text-align:center;font-size:60px;color:#f40;">获取购物车失败，请检查网络设置！</h2>');
                        //更新结算按钮状态
                        actSettlement();
                        //计算选中商品数量和价格
                        calcAllGoodsSum();
                        //控制结算栏位置
                        floatBar();
                        return layer.msg('获取购物车失败，请检查网络设置！');


                    }
                });
            } else {
                $(".cart-item-list").html('<h2 style="padding:100px 0;text-align:center;font-size:60px;color:#f40;"><a href="./login.html">您还未登录，请登陆后查看购物车！</a></h2>');
                return layer.msg('您还未登录，请登陆后查看购物车！');
            }
        });

    }



    //控制结算栏位置
    function floatBar() {
        var cartFloatbarBox = document.querySelector('.cart-floatbar-box');
        var cartFloatbar = cartFloatbarBox.querySelector('.cart-floatbar');

        window.onresize = function() {
            if (window.innerHeight > cartFloatbarBox.offsetTop) {
                cartFloatbar.className = 'cart-floatbar';
            } else {
                cartFloatbar.className = 'cart-floatbar cart-floatbar-fixed';
            }
            window.onscroll();
        };
        window.onscroll = function() {
            if (window.innerHeight > cartFloatbarBox.offsetTop) {
                cartFloatbar.className = 'cart-floatbar';
            } else {
                if (document.documentElement.scrollTop + window.innerHeight >= cartFloatbarBox.offsetTop) {
                    cartFloatbar.className = 'cart-floatbar';
                } else {
                    cartFloatbar.className = 'cart-floatbar cart-floatbar-fixed';
                }
            }
        };

        window.onresize();
    }


    //购物车基础功能
    function shopCartModule() {
        //自定义选中框
        $(".diy-checkbox").on("click", function() {
            if ($(this).attr("data-checked") === "false") {
                $(this).attr("data-checked", "true");
            } else {
                $(this).attr("data-checked", "false");
            }

            //更新结算按钮状态
            actSettlement();
            //计算选中商品数量和价格
            calcAllGoodsSum();
        });


        //全选功能
        $(".all-select-checkbox").on("click", function() {
            if ($(this).attr("data-checked") === "true") {
                $(".diy-checkbox").attr("data-checked", "true");
            } else if ($(this).attr("data-checked") === "false") {
                $(".diy-checkbox").attr("data-checked", "false");
            }
            //更新结算按钮状态
            actSettlement();
            //计算选中商品数量和价格
            calcAllGoodsSum();
        });

        //店铺商品局部全选功能
        $(".shop-select-checkbox").on("click", function() {
            if ($(this).attr("data-checked") === "true") {
                $(this).parents(".cart-item").find(".goods-select-checkbox").attr("data-checked", "true");
            } else if ($(this).attr("data-checked") === "false") {
                $(this).parents(".cart-item").find(".goods-select-checkbox").attr("data-checked", "false");
            }

            //是否满足所有商品全选
            var allFlag = true;
            $.each($(".goods-select-checkbox"), function(index, item) {
                if ($(item).attr("data-checked") === "false") {
                    allFlag = false;
                }
            });
            if (allFlag) {
                $(".all-select-checkbox").attr("data-checked", "true");
            } else {
                $(".all-select-checkbox").attr("data-checked", "false");
            }
            //更新结算按钮状态
            actSettlement();
            //计算选中商品数量和价格
            calcAllGoodsSum();
        });

        //当满足条件时自动勾选全选
        $(".goods-select-checkbox").on("click", function() {
            //是否满足店铺全选
            var shopFlag = true;
            $.each($(this).parents(".cart-item").find(".goods-select-checkbox"), function(index, item) {
                if ($(item).attr("data-checked") === "false") {
                    shopFlag = false;
                }
            });
            if (shopFlag) {
                $(this).parents(".cart-item").find(".shop-select-checkbox").attr("data-checked", "true");
            } else {
                $(this).parents(".cart-item").find(".shop-select-checkbox").attr("data-checked", "false");
            }

            //是否满足所有商品全选
            var allFlag = true;
            $.each($(".goods-select-checkbox"), function(index, item) {
                if ($(item).attr("data-checked") === "false") {
                    allFlag = false;
                }
            });
            if (allFlag) {
                $(".all-select-checkbox").attr("data-checked", "true");
            } else {
                $(".all-select-checkbox").attr("data-checked", "false");
            }
        });

        var cartItemListBox = document.querySelector('.cart-item-list');

        //事件委托
        cartItemListBox.oninput = function(e) {
            e = e || window.event;
            var target = e.target || src.element;

            //数量操作处理
            if (target.className.indexOf('s-goods-num') !== -1) {
                goodsNumLimit(target);
            }

        };
        //增加商品数量
        $(".cart-item-list").on("click", ".increment", function() {
            //判断是否为可点击状态
            if (!$(this).hasClass("ban")) {
                //加1数量
                $(this).siblings(".s-goods-num").val(parseInt($(this).siblings(".s-goods-num").val()) + 1);
                //数量操作处理
                goodsNumLimit($(this).siblings(".s-goods-num").get(0));

            } else {
                return;
            }
        });

        //减少商品数量
        $(".cart-item-list").on("click", ".decrement", function() {
            //判断是否为可点击状态
            if (!$(this).hasClass("ban")) {
                //减1数量
                $(this).siblings(".s-goods-num").val(parseInt($(this).siblings(".s-goods-num").val()) - 1);
                //数量操作处理
                goodsNumLimit($(this).siblings(".s-goods-num").get(0));

            } else {
                return;
            }
        });

        //删除商品功能
        $(".cart-item-list").on("click", ".s-del-goods", function() {
            var $that = $(this);
            layui.use('layer', function() {
                var layer = layui.layer;

                layer.open({
                    title: '确认删除',
                    content: '您确定要删除该商品吗？',
                    btn: ['确定', '取消'],
                    btn1: function(index, layero) {
                        if (localStorage.getItem('token')) {
                            //执行删除购物车商品请求
                            $.ajax({
                                url: '/shop/deleteCartGoods',
                                method: 'POST',
                                data: {
                                    goodsId: parseInt($that.parents(".cart-item-inner").find(".s-goods-id").val())
                                },
                                success: function(res) {
                                    if (res.status !== 1) {
                                        return layer.msg(res.message);
                                    }
                                    layer.msg(res.message);
                                    //在当前页面中删除该商品
                                    if ($that.parents(".cart-item").find(".cart-item-inner").length > 1) {
                                        $that.parents(".cart-item-inner").remove();
                                    } else {
                                        $that.parents(".cart-item").remove();
                                    }
                                    //更新结算按钮状态
                                    actSettlement();
                                    //计算选中商品数量和价格
                                    calcAllGoodsSum();
                                    //控制结算栏位置
                                    floatBar();
                                    //渲染顶部迷你购物车
                                    renderHeaderShopCart();
                                    //是否满足全选
                                    //是否满足所有商品全选
                                    var allFlag = true;
                                    $.each($(".goods-select-checkbox"), function(index, item) {
                                        if ($(item).attr("data-checked") === "false") {
                                            allFlag = false;
                                        }
                                    });
                                    if (allFlag) {
                                        $(".all-select-checkbox").attr("data-checked", "true");
                                    } else {
                                        $(".all-select-checkbox").attr("data-checked", "false");
                                    }

                                }
                            });
                        } else {
                            layer.msg('身份认证失败，请重新登陆！')
                            setTimeout(function() {
                                return location.href = './login.html?source=' + location.href;
                            }, 2000);
                        }

                    }
                });
            });
        });




        //删除选中商品
        layui.use('layer', function() {
            var layer = layui.layer;

            $(".remove-batch").on("click", function() {
                if (localStorage.getItem('token')) {
                    layer.confirm('您确定要删除选中商品吗？', { icon: 3, title: '确认删除' }, function(index) {
                        $.each($('.goods-select-checkbox[data-checked="true"]'), function(index, item) {
                            $.ajax({
                                url: '/shop/deleteCartGoods',
                                method: 'POST',
                                data: {
                                    goodsId: parseInt($(item).parents(".cart-item-inner").find(".s-goods-id").val())
                                },
                                success: function(res) {
                                    if (res.status !== 1) {
                                        return layer.msg(res.message);
                                    }
                                    layer.msg(res.message);
                                    //在当前页面中删除该商品
                                    if ($(item).parents(".cart-item").find(".cart-item-inner").length > 1) {
                                        $(item).parents(".cart-item-inner").remove();
                                    } else {
                                        $(item).parents(".cart-item").remove();
                                    }
                                    //更新结算按钮状态
                                    actSettlement();
                                    //计算选中商品数量和价格
                                    calcAllGoodsSum();
                                    //控制结算栏位置
                                    floatBar();
                                    //渲染顶部迷你购物车
                                    renderHeaderShopCart();
                                    //去除全选
                                    $(".all-select-checkbox").attr("data-checked", "false");
                                    //判断购物车是否为空
                                    $.ajax({
                                        url: '/shop/cartInfo',
                                        method: 'POST',
                                        success: function(res) {
                                            if (res.status !== 1) {
                                                $(".cart-item-list").html('<h2 style="padding:100px 0;text-align:center;font-size:60px;color:#f40;">' + res.message + '</h2>');
                                                return layer.msg(res.message);
                                            }
                                            if (res.data.length === 0) {

                                                $(".cart-item-list").html('<h2 style="padding:100px 0;text-align:center;font-size:60px;color:#f40;"><a href="./goodslist.html">您的购物车为空，请去添加商品吧！</a></h2>');
                                            }
                                        },
                                        error: function() {

                                            $(".cart-item-list").html('<h2 style="padding:100px 0;text-align:center;font-size:60px;color:#f40;">获取购物车失败，请检查网络设置！</h2>');
                                            return layer.msg('获取购物车失败，请检查网络设置！');
                                        }
                                    });
                                }
                            });
                        });

                        layer.close(index);
                    });

                } else {
                    layer.msg('身份认证失败，请重新登陆！');
                    setTimeout(function() {
                        return location.href = './login.html?source=' + location.href;
                    }, 2000);
                }
            });
        });

        //结算功能
        layui.use('layer', function() {
            var layer = layui.layer;

            $("#cartSettlementBtn").on("click", function(e) {
                e.preventDefault();
                //判断是否可点击
                if ($(this).attr("data-disabled") === "false") {
                    if (localStorage.getItem('token')) {
                        layer.confirm('您确定要结算选中商品吗？', { icon: 3, title: '确认结算' }, function(index) {
                            $.each($('.goods-select-checkbox[data-checked="true"]'), function(index, item) {
                                $.ajax({
                                    url: '/shop/settlement',
                                    method: 'POST',
                                    data: {
                                        goodsId: parseInt($(item).parents(".cart-item-inner").find(".s-goods-id").val()),
                                        goodsNum: parseInt($(item).parents(".cart-item-inner").find(".s-goods-num").val())
                                    },
                                    success: function(res) {
                                        if (res.status !== 1) {
                                            return layer.msg(res.message);
                                        }
                                        layer.msg(res.message);
                                        //在当前页面中删除该商品
                                        if ($(item).parents(".cart-item").find(".cart-item-inner").length > 1) {
                                            $(item).parents(".cart-item-inner").remove();
                                        } else {
                                            $(item).parents(".cart-item").remove();
                                        }
                                        //更新结算按钮状态
                                        actSettlement();
                                        //计算选中商品数量和价格
                                        calcAllGoodsSum();
                                        //控制结算栏位置
                                        floatBar();
                                        //去除全选
                                        $(".all-select-checkbox").attr("data-checked", "false");
                                        //渲染顶部迷你购物车
                                        renderHeaderShopCart();
                                        //判断购物车是否为空
                                        $.ajax({
                                            url: '/shop/cartInfo',
                                            method: 'POST',
                                            success: function(res) {
                                                if (res.status !== 1) {
                                                    $(".cart-item-list").html('<h2 style="padding:100px 0;text-align:center;font-size:60px;color:#f40;">' + res.message + '</h2>');
                                                    return layer.msg(res.message);
                                                }
                                                if (res.data.length === 0) {

                                                    $(".cart-item-list").html('<h2 style="padding:100px 0;text-align:center;font-size:60px;color:#f40;"><a href="./goodslist.html">您的购物车为空，请去添加商品吧！</a></h2>');
                                                }
                                            },
                                            error: function() {

                                                $(".cart-item-list").html('<h2 style="padding:100px 0;text-align:center;font-size:60px;color:#f40;">获取购物车失败，请检查网络设置！</h2>');
                                                return layer.msg('获取购物车失败，请检查网络设置！');
                                            }
                                        });

                                    }
                                });
                            });

                            layer.close(index);
                        });

                    } else {
                        layer.msg('身份认证失败，请重新登陆！');
                        setTimeout(function() {
                            return location.href = './login.html?source=' + location.href;
                        }, 2000);
                    }

                } else {
                    return;
                }

            });
        });

        //清理购物车功能
        layui.use('layer', function() {
            var layer = layui.layer;

            $(".clear-all").on("click", function() {
                layer.confirm('您确定要清空购物车吗？这将会删除购物车中的所有商品！', { icon: 3, title: '确认清空购物车' }, function(index) {
                    if (localStorage.getItem('token')) {
                        $.ajax({
                            url: '/shop/clearGoods',
                            method: 'POST',
                            success: function(res) {
                                if (res.status !== 1) {
                                    return layer.msg(res.message);
                                }
                                layer.msg(res.message);
                                //重新渲染购物车
                                renderUserShopCart();
                                //渲染顶部迷你购物车
                                renderHeaderShopCart();
                            }
                        })
                    } else {
                        layer.msg('身份认证失败，请重新登陆！');
                        setTimeout(function() {
                            return location.href = './login.html?source=' + location.href;
                        }, 2000);
                    }
                    layer.close(index);
                });
            });
        });


    }

    //商品数量操作
    function goodsNumLimit(obj) {
        var goodsId = parseInt($(obj).parents(".cart-item-inner").find(".s-goods-id").val());
        //数量只能为大于等于1的整数
        if (!parseInt(obj.value) || obj.value == 1) {
            obj.value = 1;
            //更新数据中购物车商品数量
            updateShop(goodsId, parseInt(obj.value));
            //计算单类商品总金额
            calcGoodsPrice(obj);
            //计算选中商品数量和价格
            calcAllGoodsSum();
            //禁用减少按钮
            $(obj).siblings(".decrement").addClass("ban");

        } else {
            //数量不能超过库存
            //获取库存数量
            $.ajax({
                url: '/api/item/goods_num',
                method: 'GET',
                data: {
                    goodsId: parseInt($(obj).parents(".cart-item-inner").find(".s-goods-id").val())
                },
                success: function(res) {
                    if (parseInt(obj.value) >= parseInt(res.data.goods_reserve)) {
                        obj.value = parseInt(res.data.goods_reserve);
                        //更新数据中购物车商品数量
                        updateShop(goodsId, parseInt(obj.value));
                        //计算单类商品总金额
                        calcGoodsPrice(obj);
                        //计算选中商品数量和价格
                        calcAllGoodsSum();
                        //禁用增加数量按钮
                        $(obj).siblings(".increment").addClass("ban");
                        layer.msg("已达到最大库存量，不能再继续添加！");
                    } else {
                        obj.value = parseInt(obj.value);
                        //更新数据中购物车商品数量
                        updateShop(goodsId, parseInt(obj.value));
                        //计算单类商品总金额
                        calcGoodsPrice(obj);
                        //计算选中商品数量和价格
                        calcAllGoodsSum();
                        //激活增加按钮
                        $(obj).siblings(".increment").removeClass("ban");
                    }
                    //数量大于1激活减少按钮
                    if (parseInt(obj.value) > 1) {
                        $(obj).siblings(".decrement").removeClass("ban");
                    }
                }
            });
        }
    }

    //计算单类商品总金额
    function calcGoodsPrice(obj) {
        $(obj).parents(".cart-item-inner").find(".item-price-sum").text("￥" + (parseInt($(obj).val()) * parseFloat($(obj).parents(".cart-item-inner").find(".now-price").text().replace('￥', ''))).toFixed(2));
    }

    //更新购物车商品数量
    function updateShop(goodsId, goodsNum) {
        layui.use("layer", function() {
            var layer = layui.layer;
            if (localStorage.getItem('token')) {
                $.ajax({
                    url: '/shop/updateGoodsNum',
                    method: 'POST',
                    data: {
                        goodsId: goodsId,
                        goodsNum: goodsNum
                    },
                    success: function(res) {
                        if (res.status !== 1) {
                            return layer.msg(res.message);
                        }
                    },
                    error: function() {
                        return layer.msg('更新数据库失败，请检查网络设置！');
                    }
                });
            } else {
                layer.msg('身份认证失败，请重新登陆！');
                setTimeout(function() {
                    return location.href = './login.html?source=' + location.href;
                }, 2000);
            }
        });

    }

    //计算全部选中的商品总价格
    function calcAllGoodsSum() {
        var sum = 0;
        var count = 0;
        $.each($(".goods-select-checkbox"), function(index, item) {
            if ($(item).attr("data-checked") === "true") {
                count++;
                sum += parseFloat($(item).parents(".cart-item-inner").find(".item-price-sum").text().replace('￥', ''));
            }
        });
        $(".amount-sum-num").text(count);
        $(".price-sum-num").text(sum.toFixed(2));
    }

    //激活结算按钮
    function actSettlement() {
        var flag = true;
        $.each($(".goods-select-checkbox"), function(index, item) {
            if ($(item).attr("data-checked") === "true") {
                $("#cartSettlementBtn").attr("data-disabled", "false");
                flag = false;
            }
        });
        if (flag) {
            $("#cartSettlementBtn").attr("data-disabled", "true");
        }
    }

    //渲染顶部购物车状态
    function renderHeaderShopCart() {
        layui.use('layer', function() {
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
        });
    }
});