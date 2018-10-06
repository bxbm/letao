/**
 * Created by hustg on 2018/8/19.
 */
$(".mui-icon-eye").on("tap",function () {
    var lt_input=$(this).toggleClass("mui-active").parent().find("input");
    lt_input.attr("type")=="password"?lt_input.attr("type","text"):lt_input.attr("type","password");
});

var returnUrl=location.search;
var reg=new RegExp(/\?returnUrl=/);

$(".btn_login").on("tap",function () {
    var username=window.lt_form.name.value;
    var password=window.lt_form.pass.value;
    $.ajax({
        url:"/user/login",
        type:"post",
        data:{
            username:username,
            password:password
    },
        success:function (res) {
           // console.log(res) ;
            if(res.error){
                mui.toast(res.message);
            }else if(res.success){
                if(reg.test(returnUrl)){
                   location.href=returnUrl.substr(11);
                }else{
                    location.href="index.html";
                }
            }
        },
        error:function () {
            mui.toast("服务器繁忙");
        }
    })
});
