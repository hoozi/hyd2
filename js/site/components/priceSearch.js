Mini.define('priceSearch', function(){
    var $priceTab = $('#J_priceSearchTab'),
        $priceTabNav = $priceTab.find('.price-search-nav'),
        $priceTabPanel = $priceTab.find('.price-search-panel');

    $priceTab.on('click', '.price-search-nav-item', function(){
        console.log(1)
        var $this = $(this),
            id = $this.attr('href');
        $('.price-search-nav-item').removeClass('price-search-nav-selected');
        $this.addClass('price-search-nav-selected');
        $priceTabPanel.hide();
        $(id).show();
        return false;
    });
})