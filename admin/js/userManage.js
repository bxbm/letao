/**
 * Created by hustg on 2018/8/22.
 */
$(function () {
    template.helper("getJquery",function () {
        return jQuery;
    });
    var currPage=1;
    // 定义初始化用户数据函数
    var init_data=function (page) {
        currPage=page;
        $.ajax({
            url:"/user/queryUser",
            type:"get",
            data:{
                page:page,
                pageSize:10
            },
            success:function (res) {
                // console.log(res);
                var html=template("users",res);
                $(".ad_content tbody").html(html);
                init_pagenation("#paginator",res.page,Math.ceil(res.total/res.size),init_data);
            },
            error:function () {
                alert("服务器忙");
            }
        });
    };
    init_data(1);
    // 更改用户状态按钮
    $("tbody").on("click","a.btn",function () {
        var $this=$(this);
        var isDelete=$this.hasClass("btn-danger")?0:1;
        var id=$this.data("id");
        $.ajax({
            url:"/user/updateUser",
            type:"post",
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function (res) {
                if(res.success){
                    init_data(currPage);
                }else{
                    console.log(res);
                }
            }
        })
    })

});