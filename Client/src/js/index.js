  /* main执行区 START */


  // 渲染首页用户信息
  renderIndexUserMod();
  // 控制页面元素状态
  controlElements();
  // 右侧固定导航状态计算
  siderPosition();
  // 淘宝轮播图
  tbSwiperFn();
  // 天猫轮播图
  tmSwiperFn();
  // 搜索tab栏切换
  searchTabsSwitch();
  // 渲染侧边栏导航
  renderAsideNav();

  // 渲染快捷功能精灵图
  rederConveSprite();
  // 公告栏切换
  noticeSwitch();
  // 便捷功能二级菜单模块
  conveSubCard();
  // 关闭二维码
  closeQRcode();
  // 渲染猜你喜欢
  renderLike();
  // 主页搜索功能
  goodsSearch();



  /* main执行区 END */



  /* ------------------------------------------------ */


  /* 各功能模块区 START */

  //  主页搜索功能
  function goodsSearch() {
      var searchInput = document.querySelector(".search-input");
      searchInput.oninput = function() {
          if ($(this).val().trim()) {
              $(this).prev().hide();
              $(this).prev().prev().hide();
          } else {
              $(this).prev().show();
              $(this).prev().prev().show();
          }
      }
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


  // 控制页面元素状态
  function controlElements() {
      //获取底部背景块
      var sideBottomBlock1 = document.querySelector('.side-bottom-block-bg1');
      var sideBottomBlock2 = document.querySelector('.side-bottom-block-bg2');

      var content = document.getElementById('content');
      //获取网页宽度
      var htmlWidth = document.documentElement.offsetWidth;
      //获取版心宽度
      var mainWidth = document.getElementById('main').offsetWidth;
      //获取body
      var body = document.body;
      var main = document.getElementById('main');
      //获取背景块
      var sideTopBlock = document.querySelectorAll('.side-block-bg');
      // 获取右边固定导航栏
      var sideBarFixed = document.getElementById('fixedSiderBar');
      window.onresize = function() {
          //计算底部背景块left
          sideBottomBlock1.style.left = (content.offsetLeft - sideBottomBlock1.offsetWidth) + 'px';
          sideBottomBlock2.style.right = (content.offsetLeft - sideBottomBlock2.offsetWidth) + 'px';

          //计算右边固定导航栏位置
          sideBarFixed.style.left = (main.offsetLeft + main.offsetWidth + 10) + 'px';
          //控制背景块显示
          htmlWidth = document.documentElement.offsetWidth;
          if (htmlWidth >= mainWidth) {
              body.style.overflowX = 'hidden';
              sideTopBlock[0].style.display = 'block';
              sideTopBlock[1].style.display = 'block';
          } else {
              body.style.overflowX = 'auto';
              sideTopBlock[0].style.display = 'none';
              sideTopBlock[1].style.display = 'none';
          }


      }
      window.onload = function() {
          //计算底部背景块left
          sideBottomBlock1.style.left = (content.offsetLeft - sideBottomBlock1.offsetWidth) + 'px';
          sideBottomBlock2.style.right = (content.offsetLeft - sideBottomBlock2.offsetWidth) + 'px';

          //计算右边固定导航栏位置
          sideBarFixed.style.left = (main.offsetLeft + main.offsetWidth + 10) + 'px';

          //控制背景块显示
          htmlWidth = document.documentElement.offsetWidth;
          if (htmlWidth >= mainWidth) {
              body.style.overflowX = 'hidden';
              sideTopBlock[0].style.display = 'block';
              sideTopBlock[1].style.display = 'block';
          } else {
              body.style.overflowX = 'auto';
              sideTopBlock[0].style.display = 'none';
              sideTopBlock[1].style.display = 'none';
          }
      }
  }


  // 公告栏切换
  function noticeSwitch() {
      var noticeTabs = document.getElementsByClassName('notice-tab');
      var noticeList = document.getElementsByClassName('notice-list');
      //绑定鼠标划过切换公告栏事件
      for (var i = 0; i < noticeTabs.length; i++) {
          //添加自定义序列
          noticeTabs[i].setAttribute("data-index", i);
          //添加定时器
          var noticeTabTimer = null;

          noticeTabs[i].onmouseenter = function() {
              //获取触发对象的索引序列
              var noticeIndex = this.getAttribute('data-index');
              //延迟显示
              noticeTabTimer = setTimeout(function() {
                  //重置类名
                  for (var j = 0; j < noticeTabs.length; j++) {
                      noticeTabs[j].className = 'notice-tab';
                      noticeList[j].className = 'notice-list clearfix';
                  }
                  //将触发对象设为激活时样式
                  noticeTabs[noticeIndex].className = 'notice-tab notice-tab-select';
                  //显示对应公告内容
                  noticeList[noticeIndex].className = 'notice-list notice-list-visible clearfix';
                  //清除定时器
                  clearTimeout(noticeTabTimer);
              }, 350);
          };
          //当鼠标离开时不再执行定时器内容
          noticeTabs[i].onmouseleave = function() {
              clearTimeout(noticeTabTimer);
          };
      }
  }


  // 固定导航状态计算
  function siderPosition() {
      //返回顶部
      var returnTop = document.querySelector('.returnTop');
      var siderBar = document.querySelector('.sider-bar');
      var main = document.getElementById('main');
      var content = document.getElementById('content');
      var siderBarItems = document.getElementsByClassName('sider-bar-item');
      //顶部固定搜索栏
      var topFixedSearch = document.getElementById('fixedSearch');
      //品质好货
      var discoverGoods = document.getElementById('discoverGoods');
      //好店直播
      var tbLive = document.getElementById('tbLive');
      //实惠热卖
      var hotSales = document.getElementById('hotSales');
      //猜你喜欢
      var guessLike = document.getElementById('guessLike');
      //导航状态控制阀
      var flag = true;
      window.addEventListener('scroll', function() {

          // 控制顶部固定搜索栏显示
          if (document.documentElement.scrollTop >= 300) {
              topFixedSearch.style.display = 'block';
          } else {
              topFixedSearch.style.display = 'none';
          }

          //计算右侧导航位置
          if (document.documentElement.scrollTop >= 470) {
              siderBar.style.position = 'fixed';
              siderBar.style.top = '70px';
              //计算右边固定导航栏位置
              siderBar.style.left = (main.offsetLeft + main.offsetWidth + 10) + 'px';
          } else {
              //计算右边固定导航栏位置
              siderBar.style.left = (main.offsetLeft + main.offsetWidth + 10) + 'px';
              siderBar.style.position = 'absolute';
              siderBar.style.top = '500px';

          }

          //返回顶部显示
          if (document.documentElement.scrollTop >= 750) {
              returnTop.style.display = 'block';
          } else {
              returnTop.style.display = 'none';
          }

          //右侧导航显示对应滚动到的区域
          if (flag) {
              if (document.documentElement.scrollTop < (tbLive.offsetTop + content.offsetTop)) {
                  for (var i = 0; i < siderBarItems.length; i++) {
                      siderBarItems[i].className = 'sider-bar-item';
                  }
                  siderBarItems[0].className = 'nav-activity sider-bar-item';
              } else if (document.documentElement.scrollTop >= (tbLive.offsetTop + content.offsetTop) && document.documentElement.scrollTop < hotSales.offsetTop + content.offsetTop) {
                  for (var i = 0; i < siderBarItems.length; i++) {
                      siderBarItems[i].className = 'sider-bar-item';
                  }
                  siderBarItems[1].className = 'nav-activity sider-bar-item';
              } else if (document.documentElement.scrollTop >= (hotSales.offsetTop + content.offsetTop) && document.documentElement.scrollTop < guessLike.offsetTop + content.offsetTop) {
                  for (var i = 0; i < siderBarItems.length; i++) {
                      siderBarItems[i].className = 'sider-bar-item';
                  }
                  siderBarItems[2].className = 'nav-activity sider-bar-item';
              } else if (document.documentElement.scrollTop >= (guessLike.offsetTop + content.offsetTop + 2)) {
                  for (var i = 0; i < siderBarItems.length; i++) {
                      siderBarItems[i].className = 'sider-bar-item';
                  }
                  siderBarItems[3].className = 'nav-activity sider-bar-item';
              }
          }

      });

      // 返回顶部功能
      returnTop.addEventListener('click', function() {
          animate2(window, 0);
      });

      // 添加点击导航按钮跳转到对应模块
      siderBarItems[0].onclick = function() {
          flag = false;
          for (var i = 0; i < siderBarItems.length; i++) {
              siderBarItems[i].className = 'sider-bar-item';
          }
          siderBarItems[0].className = 'nav-activity sider-bar-item';
          animate2(window, discoverGoods.offsetTop + content.offsetTop, function() {
              flag = true;
          });
      };
      siderBarItems[1].onclick = function() {
          flag = false;
          for (var i = 0; i < siderBarItems.length; i++) {
              siderBarItems[i].className = 'sider-bar-item';
          }
          siderBarItems[1].className = 'nav-activity sider-bar-item';
          animate2(window, tbLive.offsetTop + content.offsetTop + 2, function() {
              flag = true;
          });
      };
      siderBarItems[2].onclick = function() {
          flag = false;
          for (var i = 0; i < siderBarItems.length; i++) {
              siderBarItems[i].className = 'sider-bar-item';
          }
          siderBarItems[2].className = 'nav-activity sider-bar-item';
          animate2(window, hotSales.offsetTop + content.offsetTop + 2, function() {
              flag = true;
          });
      };
      siderBarItems[3].onclick = function() {
          flag = false;
          for (var i = 0; i < siderBarItems.length; i++) {
              siderBarItems[i].className = 'sider-bar-item';
          }
          siderBarItems[3].className = 'nav-activity sider-bar-item';
          animate2(window, guessLike.offsetTop + content.offsetTop + 2, function() {
              flag = true;
          });
      };

  }

  // 网页滚动动画
  function animate2(obj, target, callback) {
      clearInterval(obj.timer);
      obj.timer = setInterval(function() {

          var step = (target - window.pageYOffset) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);

          if (parseInt(window.pageYOffset) == target) {
              clearInterval(obj.timer);
              callback && callback();
          }
          window.scroll(0, window.pageYOffset + step);

      }, 15);
  }


  // 淘宝轮播图 
  function tbSwiperFn() {
      var tbBanner = document.getElementById('tbBanner');
      var tbSwiper = document.getElementById('tbSwiper');
      var tbSwiperItems = tbSwiper.children;
      var tbSwiperItemNum = tbSwiperItems.length;
      var tbSwiperFirstItem = tbSwiperItems[0].cloneNode(true);
      var tbSwiperLastItem = tbSwiperItems[tbSwiperItems.length - 1].cloneNode(true);
      var tbSwiperItemWidth = tbSwiperItems[0].offsetWidth;
      var tbSwiperTabs = document.getElementById('tbSwiperTabs');
      for (var i = 0; i < tbSwiperItems.length; i++) {
          var li = document.createElement('li');
          li.className = 'tb-banner-tab';
          tbSwiperTabs.appendChild(li);
      }
      var tbSwiperTabsItem = tbSwiperTabs.children;
      tbSwiper.appendChild(tbSwiperFirstItem);
      tbSwiper.insertBefore(tbSwiperLastItem, tbSwiperItems[0]);
      var tbSwiperItemsIndex = 0;
      tbSwiperTabsItem[tbSwiperItemsIndex].className = 'tb-banner-tab tab-activity';
      var tbSwiperTimer = setInterval(function() {
          tbSwiperBanner();
      }, 2000);
      tbSwiper.style.left = -tbSwiperItemWidth + 'px';

      function tbSwiperBanner() {
          if (tbSwiperItemsIndex == tbSwiperItemNum - 1) {
              tbSwiperTabsItem[tbSwiperItemsIndex].className = 'tb-banner-tab';
              tbSwiper.style.left = '0px';
              tbSwiperItemsIndex = 0;
              animate(tbSwiper, -tbSwiperItemWidth * (tbSwiperItemsIndex + 1));
              tbSwiperTabsItem[tbSwiperItemsIndex].className = 'tb-banner-tab tab-activity';
          } else {
              tbSwiperTabsItem[tbSwiperItemsIndex].className = 'tb-banner-tab';
              tbSwiperItemsIndex++;
              tbSwiperTabsItem[tbSwiperItemsIndex].className = 'tb-banner-tab tab-activity';
              animate(tbSwiper, -tbSwiperItemWidth * (tbSwiperItemsIndex + 1));
          }
      }
      //鼠标悬停暂停轮播
      tbBanner.onmouseover = function() {
          clearInterval(tbSwiperTimer);
      };
      tbBanner.onmouseout = function() {
          tbSwiperTimer = setInterval(function() {
              tbSwiperBanner();
          }, 2000);
      };
      //鼠标点击切换轮播
      var tbSwiperPreBtn = document.getElementById('tbSwiperPreBtn');
      var tbSwiperNextBtn = document.getElementById('tbSwiperNextBtn');
      //切换到上一张
      tbSwiperPreBtn.onclick = function() {
          if (tbSwiperItemsIndex == 0) {
              tbSwiperTabsItem[tbSwiperItemsIndex].className = 'tb-banner-tab';
              tbSwiperItemsIndex = tbSwiperItemNum - 1;
              tbSwiper.style.left = -tbSwiperItemWidth * (tbSwiperItemsIndex + 2) + 'px';
              tbSwiperTabsItem[tbSwiperItemsIndex].className = 'tb-banner-tab tab-activity';
              animate(tbSwiper, -tbSwiperItemWidth * (tbSwiperItemsIndex + 1));
          } else {
              tbSwiperTabsItem[tbSwiperItemsIndex].className = 'tb-banner-tab';
              tbSwiperItemsIndex--;
              tbSwiperTabsItem[tbSwiperItemsIndex].className = 'tb-banner-tab tab-activity';
              animate(tbSwiper, -tbSwiperItemWidth * (tbSwiperItemsIndex + 1));
          }
      };
      //切换到下一张
      tbSwiperNextBtn.onclick = function() {
          tbSwiperBanner();
      };
      //点击提示按钮进行切换
      for (var i = 0; i < tbSwiperTabsItem.length; i++) {
          tbSwiperTabsItem[i].setAttribute('data-index', i);
          tbSwiperTabsItem[i].onclick = function() {
              tbSwiperTabsItem[tbSwiperItemsIndex].className = 'tb-banner-tab';
              tbSwiperItemsIndex = parseInt(this.getAttribute('data-index'));
              tbSwiperTabsItem[tbSwiperItemsIndex].className = 'tb-banner-tab tab-activity';
              animate(tbSwiper, -tbSwiperItemWidth * (tbSwiperItemsIndex + 1));
          }
      }
  }


  // 天猫轮播图 
  function tmSwiperFn() {
      var tmBanner = document.getElementById('tmBanner');
      var tmSwiper = document.getElementById('tmSwiper');
      var tmSwiperItems = tmSwiper.children;
      var tmSwiperItemNum = tmSwiperItems.length;
      var tmSwiperFirstItem = tmSwiperItems[0].cloneNode(true);
      var tmSwiperLastItem = tmSwiperItems[tmSwiperItems.length - 1].cloneNode(true);
      var tmSwiperItemWidth = tmSwiperItems[0].offsetWidth;
      var tmSwiperTabs = document.getElementById('tmSwiperTabs');
      var tmSwiperProgressNum = document.getElementById('tmSwiperProgressNum');
      var tmSwiperTabsItem = tmSwiperTabs.children;
      tmSwiper.appendChild(tmSwiperFirstItem);
      tmSwiper.insertBefore(tmSwiperLastItem, tmSwiperItems[0]);
      var tmSwiperItemsIndex = 0;
      tmSwiperTabsItem[tmSwiperItemsIndex].className = 'tm-banner-progress-item progress-activity';
      tmSwiperProgressNum.innerText = tmSwiperItemsIndex + 1;
      var tmSwiperTimer = setInterval(function() {
          tmSwiperBanner();
      }, 3000);
      tmSwiper.style.left = -tmSwiperItemWidth + 'px';

      function tmSwiperBanner() {
          if (tmSwiperItemsIndex == tmSwiperItemNum - 1) {
              tmSwiperTabsItem[tmSwiperItemsIndex].className = 'tm-banner-progress-item';
              tmSwiper.style.left = '0px';
              tmSwiperItemsIndex = 0;
              tmSwiperProgressNum.innerText = tmSwiperItemsIndex + 1;
              animate(tmSwiper, -tmSwiperItemWidth * (tmSwiperItemsIndex + 1));
              tmSwiperTabsItem[tmSwiperItemsIndex].className = 'tm-banner-progress-item progress-activity';
          } else {
              tmSwiperTabsItem[tmSwiperItemsIndex].className = 'tm-banner-progress-item';
              tmSwiperItemsIndex++;
              tmSwiperProgressNum.innerText = tmSwiperItemsIndex + 1;
              tmSwiperTabsItem[tmSwiperItemsIndex].className = 'tm-banner-progress-item progress-activity';
              animate(tmSwiper, -tmSwiperItemWidth * (tmSwiperItemsIndex + 1));
          }
      }
      //鼠标悬停暂停轮播
      tmBanner.onmouseover = function() {
          clearInterval(tmSwiperTimer);
      };
      tmBanner.onmouseout = function() {
          tmSwiperTimer = setInterval(function() {
              tmSwiperBanner();
          }, 3000);
      };
      //鼠标点击切换轮播
      var tmSwiperPreBtn = document.getElementById('tmSwiperPreBtn');
      var tmSwiperNextBtn = document.getElementById('tmSwiperNextBtn');
      //切换到上一张
      tmSwiperPreBtn.onclick = function() {
          if (tmSwiperItemsIndex == 0) {
              tmSwiperTabsItem[tmSwiperItemsIndex].className = 'tm-banner-progress-item';
              tmSwiperItemsIndex = tmSwiperItemNum - 1;
              tmSwiperProgressNum.innerText = tmSwiperItemsIndex + 1;
              tmSwiper.style.left = -tmSwiperItemWidth * (tmSwiperItemsIndex + 2) + 'px';
              tmSwiperTabsItem[tmSwiperItemsIndex].className = 'tm-banner-progress-item progress-activity';
              animate(tmSwiper, -tmSwiperItemWidth * (tmSwiperItemsIndex + 1));
          } else {
              tmSwiperTabsItem[tmSwiperItemsIndex].className = 'tm-banner-progress-item';
              tmSwiperItemsIndex--;
              tmSwiperProgressNum.innerText = tmSwiperItemsIndex + 1;
              tmSwiperTabsItem[tmSwiperItemsIndex].className = 'tm-banner-progress-item progress-activity';
              animate(tmSwiper, -tmSwiperItemWidth * (tmSwiperItemsIndex + 1));
          }
      };
      //切换到下一张
      tmSwiperNextBtn.onclick = function() {
          tmSwiperBanner();
      };
      //点击按钮进行切换
      for (var i = 0; i < tmSwiperTabsItem.length; i++) {
          tmSwiperTabsItem[i].setAttribute('data-index', i);
          tmSwiperTabsItem[i].onclick = function() {
              tmSwiperTabsItem[tmSwiperItemsIndex].className = 'tm-banner-progress-item';
              tmSwiperItemsIndex = parseInt(this.getAttribute('data-index'));
              tmSwiperProgressNum.innerText = tmSwiperItemsIndex + 1;
              tmSwiperTabsItem[tmSwiperItemsIndex].className = 'tm-banner-progress-item progress-activity';
              animate(tmSwiper, -tmSwiperItemWidth * (tmSwiperItemsIndex + 1));
          }
      }
  }


  // 缓冲动画函数
  function animate(obj, target, callback) {
      clearInterval(obj.timer);
      obj.timer = setInterval(function() {
          var step = (target - obj.offsetLeft) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);

          if (obj.offsetLeft == target) {
              clearInterval(obj.timer);

              if (callback) {
                  callback();
              }
          }

          obj.style.left = obj.offsetLeft + step + 'px';
      }, 10);
  }



  // 搜索tab栏切换
  function searchTabsSwitch() {
      var searchTabs = document.getElementById('searchTabsList').children;
      for (var i = 0; i < searchTabs.length; i++) {
          searchTabs[i].onclick = function() {
              for (var j = 0; j < searchTabs.length; j++) {
                  searchTabs[j].className = '';
              }
              this.className = 'search-tab-select';
          };
      }
  }

  // 渲染便捷功能的精灵图
  function rederConveSprite() {
      var conveItemIcons = document.getElementsByClassName('conve-item-icon');
      for (var i = 0; i < conveItemIcons.length; i++) {
          conveItemIcons[i].style.backgroundPosition = '0px ' + -i * 44 + 'px';
      }
  }

  // 点击关闭二维码
  function closeQRcode() {
      var closeQRCodeBox = document.getElementById('closeQRCodeBox');
      var qrcodeBox = document.getElementsByClassName('qrcode-box');
      //给关闭按钮绑定点击事件
      closeQRCodeBox.onclick = function() {
          qrcodeBox[0].style.display = 'none';
      };

  }

  // 渲染侧边栏导航
  function renderAsideNav() {
      layui.use('laytpl', function() {
          var laytpl = layui.laytpl;
          var firstData = [{
                  id: 1,
                  data: ['女装', '内衣', '家具']
              },
              {
                  id: 2,
                  data: ['女鞋', '男鞋', '箱包']
              },
              {
                  id: 3,
                  data: ['母婴', '童装', '玩具']
              },
              {
                  id: 4,
                  data: ['男装', '运动户外']
              },
              {
                  id: 5,
                  data: ['美妆', '彩妆', '个护']
              },
              {
                  id: 6,
                  data: ['手机', '数码', '企业']
              },
              {
                  id: 7,
                  data: ['大家电', '生活电器']
              },
              {
                  id: 8,
                  data: ['零食', '生鲜', '茶酒']
              },
              {
                  id: 9,
                  data: ['厨具', '收纳', '清洁']
              },
              {
                  id: 10,
                  data: ['家纺', '家饰', '鲜花']
              },
              {
                  id: 11,
                  data: ['图书音像', '文具']
              },
              {
                  id: 12,
                  data: ['医药保健', '进口']
              },
              {
                  id: 13,
                  data: ['汽车', '二手车', '用品']
              },
              {
                  id: 14,
                  data: ['房产', '装修家具', '建材']
              },
              {
                  id: 15,
                  data: ['手表', '眼镜', '珠宝饰品']
              }
          ];

          var getTpl = asideNavTpl.innerHTML;
          var view = document.getElementById('asideNavView');
          laytpl(getTpl).render(firstData, function(html) {
              view.innerHTML = html;
          });

          // 触发侧边导航栏二级菜单
          asideNavSubMenu();

      });


  }

  // 侧边栏二级菜单显示
  function asideNavSubMenu() {
      var asideNavList = document.getElementById('asideNavList');
      var asideNavItems = document.getElementById('asideNavList').children;
      var asideFloatPannelList = document.getElementById('asideFloatPannelList');
      var asideFloatPannels = document.getElementById('asideFloatPannelList').children;

      asideNavList.onmouseover = function() {
          asideFloatPannelList.style.display = 'block';
      };

      asideNavList.onmouseout = function() {
          asideFloatPannelList.style.display = 'none';
      };
      //添加自定义序列
      for (var i = 0; i < asideNavItems.length; i++) {
          asideNavItems[i].setAttribute('data-index', i);
          asideFloatPannels[i].setAttribute('data-index', i);
          //绑定鼠标滑过显示二级菜单事件
          asideNavItems[i].onmouseover = function() {
              asideFloatPannels[this.getAttribute('data-index')].style.display = 'block';
              asideNavItems[this.getAttribute('data-index')].style.backgroundColor = '#ffe4dc';
          };
          asideFloatPannels[i].onmouseover = function() {
              asideFloatPannelList.style.display = 'block';
              asideFloatPannels[this.getAttribute('data-index')].style.display = 'block';
              asideNavItems[this.getAttribute('data-index')].style.backgroundColor = '#ffe4dc';
          };
          asideNavItems[i].onmouseout = function() {

              asideFloatPannels[this.getAttribute('data-index')].style.display = 'none';
              asideNavItems[this.getAttribute('data-index')].style.backgroundColor = 'transparent';
          };
          asideFloatPannels[i].onmouseout = function() {
              asideFloatPannelList.style.display = 'none';
              asideFloatPannels[this.getAttribute('data-index')].style.display = 'none';
              asideNavItems[this.getAttribute('data-index')].style.backgroundColor = 'transparent';
          };
      }
  }


  // 便捷功能二级菜单模块
  function conveSubCard() {
      //鼠标滑动显示对应的二级菜单
      var conveFloatItems = document.querySelector('.conve-list').querySelectorAll('.conve-float');
      var conveSubCards = document.querySelector('.conve-sub-card-list').querySelectorAll('.conve-sub-card');
      for (var i = 0; i < conveFloatItems.length; i++) {
          conveFloatItems[i].setAttribute('data-index', i);
          conveSubCards[i].setAttribute('data-index', i);
          conveFloatItems[i].onmouseenter = function() {
              for (var j = 0; j < conveFloatItems.length; j++) {
                  conveSubCards[j].style.display = 'none';
                  conveFloatItems[j].style.border = '1px solid #f4f4f4';
                  conveFloatItems[j].style.borderTopColor = 'transparent';
                  conveFloatItems[j].style.borderLeftColor = 'transparent';
                  conveFloatItems[j].style.zIndex = '1';
              }
              this.style.border = '1px solid #FF4400';
              this.style.borderBottom = 'none';
              this.style.zIndex = '11';
              conveSubCards[this.getAttribute('data-index')].style.display = 'block';
          }
      }

      //关闭二级菜单
      var closeSubCard = document.querySelector('.conve-sub-card-list').querySelectorAll('.close-conve-card');
      for (var k = 0; k < closeSubCard.length; k++) {
          closeSubCard[k].setAttribute('data-index', k);
          closeSubCard[k].onclick = function() {
              conveSubCards[this.getAttribute('data-index')].style.display = 'none';
              conveFloatItems[this.getAttribute('data-index')].style.border = '1px solid #f4f4f4';
              conveFloatItems[this.getAttribute('data-index')].style.borderTopColor = 'transparent';
              conveFloatItems[this.getAttribute('data-index')].style.borderLeftColor = 'transparent';
              conveFloatItems[this.getAttribute('data-index')].style.zIndex = '1';
          }
      }

      // 旅程切换
      var travelType1 = document.getElementById('travelType1');
      var travelType2 = document.getElementById('travelType2');
      var endTravelDate = document.querySelector('.end-travel-date');
      var conveTripGo = document.querySelector('.conve-trip-go');
      travelType1.onclick = function() {
          conveTripGo.style.backgroundPosition = '0 2px';
          endTravelDate.style.display = 'none';
      };
      travelType2.onclick = function() {
          conveTripGo.style.backgroundPosition = '0 -71px';
          endTravelDate.style.display = 'block';
      };
  }

  //渲染用户信息
  function renderIndexUserMod() {
      //判断是否存在token
      layui.use('layer', function() {
          var layer = layui.layer;
          if (localStorage.getItem('token')) {
              $.ajax({
                  url: '/user/userInfo',
                  method: 'GET',
                  success: function(res) {
                      //渲染首页用户区信息
                      $('.user-module .welcome-text').text('Hi！' + res.data.username);
                      //渲染默认头像
                      $(".user-module .user-avatar a").html(res.data.username.charAt(0)).css("background-color", "#FF8300");
                      $(".user-module .logout").hide();
                      $(".user-module .login").show();
                      return;
                  },
                  error: function() {
                      //渲染首页用户区信息
                      $('.user-module .welcome-text').text('Hi！你好');
                      //渲染默认头像
                      $(".user-module .user-avatar a").html('<img src="images/user-default-avatar.jpg" alt="">');
                      $(".user-module .login").hide();
                      $(".user-module .logout").show();
                      return;
                  }
              });
          } else {
              //渲染首页用户区信息
              $('.user-module .welcome-text').text('Hi！你好');
              //渲染默认头像
              $(".user-module .user-avatar a").html('<img src="images/user-default-avatar.jpg" alt="">');
              $(".user-module .login").hide();
              $(".user-module .logout").show();
              return;
          }
      });


  }

  //渲染热卖单品、猜你喜欢
  function renderLike() {
      layui.use('layer', function() {
          var goodsData = [];
          $.ajax({
              url: '/api/goodslist',
              method: 'GET',
              success: function(res) {
                  goodsData = res.data;
                  var arr2 = [];
                  var hotGoods = [];
                  var hotStr = '';
                  for (var i = 0; i < 10; i++) {
                      var random = getRandom(0, goodsData.length - 1);
                      while (arr2.indexOf(random) !== -1) {
                          random = getRandom(0, goodsData.length - 1);
                      }
                      arr2.push(random);
                      hotStr = '<li class="clearfix"><div class="img-wrap"><a href="item.html?id=' + goodsData[random].id + '"><img src="' + goodsData[random].goods_img + '" alt=""></a></div><div class="line1"><a href="item.html?id=' + goodsData[random].id + '" class="item-title"><img src="images/baoyou.png" alt="">' + goodsData[random].goods_title + '</a></div><div class="line2"><a href="item.html?id=' + goodsData[random].id + '" class="comment">评价 <span>' + goodsData[random].cmt_num + '</span></a><a href="item.html?id=' + goodsData[random].id + '" class="collect">收藏<span>' + parseInt(goodsData[random].cmt_num) * getRandom(3, 15) + '</span></a></div><div class="line3"><a href="item.html?id=' + goodsData[random].id + '" class="price-now"><em>¥</em><span>' + goodsData[random].goods_price + '</span></a><a href="item.html?id=' + goodsData[random].id + '" class="price-pre"><em>¥</em><span>' + goodsData[random].goods_price * 2 + '</span></a><a href="item.html?id=' + goodsData[random].id + '" class="sell-num"><em>月销</em><span>' + goodsData[random].goods_sales + '</span><em>笔</em></a></div></li>';
                      hotGoods.push(hotStr);
                  }
                  $(".hot-product-list ul").html(hotGoods.join(''));

                  var arr1 = [];
                  var likeGoods = [];
                  var likeStr = '';

                  for (var i = 0; i < 80; i++) {
                      var random = getRandom(0, goodsData.length - 1);
                      while (arr1.indexOf(random) !== -1) {
                          random = getRandom(0, goodsData.length - 1);
                      }
                      arr1.push(random);
                      likeStr = '<li><a href="./item.html?id=' + goodsData[random].id + '" class="good-info-wrap"><div class="good-img-wrap"><img src="' + goodsData[random].goods_img + '" alt=""></div><div class="good-info"><h4><img src="images/double12-icon.png" alt="">' + goodsData[random].goods_title + '</h4></div></a><p class="ft-info clearfix"><span class="price"><em class="price-symbol">¥</em>' + goodsData[random].goods_price + '</span><span class="sales">销量:<em class="sale-num">' + goodsData[random].goods_sales + '</em></span></p><div class="mask"><a href="./goodslist.html"><p class="find-similar"><i class="iconfont icon-aixin_shixin"></i>找相似</p><p class="fint-more-similar">发现更多相似的宝贝<i class="iconfont icon-jiantou"></i></p></a></div></li>';
                      likeGoods.push(likeStr);
                  }
                  $(".guess-like-goods-list ul").html(likeGoods.join(''));
              }
          });
      });
  }

  //获取指定范围的随机整数函数
  function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 解决IE9以下getElementsByClassName兼容性问题
  function getElementsByClassName(node, className) {
      if (node.getElementsByClassName) {
          // 使用现有方法
          return node.getElementsByClassName(className);
      } else {
          // 循环遍历所有标签，返回带有相应类名的元素
          var results = [],
              elems = node.getElementsByTagName("*");
          for (var i = 0, len = elems.length; i < len; i++) {
              if (elems[i].className.indexOf(className) != -1) {
                  results[results.length] = elems[i];
              }
          }
          return results;
      }
  }


  /* 各功能模块区 END */