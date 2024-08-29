//API统一根路径
$.ajaxPrefilter(function(option) {
    //统一API地址前缀
    option.url = 'http://127.0.0.1' + option.url;

    //对有权限的接口自动携带token
    if (option.url.indexOf('/user/') !== -1 || option.url.indexOf('/shop/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token')
        };
    }

    //访问权限控制
    option.complete = function(res) {
        if (res.responseJSON.status === 401 && res.responseJSON.message === "身份认证失败") {
            //移除本地token
            localStorage.removeItem('token');
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.msg('身份已过期，请重新登录！');
            });
        }
    }
})