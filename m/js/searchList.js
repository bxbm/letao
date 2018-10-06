/**
 * Created by hustg on 2018/8/16.
 */
$(function(){
    var ltSearch=new LT();
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators:false
    });
    // 下拉刷新
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50,//可选,默认50.触发下拉刷新拖动距离,
                // auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    // this.endPulldownToRefresh();
                    var that = this;
                    ltSearch.dataAdd(ltSearch.data);
                    console.log(ltSearch.data);
                    ltSearch.data.page = 1;
                    ltSearch.getResult(ltSearch.data, function () {
                        setTimeout(function () {
                            that.endPulldownToRefresh();
                            that.refresh(true);
                            mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
                        }, 1000 * Math.random());
                    });
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function () {
                    var that = this;
                    ltSearch.data.page++;
                    ltSearch.addResult(ltSearch.data, function (nomore) {
                        setTimeout(function () {
                            that.endPullupToRefresh(nomore);
                        }, 1000 * Math.random());
                    });
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
    // 初始化搜索结果;
    var keyVal=ltSearch.getUrlData().key;
    $("input").val(keyVal);
    ltSearch.data.proName=keyVal;
    mui('#refreshContainer').pullRefresh().pulldownLoading();


    // 搜索按钮添加事件
    $("form a").on("tap",function () {
        var input_val=$("form input").val().trim();
        if(!input_val){
            mui.toast("请输入搜索信息");
            return;
        }
        ltSearch.data.proName=input_val;
        var url=location.href.split("?")[0];
        console.log(url);
        history.replaceState(null, null, url+"?key="+input_val);
        mui('#refreshContainer').pullRefresh().pulldownLoading();

    });
    // 排序栏添加点击事件
    $(".lt_search_cat").on("tap","li",function () {
        var $this=$(this);
        if($this.hasClass("now")){
            $this.find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        }else{
            $this.addClass("now").siblings().removeClass("now").find("span")
                .removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        mui('#refreshContainer').pullRefresh().pulldownLoading();
    });
    // 添加点击立刻购买事件
    $(".ct_live").on("tap","button",function () {
        var id=$(this).data("id");
        location.href="/m/product.html?id="+id;
    })


});