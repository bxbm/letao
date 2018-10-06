/**
 * Created by hustg on 2018/8/20.
 */

// 初始化个人中心
$loginAjax({
    url:"/user/queryUserMessage",
    type:"get",
    datatype:"json",
    success:function (res) {
        console.log(res);
        var html=template("user",res);
        setTimeout(function () {
            $(".mui-media").html(html);
        },Math.random()*1000);

    }
});

// 为退出登录按钮注册事件
$(".btn_outLogin").on("tap",function () {
    $loginAjax({
        url:"/user/logout",
        type:"get",
        success:function () {
            location.href="/m/user/login.html";
        }
    })
});

