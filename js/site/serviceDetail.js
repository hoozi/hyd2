var alias = {
    'jquery': 'js/vendors/jquery/dist/jquery.min',
    'lodash': 'js/vendors/lodash/dist/lodash.min',
    'layer': 'js/vendors/layer/layer',
    'city': 'js/vendors/city/jquery.cityselect'
}

Mini.require([
    alias['jquery'],
    alias['lodash'],
    'js/site/commons/siteNav',
    'js/site/components/ctn'
], loadService);

function loadService() {
    Mini.use('siteNav');
    Mini.use('ctn');
    Mini.require([
        alias['city']
    ], function(){
        var opts = {prov:"浙江", city:"宁波", dist:"海曙区"}
        $('#city1').citySelect(opts);
        $('#city2').citySelect(opts);
    });
}   