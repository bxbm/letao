/**
 * Created by hustg on 2018/8/18.
 */
$(function () {
    var id=getUrlData().id;
    getProductDetail({id:id},function () {
        var $num=$(".p_num .lt_nums");
        var max_num=Number($(".p_num .lt_maxnum").data("maxnum"));
        console.log(max_num);
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
        });
        // 为尺码选择注册点击事件
        $(".p_size span").on("tap",function () {
            $(this).toggleClass("selected").siblings().removeClass("selected");
        });
        // 为数量选择注册点击事件
        $(".p_num .lt_reduce").on("tap",function () {
            var num=Number($num.html());
            if(num>0){
                num--;
                $num.html(num);
            }else{
                mui.toast("数量不能低于0");
            }
        });
        $(".p_num .lt_add").on("tap",function () {
            var num=Number($num.html());
            if(num<max_num){
                num++;
                $num.html(num);
            }else{
                setTimeout(function () {
                    mui.toast("库存不足");
                },100);
            }
        });

    });
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators:false
    });

    // 加入购物车
    $(".lt_tabs .btn-cart").on("tap",function () {
        var size=$(".p_size span.selected").data("size");
        var num=Number($(".p_num .lt_nums").html());
        if(!size){
            mui.toast("请选择尺寸");
            return ;
        }
        if(num==0){
            mui.toast("请选择数量");
            return ;
        }
        $loginAjax({
            url:"/cart/addCart",
            type:"post",
            data:{
                productId:id,
                num:num ,
                size:size
            },
            datatype:"json",
            success:function (res) {
                 mui.confirm( "是否去购物车看看", "温馨提示", ["是","否"], function (e) {
                     if(e.index==0){
                         location.href="cart.html";
                     }else{

                     }
                 })
                }
        });
        
    });
    // 立即购买
    $(".lt_tabs .btn-pay").on("tap",function () {
        var size=$(".p_size span.selected").data("size");
        var num=Number($(".p_num .lt_nums").html());
        if(!size){
            mui.toast("请选择尺寸");
            return ;
        }
        if(num==0){
            mui.toast("请选择数量");
            return ;
        }
        mui.toast("暂未实现");
    });
});

