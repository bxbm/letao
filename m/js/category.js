/**
 * Created by hustg on 2018/8/15.
 */
$(function () {
    var render_firstCategory=function(){
        $.ajax({
            url:"/category/queryTopCategory",
            type:"get",
            success:function (res) {
                console.log(res);
                var nav_html=template('lt_first_category',res);
                // console.log(nav_html);
                $(".lt_nav").html(nav_html);
            }
        });
    };
    var render_secondCategory=function(id){
        $.ajax({
            url:"/category/querySecondCategory",
            type:"get",
            data:{id:id},
            success: function(res) {
                // console.log(res);
                var sec_html=template('lt_second_category',res);
                // console.log(sec_html);
                $(".lt_box .mui-scroll").html(sec_html);
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                    indicators:false
                });
            }
        })
    };

    render_firstCategory();
    render_secondCategory(1);
    $(".lt_nav").on("click","a",function(){
        if($(this).hasClass("lt_active")){
            console.log("has lt_active");
            return;
        }
        var this_id=$(this).data("id");
        // console.log(this_id);
        $(".lt_nav").children().removeClass("lt_active");
        $(this).addClass("lt_active");
        render_secondCategory(this_id);
    })
});

