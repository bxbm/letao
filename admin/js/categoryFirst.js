/**
 * Created by hustg on 2018/8/22.
 */
$(function () {
    // 给模板引擎加入jquery方法
    template.helper("getJquery",function () {
        return jQuery;
    });
    var currPage = 1;
    // 定义初始化函数
    var init_data = function (page) {
        currPage = page;
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            type: "get",
            data: {
                page: page,
                pageSize: 10
            },
            success: function (res) {
                console.log(res);
                var html = template("firstCategory", res);
                $(".ad_content tbody").html(html);
                init_pagenation("#paginator", res.page, Math.ceil(res.total / res.size), init_data);
            },
            error: function () {
                alert("服务器忙");
            }
        });
    };
    init_data(currPage);
    // 为添加分类按钮注册事件
    $("#addCate").on("click", function () {
        $("#addModal").modal("show");
        $(".modal-title").html("添加分类");
        //校验表单
        $('form').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                categoryName: {
                    validators: {
                        notEmpty: {
                            message: '分类名不能为空'
                        }
                    }
                }
            }
        }).off('success.form.bv').on('success.form.bv', function (e) {
            e.preventDefault();
            var $form = $(e.target);
            console.log($form.serialize());
            $.ajax({
                url: "/category/addTopCategory",
                type: "post",
                data: $form.serialize(),
                success: function (res) {
                    if (res.success) {
                        $("#addModal").modal("hide");
                        init_data(currPage);
                    }
                },
                error: function () {
    
                }
            });
        });
    });

    // 编辑事件
    $("tbody").on("click","a.btn-info",function () {
        $("#addModal").modal("show");
        var $this=$(this);
        var id=$this.data("id");
        var categoryName=$this.data("name");
        var isDelete=$this.data("isdelete");
        console.log(isDelete);
        $("input.form-control").val(categoryName);
        $(".modal-title").html("编辑分类");
        $('form').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                categoryName: {
                    validators: {
                        notEmpty: {
                            message: '分类名不能为空'
                        }
                    }
                }
            }
        }).off('success.form.bv').on('success.form.bv', function (e) {
            e.preventDefault();
            var $form = $(e.target);
            console.log($("input.form-control").val());
            $.ajax({
                url: "/category/updateTopCategory",
                type: "post",
                data: {
                    id:id,
                    isDelete:isDelete,
                    categoryName:$("input.form-control").val()
                },
                success: function (res) {
                    if (res.success) {
                        console.log(res);
                        $("#addModal").modal("hide");
                        init_data(currPage);
                    }
                },
                error: function () {

                }
            });
        });
    })
    
    //禁用与启用
    $("tbody").on("click","a.forb",function () {
        var $this=$(this);
        var id=$this.data("id");
        var isDelete=$this.hasClass("btn-danger")?0:1;
        var categoryName=$this.data("name");
        $.ajax({
            url: "/category/updateTopCategory",
            type: "post",
            data: {
                id:id,
                isDelete:isDelete,
                categoryName:categoryName
            },
            success: function (res) {
                if (res.success) {
                    console.log(res);
                    $("#addModal").modal("hide");
                    init_data(currPage);
                }
            },
            error: function () {

            }
        });
    })
});