/**
 * Created by hustg on 2018/8/23.
 */
/**
 * Created by hustg on 2018/8/22.
 */
$(function () {
    var $form=$("form");
    //校验表单
    $form.bootstrapValidator({
        excluded:[ "[name='statu']" ],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            proName: {
                validators: {
                    notEmpty: {
                        message: '商品名称不能为空'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '商品描述不能为空'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '商品库存不能为空'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '商品尺码不能为空'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '商品价格不能为空'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '商品原价不能为空'
                    }
                }
            },
            brandId: {
                validators: {
                    notEmpty: {
                        message: '   '
                    }
                }
            },
            statu: {
                validators: {
                    notEmpty: {
                        message: '商品statu不能为空'
                    }
                }
            }
        }
    });
    // 给模板引擎加入jquery方法
    template.helper("getJquery",function () {
        return jQuery;
    });
    var currPage = 1;
    // 定义初始化函数
    var init_data = function (page) {
        currPage = page;
        $.ajax({
            url: "/product/queryProductDetailList",
            type: "get",
            data: {
                page: page,
                pageSize: 5
            },
            success: function (res) {
                console.log(res);
                var html = template("productlist", res);
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
            var $uoloadimg=$("#uploadimg");
            $uoloadimg.attr({src: data.result.picAddr});
            $uoloadimg.css({height: "100px"});
            $("[name='brandLogo']").val(data.result.picAddr);
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
            $("ul.dropdown-menu1").html(html);
        },
        error: function () {
            alert("服务器忙");
        }
    });
    // 为一级下拉框注册选择事件======点击结束后，渲染下一级下拉框====================
    $("ul.dropdown-menu1").on("click","li",function () {
        var $this=$(this);
        console.log($this.data("categoryname"));
        console.log($this.data("categoryid"));
        $("button.first-btn").text($this.data("categoryname"));
        $.ajax({
            url: "/category/querySecondCategory",
            type: "get",
            data: {
                id:$this.data("categoryid")
            },
            success: function (res) {
                console.log(res);
                var html = template("brandCate", res);
                $("ul.dropdown-menu2").html(html);
            },
            error: function () {
                alert("服务器忙");
            }
        });
    });
    // 为二级下拉框注册选择事件======点击结束后，填写表单====================
    $("ul.dropdown-menu2").on("click","li",function () {
        var $this=$(this);
        console.log($this.data("id"));
        $("[name='brandId']").val($this.data("id"));
        $("button.second-btn").text($this.data("brandname"));
        $("form").data("bootstrapValidator").updateStatus('brandId', 'VALID');
    });



    // 为添加分类按钮注册事件
    $("#addCate").on("click", function () {
        $form.data('bootstrapValidator').resetForm(true);
        $("[name='statu']").val("1");
        $("#addModal").modal("show");
        $(".modal-title").html("添加分类");
        $form.off('success.form.bv').on('success.form.bv', function (e) {
            e.preventDefault();
            var $form = $(e.target);
            console.log($form.serialize());
            $.ajax({
                url: "/product/addProduct",
                type: "post",
                data: $form.serialize()+"&statu=1",
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

    var $tbody=$("tbody");
    // 编辑事件
    $tbody.on("click","a.btn-info",function () {
        $("#addModal").modal("show");
        var $this=$(this);
        var id="&id="+$this.data("id");
        var proName=$this.data("proname");
        var oldPrice=$this.data("oldprice");
        var price=$this.data("price");
        var proDesc=$this.data("prodesc");
        var size=$this.data("size");
        var statu=$this.data("statu");
        var num=$this.data("num");
        var brandId=$this.data("brandid");
        $("[name='proName']").val(proName);
        $("[name='oldPrice']").val(oldPrice);
        $("[name='price']").val(price);
        $("[name='proDesc']").val(proDesc);
        $("[name='size']").val(size);
        $("[name='statu']").val(statu);
        $("[name='num']").val(num);
        $("[name='brandId']").val(brandId);
        $(".modal-title").html("编辑分类");
        $form.off('success.form.bv').on('success.form.bv', function (e) {
            e.preventDefault();
            $.ajax({
                url: "/product/updateProduct",
                type: "post",
                data: $form.serialize()+id,
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

    //上架与下架
    $tbody.on("click","a.forb",function () {
        var $this=$(this);
        var $that=$this.siblings(".btn-info");
        var id=$this.data("id");
        console.log(id);
        var statu=$this.hasClass("btn-danger")?0:1;
        console.log(statu);
        var proName=$that.data("proname");
        var oldPrice=$that.data("oldprice");
        var price=$that.data("price");
        var proDesc=$that.data("prodesc");
        var size=$that.data("size");
        var num=$that.data("num");
        var brandId=$that.data("brandid");
        $.ajax({
            url: "/product/updateProduct",
            type: "post",
            data: {
                id:id,
                statu:statu,
                proName:proName,
                oldPrice:oldPrice,
                price:price,
                proDesc:proDesc,
                size:size,
                num:num,
                brandId:brandId
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