$(function(){
    //获取数据并渲染的方法
    function render(page, pageSize) {
        $.ajax({
            url: '/user/queryUser',
            data: {
                page: page||1,
                pageSize: pageSize||5
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $('tbody').html(template('tmp', info));
                console.log(template('tmp', info));            
            }
        })
    }

    render();
})
