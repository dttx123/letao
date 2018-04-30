//获取表单验证的实例
var validator= $(".loginForm").data('bootstrapValidator');

//表单验证
$('.loginForm').bootstrapValidator({
    //默认情况下不校验
    excluded: [':disabled', ':hidden', ':not(:visible)'],
    //校验时使用的图标
    feedbackIcons:{
        valid: 'glyphicon glyphicon-ok',  //验证通过的
        invalid: 'glyphicon glyphicon-remove', // 验证失败
        validating: 'glyphicon glyphicon-refresh' //验证中
    },
    //配置校验规则
    fields:{
        //对应表单的name属性
        //用户名
        username:{
            message:'用户名1',
            validators:{
                notEmpty:{
                    message:'用户名不能为空！'
                },
                //正则校验
                regexp:{
                    regexp:/^[a-zA-Z0-9_\.]+$/,
                    message:'用户名只能由字母数字下划线构成！'
                },
                callback:{
                    message:'用户名错误！'
                }
            }
        },
        //密码
        password:{
            message:'密码哦！',
            validators:{
                notEmpty:{
                    message:'密码不能为空！'
                },
                stringLength:{
                    min:6,
                    message:'密码长度不能小于6位'
                },
                callback:{
                    message:'密码错误！'
                }
            }
        }
    }
});

$(".loginForm").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    var form=$(e.target);
    //获取表单的数据
    var data=form.serialize();
    $.ajax({
        type:'post',
        url:'/employee/employeeLogin',
        data:data,
        dataType:'json',
        success:function(info){
//                    console.log(info);
            if(info.success){
                //登录成功
                location.href='index.html';
            }else{
                //启用提交按钮
                form.data('bootstrapValidator').disableSubmitButtons(false);//启用submit按钮
                if(info.error==1000){
                    //用户名错误 (调用上面的 验证中的callback对象中的message属性)
                    form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                }else{
                    //密码错误 (调用上面的 验证中的callback对象中的message属性)
                    //设置 表单验证 不通过时的密码错误
                    form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }
            }
        }
    })

});

// 表单重置
$(".btn-reset").click(function(){
    validator.resetForm();
})

