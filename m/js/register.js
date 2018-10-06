/**
 * Created by hustg on 2018/8/20.
 */
var getCode=true;
$(".btn_getCode").on("tap",function () {
    var that=this;
    if(getCode){
        $(that).addClass("btn-gray").html("加载中...");
        $loginAjax({
            url:"/user/vCode",
            type:"get",
            success:function (res) {
                console.log(res);
                vCode=res.vCode;
                var num=60;
                var time=setInterval(function () {
                    if(num>0){
                        $(that).html(num+"秒后再获取");
                        num--;
                    }else{
                        clearInterval(time);
                        num=6;
                        getCode=true;
                        $(that).html("获取认证码").removeClass("btn-gray");
                    }
                },1000);
                getCode=false;
            }
        });
    }
});

$(".btn_register").on("tap",function () {
    var username=$("[name=username]").val();
    var password=$("[name=pass]").val();
    var mobile=$("[name=mobile]").val();
    var vCode=$("[name=code]").val();
    var repass=$("[name=rePass]").val();
    if(!username){
        mui.toast("请输入用户名");
        return;
    }
    if(!mobile){
        mui.toast("请输入手机号");
        return;
    }else if(!/^\d{11}$/.test(mobile)){
        mui.toast("请输入合法手机号");
        return;
    }
    if(!password){
        mui.toast("请输入密码");
        return;
    }
    if(repass!=password){
        mui.toast("确认密码不一致");
        return;
    }
    $loginAjax({
        url:"/user/register",
        type:"post",
        data:{
            username:username,
            password:password,
            mobile:mobile,
            vCode:vCode,
            repass:repass
        },
        success:function () {
            mui.confirm( "是否前往登录", "注册成功", ["是","否"], function (e) {
                if(e.index==0){
                    location.href="login.html";
                }else{

                }
            })
        }
    })

});