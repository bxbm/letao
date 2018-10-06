/**
 * Created by hustg on 2018/8/22.
 */
/**
 * Created by hustg on 2018/8/22.
 */
$(function () {
    // 给模板引擎加入jquery方法=================================================
    template.helper("getJquery",function () {
        return jQuery;
    });
    var currPage = 1;

    // 为添加/编辑表单添加校验条件==============================================
    var $form=$("form");
    $form.bootstrapValidator({
        /*校验插件默认会忽略  隐藏的表单元素
         不忽略任何情况的表单元素*/
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandName: {
                validators: {
                    notEmpty: {
                        message: '二级分类名不能为空'
                    }
                }
            },
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '一级分类名不能为空'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类LOGO'
                    }
                }
            }
        }
    });

    // 查询一级分类列表，渲染一级分类选择下拉框==================================
    $.ajax({
        url: "/category/queryTopCategoryPaging",
        type: "get",
        data: {
            page: 1,
            pageSize: 100
        },
        success: function (res) {
            console.log(res);
            var html = template("firstCate", res);
            $("ul.dropdown-menu").html(html);
        },
        error: function () {
            alert("服务器忙");
        }
    });
    // 为下拉框注册选择事件======================================================
    $("ul.dropdown-menu").on("click","li",function () {
        var $this=$(this);
        console.log($this.data("categoryname"));
        $("[name='categoryId']").val($this.data("categoryid"));
        $("button.dropdown-toggle").text($this.data("categoryname"));
        $form.data("bootstrapValidator").updateStatus('categoryId', 'VALID');
    });
    
    
    
    // 定义初始化函数==========================================================
    var init_data = function (page) {
        currPage = page;
        $.ajax({
            url: "/category/querySecondCategoryPaging",
            type: "get",
            data: {
                page: page,
                pageSize: 5
            },
            success: function (res) {
                console.log(res);
                var html = template("secondCategory", res);
                $(".ad_content tbody").html(html);
                init_pagenation("#paginator", res.page, Math.ceil(res.total / res.size), init_data);
            },
            error: function () {
                alert("服务器忙");
            }
        });
    };
    init_data(currPage);

    // 上传图片================================================================
    $('#fileupload').fileupload({
        dataType: 'json',
        url: "/category/addSecondCategoryPic",//文件的后台接受地址
        // 设置进度条
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100);
            $('#progress .bar').css(
                'width',
                progress + '%'
            );
        },
        // 上传完成之后的操作，显示在img里面
        done: function (e, data){
            console.log(data.result);
            $("#uploadimg").attr({src: data.result.picAddr});
            $("#uploadimg").css({height: "100px"});
            $("[name='brandLogo']").val(data.result.picAddr);
            $("form").data("bootstrapValidator").updateStatus('brandLogo', 'VALID');
        }
    });
    
    

    // 为添加分类按钮注册事件===================================================
    $("#addCate").on("click", function () {
        $("#addModal").modal("show");
        $(".modal-title").html("添加分类");
        //校验表单事件
        $form.off('success.form.bv').on('success.form.bv', function (e) {
            e.preventDefault();
            var $form = $(e.target);
            console.log($form.serialize());
            $.ajax({
                url: "/category/addSecondCategory",
                type: "post",
                data: $form.serialize()+"&hot=1",
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



    // 编辑事件=================================================================
    var $brandName_input= $("input.form-control");
    var $categoryId_input= $('[name="categoryId"]');
    var $brandLogo_input= $('[name="brandLogo"]');
    var $tbody=$("tbody");
    $tbody.on("click","a.btn-info",function () {
        $("#addModal").modal("show");
        var $this=$(this);
        var id=$this.data("id");
        var categoryId=$this.data("categoryid");
        var brandName=$this.data("brandname");
        var brandLogo=$this.data("brandlogo");
        var isDelete=$this.data("isdelete");
        var hot=$this.data("hot");
        $brandName_input.val(brandName);
        $categoryId_input.val(categoryId);
        $brandLogo_input.val(brandLogo);
        $("button.dropdown-toggle").text($this.data("categoryname"));
        $("#uploadimg").attr({src: brandLogo});
        $(".modal-title").html("编辑分类");
        $form.off('success.form.bv').on('success.form.bv', function (e) {
            e.preventDefault();
            var $form = $(e.target);
            console.log(id);
            console.log(isDelete);
            console.log(hot);
            console.log($categoryId_input.val());
            console.log($brandName_input.val());
            console.log($brandLogo_input.val());

            $.ajax({
                url: "/category/updateSecondCategory",
                type: "post",
                dataType:"json",
                data: {
                    id:id,
                    isDelete:isDelete,
                    hot:hot,
                    categoryId:$categoryId_input.val(),
                    brandName:$brandName_input.val(),
                    brandLogo:$brandLogo_input.val()
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
    });

    // 禁用与启用
    $tbody.on("click","a.forb",function () {
        var $this=$(this);
        var $that=$this.siblings(".btn-info");
        var id=$that.data("id");
        var categoryId=$that.data("categoryid");
        var brandName=$that.data("brandname");
        var brandLogo=$that.data("brandlogo");
        var hot=$that.data("hot");
        var isDelete=$this.hasClass("btn-danger")?0:1;
        console.log(isDelete);
        $.ajax({
            url: "/category/updateSecondCategory",
            type: "post",
            data: {
                id:id,
                isDelete:isDelete,
                hot:1,
                categoryId:categoryId,
                brandName:brandName,
                brandLogo:brandLogo
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