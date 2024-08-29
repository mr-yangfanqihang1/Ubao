//渲染用户信息
$(function() {
    var welcome = document.querySelector('.welcome-user');
    //判断是否存在token
    layui.use('layer', function() {
        var layer = layui.layer;
        if (localStorage.getItem('token')) {
            $.ajax({
                url: '/user/userInfo',
                method: 'GET',
                success: function(res) {
                    //渲染欢迎提示
                    welcome.innerHTML = '欢迎你，<span style="color:#f40;">' + res.data.username + '</span><a href="javascript:;" id="loginout" style="color: #F40;margin-left:10px;">退出登录</a>';
                    loginout();
                    return;
                },
                error: function() {
                    //渲染欢迎提示
                    welcome.innerHTML = '<a href="./login.html" class="login-link">亲，请登录</a><a href="./registered.html" class="reg-link">免费注册</a>';
                    return layer.msg('自动登录失败，请检查网络设置后重新登陆！');
                }
            });
        } else {
            //渲染欢迎提示
            welcome.innerHTML = '<a href="./login.html" class="login-link">亲，请登录</a><a href="./registered.html" class="reg-link">免费注册</a>';
            login();
            return;
        }
    });

});

//登录跳转
function login() {
    $(".login-link").on("click", function(e) {
        e.preventDefault();
        return location.href = './login.html?source=' + location.href;
    });
}

//渲染顶部购物车状态
renderHeaderShopCart();

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
                    //更新购物车数量提示
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

// 触发网站导航
(function() {
    var siteNavTrigger = document.getElementById('siteNavTrigger');
    var sideNavModule = document.getElementById('sideNavModule');
    siteNavTrigger.onmouseover = function() {
        sideNavModule.style.display = 'block';
        siteNavTrigger.style.backgroundColor = '#fff';
    };
    sideNavModule.onmouseover = function() {
        sideNavModule.style.display = 'block';
        siteNavTrigger.style.backgroundColor = '#fff';

    };
    siteNavTrigger.onmouseout = function() {
        sideNavModule.style.display = 'none';
        siteNavTrigger.style.backgroundColor = 'transparent';
    };
    sideNavModule.onmouseout = function() {
        sideNavModule.style.display = 'none';
        siteNavTrigger.style.backgroundColor = 'transparent';
    };
})();

//退出登录功能
function loginout() {
    $("#loginout").on("click", function() {
        localStorage.removeItem('token');
        location.reload();
    });
}