/**
 * Created by cc on 2018-03-16.
 */
//访问其他页面之前，先判断当前用户是否登录
if(location.href.indexOf('login.html')<0){
    $.ajax({
        type:'get',
        url:'/employee/checkRootLogin',
        dataType:'json',
        success:function(info){
            if(info.error){
                //登录失败跳转回登录页
                location.href='login.html';
            }
        }
    })
}


//不要小圆圈
NProgress.configure({
    showSpinner: false
});


//绑定ajax请求
$(window).ajaxStart(function(){
    console.log('start');
    NProgress.start();
});

$(window).ajaxStop(function(){
    console.log('end');
    setTimeout(function(){
        NProgress.done();
    },500)
});

//导航的折叠
$('.menu li:nth-child(2)').click(function(){
       $('.child').slideToggle(200);
})

//用户退出功能
$('.login-out').click(function(){
    $.ajax({
        type:'get',
        url:'/employee/employeeLogout',
        dataType:'json',
        success:function(info){
            console.log(info);
            if(info.success){
                location.href='./login.html';
            }
        }
    })
});
