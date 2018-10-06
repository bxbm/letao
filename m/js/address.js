/**
 * Created by hustg on 2018/8/20.
 */
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false
});
// 定义初始化函数
function init_address() {
    $loginAjax({
        url:"/address/queryAddress",
        type:"get",
        success:function (res) {
            console.log(res);
            var html=template("address",{data:res});
            $("ul.mui-table-view").html(html);
        }
    });
}
init_address();

// 删除收货地址
$(".mui-table-view").on("tap",".mui-btn-red",function () {
    var id=$(this).data("id");
    // console.log(id);
    mui.confirm( "确认删除该地址？", "温馨提示", ["是","否"], function (e) {
        if(e.index==0){
            $loginAjax({
                url:"/address/deleteAddress",
                type:"post",
                data:{id:id},
                success:function () {
                    init_address();
                }
            });
        }else{
        }
    })
});
