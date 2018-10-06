/**
 * Created by hustg on 2018/8/22.
 */
// 进度条开始
$(document).ajaxStart(function () {
    NProgress.start();
});
// 进度条结束
$(document).ajaxStop(function () {
    NProgress.done();
});
// 为折叠侧边栏按钮注册点击事件
$('[data-menu]').on("click",function () {
    $(".ad_aside").toggle();
    $(".ad_section").toggleClass("menu");
});

// 二级菜单的显示和隐藏
$(".menu [href='javascript:;']").on("click",function () {
    $(this).siblings().slideToggle();
    // $(this).siblings().toggle();
});

//为登出按钮注册点击事件
$("[data-logout]").on("click",function () {
    var logoutModal =
        '<div class="modal fade mt_300" id="logoutModal">'+
        '<div class="modal-dialog modal-sm">'+
        '<div class="modal-content">'+
        '<div class="modal-header">'+
        '<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>'+
        '<h4 class="modal-title">温馨提示</h4>'+
        '</div>'+
        '<div class="modal-body">'+
        '<p class="text-danger"><span class="glyphicon glyphicon-info-sign"></span> 您确定要退出后台管理系统吗？</p>'+
        '</div>'+
        '<div class="modal-footer">'+
        // ===========================================data-dismiss="modal":取消模态框===========
        '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
        '<button type="button" class="btn btn-primary">确定</button>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>';
    $("#logoutModal").remove();
    $("body").append(logoutModal);
    $("#logoutModal").modal("show");
    $("#logoutModal").off("click"," .btn-primary").on("click"," .btn-primary",function () {
        $.ajax({
            url:"/employee/employeeLogout",
            type:"get",
            success:function (res) {
                if(res.success){
                    location.href="login.html";
                }else{
                    $("#logoutModal .text-danger").text("操作失败,请重试")
                }
            },
            error:function () {
                $("#logoutModal .text-danger").text("服务器繁忙");
            }
        })
    })
});

// 定义分页组件函数
var init_pagenation=function (paginator,currentPage,totalPages,callback) {
    var options={
        bootstrapMajorVersion: 3,
        currentPage: currentPage,//当前页数
        totalPages: totalPages,//总页数 注意不是总条数
        onPageClicked: function (event, originalEvent, type, page) {
            /*改变当前页再渲染 page当前点击的按钮的页面*/
            currPage=page;
            callback && callback(page);
        }
    };
    $(paginator).bootstrapPaginator(options);
};

