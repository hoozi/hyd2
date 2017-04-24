Mini.define('siteNav', function(){
    var $siteNav = $('#J_siteNav'),
        $siteNavItem = $siteNav.find('.site-nav-item'),
        $siteNavLogin = $('#J_siteNavLogin'),
        timer = 0;
    
    function _moseenter() {
        $(this).addClass('site-nav-item-hover');
    }
    
    function _moseleave() {
        $(this).removeClass('site-nav-item-hover');
    }

    function _loginHover() {
        return function(e) {
            if(e.type=='mouseenter') {
                if(timer) {
                    clearTimeout(timer);
                }
                $siteNavLogin.addClass('site-nav-login-hover');
            } else {
                timer = setTimeout(function() {
                    $siteNavLogin.removeClass('site-nav-login-hover');
                },100);
            }
        }
    }

    $siteNavItem.on({
        mouseenter: _moseenter,
        mouseleave: _moseleave
    });

    $siteNavLogin.on({
        mouseenter: _loginHover(),
        mouseleave: _loginHover()
    },'.site-nav-login-name')
    .on({
        mouseenter: _loginHover(),
        mouseleave: _loginHover()
    },'.site-nav-login-bd');
    
});