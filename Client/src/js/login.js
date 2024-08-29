//登录tab栏切换
(function() {
    var pwdLoginTab = document.querySelector('.pwd-login-tab');
    var smsLoginTab = document.querySelector('.sms-login-tab');
    var pwdLoginForm = document.querySelector('.login-pwd');
    var pwdPhoneForm = document.querySelector('.login-phone');

    pwdLoginTab.onclick = function() {
        pwdLoginForm.style.display = 'block';
        pwdPhoneForm.style.display = 'none';
        this.className = 'activity pwd-login-tab';
        smsLoginTab.className = 'sms-login-tab';
    };

    smsLoginTab.onclick = function() {
        pwdLoginForm.style.display = 'none';
        pwdPhoneForm.style.display = 'block';
        this.className = 'activity sms-login-tab';
        pwdLoginTab.className = 'pwd-login-tab';
    };
})();

//登录功能模块
(function() {
    //获取跳转前的url
    var preURL = location.search.substr(location.search.indexOf('=') + 1);

    //密码登录验证

    var pwdLoginBtn = document.querySelector('.login-pwd-submit');
    var loginError = document.querySelector('.login-error');
    var loginErrorTip = document.querySelector('.pwd-login-error');
    var loginUsername = document.querySelector('.login-username');
    var loginPassword = document.querySelector('.login-password');


    pwdLoginBtn.onclick = function(e) {
        var e = e || window.event;
        e.preventDefault ? e.preventDefault() : returnValue = false;

        //判断账号密码是否为空
        if (loginUsername.value.trim() == '') {
            loginError.style.display = 'block';
            loginErrorTip.innerText = '请输入账户名';
            return loginUsername.focus();
        }
        if (loginPassword.value.trim() == '') {
            loginError.style.display = 'block';
            loginErrorTip.innerText = '请输入密码';
            return loginPassword.focus();
        }
        loginError.style.display = 'none';

        //发起登录请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: {
                username: loginUsername.value,
                password: loginPassword.value
            },
            success: function(res) {
                if (res.status !== 1) {
                    loginError.style.display = 'block';
                    loginErrorTip.innerText = '登录名或登录密码不正确';
                    return;
                }
                layui.use('layer', function() {
                    var layer = layui.layer;
                    layer.msg('登陆成功！');
                    //保存token
                    localStorage.setItem('token', 'Bearer ' + res.token);
                    setTimeout(function() {
                        if (preURL) {
                            //跳转到登陆前的页面
                            return location.href = preURL;
                        } else {
                            //跳转到首页
                            return location.href = './index.html';
                        }


                    }, 1500);

                });
            },
            error: function() {
                layui.use('layer', function() {
                    var layer = layui.layer;
                    layer.msg('登陆失败，请检查网络设置！');
                });
            }
        });
    };

    //手机号登录验证
    var loginPhoneForm = document.querySelector('.login-phone');
    var loginError2 = loginPhoneForm.querySelector('.login-error');
    var loginErrorTip2 = loginPhoneForm.querySelector('.phone-login-error');
    var telNumber = loginPhoneForm.querySelector('.login-telnumber');
    var verifyCode = loginPhoneForm.querySelector('.login-verify-code');
    var phoneLoginBtn = loginPhoneForm.querySelector('.login-phone-submit');
    //验证手机号正则
    var telReg = /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/;


    phoneLoginBtn.onclick = function(e) {
        var e = e || window.event;
        e.preventDefault ? e.preventDefault() : returnValue = false;
        if (telNumber.value.trim() == '') {
            loginError2.style.display = 'block';
            loginErrorTip2.innerText = '请输入手机号';
            return telNumber.focus();
        }
        if (!telReg.test(telNumber.value.trim())) {
            loginError2.style.display = 'block';
            loginErrorTip2.innerText = '手机号码格式不正确，请重新输入';
            return telNumber.focus();
        }
        if (verifyCode.value.trim() == '') {
            loginError2.style.display = 'block';
            loginErrorTip2.innerText = '请输入验证码';
            return verifyCode.focus();
        }

        loginError.style.display = 'none';
        $.ajax({
            method: 'POST',
            url: 'http://127.0.0.1/api/loginphone',
            data: $('.login-phone form').serialize(),
            success: function(res) {

            }
        });

    };
})();