Mini.define('anRoll', function(){
    $('#J_anRoll').cycle({
        prev: '#J_anPrev',
        next: '#J_anNext',
        before: function(cur,next) {
            var url = $(next).data('url');
            $('#J_anDetail').attr('href', url);
        },
        timeout: 2500
    })
})