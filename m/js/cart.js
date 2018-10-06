/**
 * Created by hustg on 2018/8/19.
 */

mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators:false
});
var p_cart=[];
// 定义初始化购物车信息函数：
function cart_init(callback){
    $loginAjax({
        url:"/cart/queryCart",
        type:"get",
        data:{},
        datatype:"json",
        success:function (res) {
                p_cart=res;
                var html=template("lt_cart",{products:res});
                $("#OA_task_2").html(html);
                callback&&callback();
            }
    });
}
cart_init();

// 更改购物车函数
function edit_cart(data,callback) {
    $.ajax({
        url:"/cart/updateCart",
        type:"post",
        data:data,
        datatype:"json",
        success:function (res) {
            if(res.error==400){
                location.href="login.html?returnUrl="+location.href;
            }else if(res.error){
                mui.toast(res.message);
            }else if(res.success){
                callback&&callback();
            }
        },
        error:function () {
            mui.toast("服务器繁忙");
        }
    })
}
// 删除购物车函数
function delete_cart(data,callback) {
    $.ajax({
        url:"/cart/deleteCart",
        type:"get",
        data:data,
        datatype:"json",
        success:function (res) {
            if(res.error==400){
                location.href="login.html?returnUrl="+location.href;
            }else if(res.error){
                mui.toast(res.message);
            }else if(res.success){
                callback&&callback();
            }
        },
        error:function () {
            mui.toast("服务器繁忙");
        }
    })
}

// 注册下拉刷新事件
mui.init({
    pullRefresh : {
        container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down :{
            height:50,//可选,默认50.触发下拉刷新拖动距离,
            // auto: true,//可选,默认false.首次加载自动下拉刷新一次
            contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
            contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
            contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
            callback :function () {
                // this.endPulldownToRefresh();
                var that=this;
                cart_init(function () {
                        setTimeout(function () {
                        that.endPulldownToRefresh();
                        that.refresh(true);
                        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);
                    });
                },1000*Math.random());
            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        }
    }
});

// 为刷新按钮注册点击事件
$(".fa-refresh").on("tap",function () {
    mui('#refreshContainer').pullRefresh().pulldownLoading();
});

//为编辑按钮注册事件
$(".container").on("tap",".mui-icon-compose",function () {
    console.log("bianji");
    var cart_id=$(this).data("id");
    var productid=p_cart[cart_id].productId;
    console.log(productid);
    $loginAjax({
        url:"/product/queryProductDetail",
        type:"get",
        data:{id:productid},
        success:function (res) {
            res.cart_size=p_cart[cart_id].size;
            res.cart_num=p_cart[cart_id].num;
            console.log(res);
            var html=template("p_edit",res);
            html=html.replace(/\n/g,"");
            mui.confirm( html, "温馨提示", ["确认","取消"], function (e) {
                if(e.index==0){
                    edit_cart({
                        id:p_cart[cart_id].id,
                        size:$("span.selected").html(),
                        num:$("span.lt_nums").html()
                    },function () {
                        cart_init();
                    })
                }else{
                }
            })
        }
    });

});
// 为删除按钮注册事件
$(".container").on("tap",".mui-icon-trash",function () {
    console.log("删除");
    var cart_id=$(this).data("id");
    delete_cart({
        id:p_cart[cart_id].id
    },function () {
        cart_init();
    })
});

$("body").on("tap",".p_size span",function () {
    $(this).addClass("selected").siblings().removeClass("selected");
});

// 为数量选择注册点击事件
$("body").on("tap",".p_num .lt_reduce",function () {
    var $num=$(".lt_nums");
    var num=Number($num.html());
    if(num>1){
        num--;
        $num.html(num);
    }else{
        mui.toast("数量不能低于1");
    }
});
$("body").on("tap",".p_num .lt_add",function () {
    var $num=$(".lt_nums");
    var max_num=$(".lt_maxnum").data("maxnum");
    console.log(max_num);
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


// 为checkbox注册选择事件
$(".container").on("tap","input",function () {
    var total=0;
    setTimeout(function () {
        $("input:checked").each(function (i,item) {
            var price=$(this).data("price")*$(this).data("num");
            console.log(price);
            total+=Math.floor(price*100);
        });
        $("#cartAmount").html(total/100);
    },10);
});
$("#go_pay").on("tap",function () {
    mui.toast("暂未实现");
});