//筛选模块
filterSubMenu();





//筛选模块功能
function filterSubMenu() {
    //筛选条件二级菜单显示
    var filterItems = document.querySelectorAll('.filter-items');
    var filterSubItems = document.querySelectorAll('.filter-sub-item');
    for (var i = 0; i < filterItems.length; i++) {
        filterItems[i].setAttribute('data-index', i);
        filterSubItems[i].setAttribute('data-index', i);
        filterItems[i].onmouseover = function() {
            for (var j = 0; j < filterSubItems.length; j++) {
                filterSubItems[j].style.display = 'none';
                filterItems[j].style.backgroundColor = '#fff';
                filterItems[j].querySelector('.icon-ai-arrow-down').style.display = 'inline-block';
                filterItems[j].querySelector('.icon-jiantoushang-copy').style.display = 'none';
            }
            this.style.backgroundColor = '#E2E2E2';
            this.querySelector('.icon-ai-arrow-down').style.display = 'none';
            this.querySelector('.icon-jiantoushang-copy').style.display = 'inline-block';
            filterSubItems[this.getAttribute('data-index')].style.display = 'block';
        };
        filterItems[i].onmouseout = function() {
            this.style.backgroundColor = '#fff';
            this.querySelector('.icon-ai-arrow-down').style.display = 'inline-block';
            this.querySelector('.icon-jiantoushang-copy').style.display = 'none';
            filterSubItems[this.getAttribute('data-index')].style.display = 'none';
        };
        filterSubItems[i].onmouseover = function() {
            this.style.display = 'block';
            this.parentNode.parentNode.querySelectorAll('.icon-ai-arrow-down')[this.getAttribute('data-index')].style.display = 'none';
            this.parentNode.parentNode.querySelectorAll('.icon-jiantoushang-copy')[this.getAttribute('data-index')].style.display = 'inline-block';
            filterItems[this.getAttribute('data-index')].style.backgroundColor = '#E2E2E2';

        };
        filterSubItems[i].onmouseout = function() {
            this.style.display = 'none';
            this.parentNode.parentNode.querySelectorAll('.icon-ai-arrow-down')[this.getAttribute('data-index')].style.display = 'inline-block';
            this.parentNode.parentNode.querySelectorAll('.icon-jiantoushang-copy')[this.getAttribute('data-index')].style.display = 'none';
            filterItems[this.getAttribute('data-index')].style.backgroundColor = '#fff';
        };
    }

    //多选框显示
    var multiSelects = document.querySelectorAll('.multi-select');
    for (var i = 0; i < multiSelects.length; i++) {
        multiSelects[i].onclick = function() {
            var allSelect = document.querySelector('.main-nav-groups').querySelectorAll('.select');
            var selects = this.parentNode.parentNode.querySelectorAll('.select');
            var navRow = this.parentNode.parentNode;
            var navRows = document.querySelector('.main-nav-groups').querySelectorAll('.nav-row');
            if (this.getAttribute('data-flag') == '0') {
                //重置所有容器高度
                for (var z = 0; z < navRows.length - 1; z++) {
                    navRows[z].className = 'nav-row';
                    multiSelects[z].setAttribute('data-flag', '0');
                    navRows[z].querySelector('.nav-body-items').scrollTop = 0;
                }
                //隐藏所有子选项框
                for (var k = 0; k < allSelect.length; k++) {
                    allSelect[k].style.display = 'none';
                }

                //改变对应容器高度
                navRow.className = 'nav-row expand-mode';
                for (var j = 0; j < selects.length; j++) {
                    //显示对应容器中每个子项选中框
                    selects[j].style.display = 'inline-block';
                }
                this.setAttribute('data-flag', '1');
            } else {
                //恢复容器高度
                navRow.className = 'nav-row';
                for (var j = 0; j < selects.length; j++) {
                    //隐藏每个子项选中框
                    selects[j].style.display = 'none';
                }
                this.setAttribute('data-flag', '0');
            }

        };
    }

    //取消筛选扩展
    var cancelBtns = document.querySelector('.main-nav-groups').querySelectorAll('.cancel-multi-select');
    for (var i = 0; i < cancelBtns.length; i++) {
        cancelBtns[i].onclick = function() {
            var thisRow = this;
            while (thisRow.className.indexOf('nav-row') === -1) {
                thisRow = thisRow.parentNode;
            }
            thisRow.className = 'nav-row';
            thisRow.querySelector('.multi-select').setAttribute('data-flag', '0');
            thisRow.querySelector('.nav-body-items').scrollTop = 0;
            var thisSelects = thisRow.querySelectorAll('.select');
            for (var i = 0; i < thisSelects.length; i++) {
                thisSelects[i].style.display = 'none';
            }

        };
    }

    //选中筛选框
    var items = document.querySelector('.main-nav-groups').getElementsByClassName('item');
    //绑定点击改变选项框状态事件
    for (var i = 0; i < items.length; i++) {
        items[i].onclick = function() {
            if (this.querySelector('.text')) {
                var thisMultiselect = this;
                while (thisMultiselect.className.indexOf('nav-row') === -1) {
                    thisMultiselect = thisMultiselect.parentNode;
                }
                thisMultiselect = thisMultiselect.querySelector('.multi-select');
                if (thisMultiselect.getAttribute('data-flag') == '1') {
                    if (this.querySelector('.text').getAttribute('select-flag') == '0') {
                        this.querySelector('.select').style.backgroundPosition = '-69px -423px';
                        this.querySelector('.text').setAttribute('select-flag', '1');
                    } else {
                        this.querySelector('.select').style.backgroundPosition = '-48px -423px';
                        this.querySelector('.text').setAttribute('select-flag', '0');
                    }
                }
            }
        };
    }



    //价格排序的二级菜单
    var priceSort = document.querySelector('.price-sort');
    priceSort.onmouseover = function() {
        // priceSort.querySelector('.sort-sub-list').style.display
    }
}



//接受搜索的参数
var keyword = decodeURI(location.search.substr(location.search.indexOf('=') + 1));
if (keyword.trim()) {
    $(".search-input").val(keyword.trim());
} else {
    $(".search-input").val('');
}

//  主页搜索功能
goodsSearch();

function goodsSearch() {
    $(".search-btn").on("click", function() {
        if ($(".search-input").val().trim()) {
            return location.href = './goodslist.html?keyword=' + $(".search-input").val().trim();
        } else {
            return location.href = './goodslist.html';
        }
    });
    $(".search-input").on("keyup", function(e) {
        if (e.keyCode === 13) {
            if ($(".search-input").val().trim()) {
                return location.href = './goodslist.html?keyword=' + $(".search-input").val().trim();
            } else {
                return location.href = './goodslist.html';
            }
        }
    });
}

//商品分页功能
(function() {

    layui.use(['laypage', 'layer'], function() {
        var laypage = layui.laypage;
        var layer = layui.layer;

        var goodsItemsBox = document.getElementById('goodsItemsBox');
        var hotGoodsBox = document.getElementById('hotGoodsBox');

        //请求商品数据
        var goodsData = [];

        $.ajax({
            url: '/api/goodslist',
            method: 'GET',
            data: {
                keyword: keyword
            },
            success: function(res) {
                if (res.status !== 1) {
                    return console.log(res.message);
                }
                goodsData = res.data;
                //渲染商品列表
                renderGoodsList(res.total, res.limit);
            }
        });

        //商品排序
        $(".sort-module .sort-btn").on("click", function() {
            $.each($(".sort-module .sort-btn"), function(index, item) {
                $(item).removeClass("activity");
            });
            $(".sort-module .sort-price").removeClass("activity");
            $(this).addClass("activity");


            //默认排序
            if ($(this).hasClass("sort-default-btn")) {
                $.ajax({
                    url: '/api/goodslist',
                    method: 'GET',
                    data: {
                        keyword: keyword
                    },
                    success: function(res) {
                        if (res.status !== 1) {
                            return console.log(res.message);
                        }
                        goodsData = res.data;
                        //渲染商品列表
                        renderGoodsList(res.total, res.limit);
                    }
                });

            }

            //按销量排序
            if ($(this).hasClass("sort-sales-btn")) {
                $.ajax({
                    url: '/api/goodslist/sales',
                    method: 'GET',
                    data: {
                        keyword: keyword
                    },
                    success: function(res) {
                        if (res.status !== 1) {
                            return console.log(res.message);
                        }
                        goodsData = res.data;
                        //渲染商品列表
                        renderGoodsList(res.total, res.limit);
                    }
                });
            }

            //按信用（保障金）排序
            if ($(this).hasClass("sort-credit-btn")) {
                $.ajax({
                    url: '/api/goodslist/credit',
                    method: 'GET',
                    data: {
                        keyword: keyword
                    },
                    success: function(res) {
                        if (res.status !== 1) {
                            return console.log(res.message);
                        }
                        goodsData = res.data;
                        //渲染商品列表
                        renderGoodsList(res.total, res.limit);
                    }
                });
            }

            //价格从低到高排序
            if ($(this).hasClass("sort-price-asc")) {
                $(".sort-module .sort-price").html($(this).text() + '<i class="iconfont icon-ai-arrow-down"></i>').addClass("activity");
                $.ajax({
                    url: '/api/goodslist/price_asc',
                    method: 'GET',
                    data: {
                        keyword: keyword
                    },
                    success: function(res) {
                        if (res.status !== 1) {
                            return console.log(res.message);
                        }
                        goodsData = res.data;
                        //渲染商品列表
                        renderGoodsList(res.total, res.limit);
                    }
                });
            }

            //价格从高到低排序
            if ($(this).hasClass("sort-price-desc")) {
                $(".sort-module .sort-price").html($(this).text() + '<i class="iconfont icon-ai-arrow-down"></i>').addClass("activity");
                $.ajax({
                    url: '/api/goodslist/price_desc',
                    method: 'GET',
                    data: {
                        keyword: keyword
                    },
                    success: function(res) {
                        if (res.status !== 1) {
                            return console.log(res.message);
                        }
                        goodsData = res.data;
                        //渲染商品列表
                        renderGoodsList(res.total, res.limit);
                    }
                });
            }


        });

        //根据价格区间排序
        $(".sort-module .price-submit-btn").on("click", function() {
            //获取价格区间的两个值
            var p1 = parseFloat($(".sort-module .input-price-filter1").val().trim());
            var p2 = parseFloat($(".sort-module .input-price-filter2").val().trim());

            //判断输入价格是否合法
            if (!p1 || !p2 || p1 > p2) {
                return layer.msg('请输入正确的价格区间！');
            }
            $.ajax({
                url: '/api/goodslist/price_range',
                method: 'GET',
                data: {
                    price1: p1,
                    price2: p2,
                    keyword: keyword
                },
                success: function(res) {
                    if (res.status !== 1) {
                        return console.log(res.message);
                    }
                    if (res.data.length > 0) {
                        goodsData = res.data;
                        //渲染商品列表
                        renderGoodsList(res.total, res.limit);
                    } else {
                        return layer.msg('没有查询到相应结果！')
                    }

                }
            });

        });


        //渲染商品列表函数
        function renderGoodsList(total, limit) {
            //渲染分页器
            laypage.render({
                elem: 'goodsPage',
                count: total,
                limit: limit,
                layout: ['prev', 'page', 'next', 'skip'],
                jump: function(obj, first) {
                    //渲染对应页的商品数目
                    var data = goodsData.slice((obj.curr - 1) * 48, obj.curr * 48);
                    var goodsArr = [];
                    var goodsStr = '';
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].goods_title.indexOf(keyword) !== -1) {
                            var reg = new RegExp(keyword, 'gi');
                            var goodsTitle = data[i].goods_title.replace(reg, '<span class="s-keyword">' + keyword + '</span>');
                        } else {
                            var goodsTitle = data[i].goods_title;
                        }

                        //商品模板
                        goodsStr = '<div class="goods-item"><div class="goods-pic-wrap"><a href="./item.html?id=' + data[i].id + '" target="_blank"><img src="' + data[i].goods_img + '" alt=""></a></div><div class="goods-info"><div class="line line1 clearfix"><div class="goods-price-box"><span>￥</span><strong class="goods-price">' + data[i].goods_price.toFixed(2) + '</strong></div><div class="pay-number">' + data[i].goods_sales + '人付款</div><div class="goods-service-icon"></div></div><div class="line line2 clearfix"><a href="./item.html?id=' + data[i].id + '" class="goods-title-dec" target="_blank">' + goodsTitle + '</a></div><div class="line line3 clearfix"><div class="goods-shop"><a href="./item.html?id=' + data[i].id + '" class="shop-link" target="_blank"><span class="shop-icon"></span><span class="shop-name">' + data[i].shop_name + '</span></a></div><div class="location">' + '广东 深圳' + '</div></div><div class="line line4 clearfix"><div class="shop-honors"><ul class="clearfix"></ul></div><div class="wangwang-icon"><a href="javascript:;"></a></div></div></div></div>';
                        goodsArr.push(goodsStr);
                    }
                    goodsItemsBox.innerHTML = goodsArr.join('');

                    //渲染掌柜热卖
                    var hotArr = [];
                    var hotGoods = [];
                    var hotStr = '';
                    for (var i = 0; i < 16; i++) {
                        var random = getRandom(0, goodsData.length - 1);
                        while (hotArr.indexOf(random) !== -1) {
                            random = getRandom(0, goodsData.length - 1);
                        }

                        hotArr.push(random);
                        hotStr = ' <li><div class="hot-goods-img-wrap"><a href="./item.html?id=' + goodsData[random].id + '" target="_blank"><img src="' + goodsData[random].goods_img + '" alt=""></a></div><div class="hot-goods-info clearfix"><div class="hot-goods-price"><a href="./item.html?id=' + goodsData[random].id + '" target="_blank"><em>¥</em><strong>' + goodsData[random].goods_price.toFixed(2) + '</strong></a></div><div class="hot-goods-sales"><a href="./item.html?id=' + goodsData[random].id + '" target="_blank">销量：<span>' + goodsData[random].goods_sales + '</span></a></div></div><div class="hot-goods-title-mask"><a href="./item.html?id=' + goodsData[random].id + '" target="_blank"><h3 class="title">' + goodsData[random].goods_title + '</h3></a></div></li>';
                        hotGoods.push(hotStr);
                    }
                    hotGoodsBox.innerHTML = hotGoods.join('');

                }
            });

            //显示总页数文本
            var pageTextDom = document.querySelector('.goods-page').querySelector('.layui-laypage-skip');
            var totalPageText = document.createTextNode('共 ' + Math.ceil(total / limit) + ' 页，');
            pageTextDom.insertBefore(totalPageText, pageTextDom.childNodes[0]);
        }

    });


})();



//获取指定范围的随机整数函数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}