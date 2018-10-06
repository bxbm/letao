/**
 * Created by hustg on 2018/8/20.
 */
var vCode=0;
var getCode=true;
$(".btn_getCode").on("tap",function () {
    var that=this;
    if(getCode){
        $(that).addClass("btn-gray").html("加载中...");
        $loginAjax({
            url:"/user/vCodeForUpdatePassword",
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
                        $(that).html("获取验证码").removeClass("btn-gray");
                    }
                },1000);
                getCode=false;
            }
        });
    }
});

$(".btn_confirm").on("tap",function () {
    // var a=$('form').serializeArray();
    // console.log(a);
            var old_pass=window.lt_form.old_pass.value;
            var new_pass=window.lt_form.new_pass.value;
            console.log(new_pass);
            var confirm_pass=window.lt_form.confirm_pass.value;
            console.log(confirm_pass);
            var code=window.lt_form.code.value;
    if(!old_pass){
        mui.toast("请输入原始密码");
        return;
    }
    if(!new_pass){
        mui.toast("新密码不能为空");
        return;
    }
    if(!confirm_pass){
        mui.toast("请确认密码");
        return;}
        else if(confirm_pass!=new_pass){
            mui.toast("两次输入密码不一致");
            return;
        }
    console.log(code);
    console.log(vCode);
    if(!code){
        mui.toast("请输入验证码");
        return;
    }
    $loginAjax({
        url:"/user/updatePassword",
        type:"post",
        data:{
            oldPassword:old_pass,
            newPassword:new_pass,
            vCode:code
        },
        success:function (res) {
            console.log(res);
            location.href="/m/user/login.html";
        }
    })

});