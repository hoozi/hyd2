var alias = {
    'jquery': 'js/vendors/jquery/dist/jquery.min',
    'lodash': 'js/vendors/lodash/dist/lodash.min',
    'layer': 'js/vendors/layer/layer'
}

Mini.require([
    alias['jquery'],
    alias['lodash'],
    'js/site/commons/siteNav',
    'js/site/components/serviceLayer'
], loadService);

function loadService() {
    Mini.use('siteNav');
    Mini.require([
        alias['layer']
    ], function(){
        var layer = Mini.use('serviceLayer'),
            $ctnContainer = $('#ctn-content');
        $ctnContainer.on('click', '.J-table-detail',
        {},layer.ctn);
    });
}