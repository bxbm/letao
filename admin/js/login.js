$(function () {
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: '用户名只能包含大写、小写、数字和下划线'
                    },
                    callback:{
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码长度必须在6到18位之间'
                    },
                    callback:{
                        message: '密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
        e.preventDefault();
        var $form=$(e.target);
        console.log($form.serialize());
        $.ajax({
                url:"/employee/employeeLogin",
            type:"post",
            data:$form.serialize(),
            success:function (res) {
                if (res.success) {
                    location.href="index.html";
                } else {
                    if (res.error == 1000) {
                        $("form").data("bootstrapValidator").updateStatus('username', 'INVALID', 'callback');
                    } else if (res.error == 1001) {
                        $("form").data("bootstrapValidator").updateStatus('password', 'INVALID', 'callback');
                    }
                }
            },
            error:function () {
                $('#myModal').modal('show');
            }
        })
    });
    $("[type='reset']").on("click",function () {
        $("form").data("bootstrapValidator").resetForm();
    });
});