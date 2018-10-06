/**
 * Created by hustg on 2018/8/17.
 */
var getUrlData=function () {
    var keyData={};
    var urlData=location.href.split("?")[1];
    if(!urlData){
        return keyData;
    }
    var data=urlData.split("&");
    for(var i=0;i<data.length;i++){
       var values= data[i].split("=");
        keyData[values[0]]=values[1];
    }
    return keyData;
};
// console.log(getUrlData());
// 定义通过Ajax获取搜寻结果函数
var getResult=function(data,callbackss){
    $.ajax({
        url:"/product/queryProduct",
        type:"get",
        data:data,
        success:function (res) {
            // console.log(res);
            var html=template("ct_ser_result",res);
            // console.log(html);
            $(".lt_search_result .ct_live").html(html);
            callbackss&&callbackss();
        }
    });
};
// 定义给搜索的data追加分类排序信息
var dataAdd=function (data) {
    var dir=1;
    var $this=$(".lt_search_cat li.now");
    $this.find("span").hasClass("fa-angle-down")?dir=2:dir=1;
    if($this.data("attr")){
        data[$this.data("attr")]=dir;
    }
};

var LT=function () {
    this.data={
        page:3,
        pageSize:4,
        proName:$("form input").val().trim()||null
    };
    LT.prototype.getResult=function (data,callback) {
        $.ajax({
            url:"/product/queryProduct",
            type:"get",
            data:data,
            success:function (res) {
                console.log(res);
                var html=template("ct_ser_result",res);
                // console.log(html);
                $(".lt_search_result .ct_live").html(html);
                callback&&callback();
            },
            error:function(){
                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
            }
        });
    };
    LT.prototype.addResult=function (data,callback) {
        $.ajax({
            url:"/product/queryProduct",
            type:"get",
            data:data,
            success:function (res) {
                console.log(res);
                var html=template("ct_ser_result",res);
                // console.log(html);
                // console.log("hahahaha");
                if(!html){
                    callback&&callback(true);
                }else{
                    html&&$(".lt_search_result .ct_live").append(html);
                    callback&&callback(false);
                }

            },
            error:function(){
                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
            }
        });
    };
    LT.prototype.dataAdd=function (data) {
        var dir=1;
        var $this=$(".lt_search_cat li.now");
        $this.find("span").hasClass("fa-angle-down")?dir=2:dir=1;
        if($this.data("attr")){
            data[$this.data("attr")]=dir;
        }
        return data;
    };
    LT.prototype.getUrlData=function () {
        var keyData={};
        var urlData=location.href.split("?")[1];
        if(!urlData){
            return keyData;
        }
        var data=urlData.split("&");
        for(var i=0;i<data.length;i++){
            var values= data[i].split("=");
            keyData[values[0]]=values[1];
        }
        return keyData;
    };
};

var getProductDetail=function(data,callbackss){
    $.ajax({
        url:"/product/queryProductDetail",
        type:"get",
        data:data,
        success:function (res) {
            // console.log(res);
            var html=template("lt_product",res);
            // console.log(html);
            $(".container .mui-scroll").html(html);
            callbackss&&callbackss();
        },
        error:function () {
            mui.toast("系统繁忙");  
        }
    });
};

var $loginAjax=function (parameter) {
    $.ajax({
        url:parameter.url,
        type:parameter.type||"",
        data:parameter.data||"",
        datatype:parameter.dataType||"",
        success:function (res) {
            if(res.error==400){
                location.href="/m/user/login.html?returnUrl="+location.href;
            }else if(res.error){
                // console.log(res);
                mui.toast(res.message);
            }else{
                parameter.success&&parameter.success(res);
            }
        },
        error:function(){
            mui.toast("服务器繁忙");
        }

    });
};
