Mini.require([
    'js/vendors/jquery/dist/jquery.min',
    'js/site/commons/siteNav',
    'js/site/components/promo',
    'js/site/components/priceSearch',
    'js/site/components/anRoll',
    'js/site/components/hotRoll',
    'js/vendors/My97DatePicker/WdatePicker'
    //'js/vendors/cycle/jquery.cycle.min'
], loadIndex);

function loadIndex() {
    Mini.require(['js/vendors/cycle/jquery.cycle.min'], function() {
        Mini.use('siteNav');
        Mini.use('promo');
        Mini.use('priceSearch');
        Mini.use('anRoll');
        Mini.use('hotRoll');
    })
}