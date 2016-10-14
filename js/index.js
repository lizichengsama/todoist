$(function () {
    // var todos=[
    //     {title:'a',state:1,isDel:0},
    //     {title:'b',state:1,isDel:0},
    //     {title:'c',state:1,isDel:0}
    // ]
    if(localStorage.data){
        var todos=JSON.parse(localStorage.data)
        render()
    }else{
        var todos=[]
        localStorage.data=JSON.stringify(todos)
    }

    $('.bigbox .contentbox .reciece .recieve-box').on('touchstart','.list-item',function (e) {
        appendTo()
    })

    $('.bigbox .contentbox .plusmiss').on('touchstart','.addmiss',function () {
        $('.addthis').toggleClass('active')
        // todos.push({title:'misson',state:0,isDel:0})
        // localStorage.data=JSON.stringify(todos)
        // render()
    })
    $(document).on('keyup',function (e) {
        var text=$('.addthis').val()
        if(text==''){
            return
        }else
        if(e.keyCode==13){
            todos.push({title:text,state:0,isDel:0})
            $('.addthis').removeClass('active')
            localStorage.data=JSON.stringify(todos)
            render()
            $('.addthis').val('')
        }
    })

    var left=null;
    $('.bigbox .contentbox .recieve .recieve-box').on('touchstart','.list-item',function (e) {
        left=e.originalEvent.changedTouches[0].pageX
    })

    $('.bigbox .contentbox .recieve .recieve-box').on('touchmove','.list-item',function (e) {
        var n=e.originalEvent.changedTouches[0].pageX
        var x=n-left;
        if(x>40){
            $(this).closest('li').css('transform','translate3d(0.3rem,0,0)')
            $(this).closest('li').css('opacity','0.5')

        }
        if(x<-30){
            $(this).closest('li').css('transform','translate3d(0,0,0)')
            $(this).closest('li').css('opacity','1')
        }
    })
    // $('.recieve-box').on('touchstart','.list-item',function () {
    //     $(this).closest('li').toggleClass('done')
    // })

    $('.recieve-box').on('touchstart', '.list-item', function () {
        // alert(9)
        $('.recieve input').addClass('active')
        var contains = $(this).closest('li').text();
        var index = $(this).closest('li').index()
        // console.log(contains)
        console.log(index)
        $('.recieve .changes').val(contains)

        $('.recieve .changebtn').on('click', function () {
            var changecon = $('.changes').val()
            // console.log(changecon)

            todos[index].title = changecon
            $('.recieve input').removeClass('active')
            localStorage.data = JSON.stringify(todos)
            render()
            // $('.changes').val('')
        })
    })
    // var deletep = $('.close')
    $('.recieve-box').on('touchstart','.list-item .close', function () {
        var i = $(this).closest('li').index();

        $(this).closest('li').addClass('.feichu').queue(function () {
            $(this).delay(800).dequeue()
        }).remove();

        todos.splice(i, 1)
        localStorage.data = JSON.stringify(todos)
        render()
    })

    // $('.recieve-box').on('click',function () {
    //     $(this).closest('li').appendTo('input')
    // })

    // function deleteTodo() {
    //     var i=$(this).closest('li').index
    //     todos.splice(i,1)
    //     localStorage.data=JSON.stringify(todos)
    //     $(this).closest('li').remove()
    // }

    //查找函数
    console.log(todos)
    $('searchs').on('touchstart',function () {
        todos.title
    })



    function render() {
        $('.recieve-box').empty()
        $.each(todos, function (e, v) {
            $('<li class="list-item"><div class="todolist">' + v.title + '</div><div class="linedel"></div><p class="icon-font icon-close close"></p></li>')
                .addClass(function () {
                    if (v.state) {
                        return 'done'
                    }
                })
                .appendTo('.recieve-box')
        })
    }

})