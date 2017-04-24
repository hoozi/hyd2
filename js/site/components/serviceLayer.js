Mini.define('layerTemplate', function(){
    var $detail = $('#t-detail').html()
    return {
        detail: _.template($detail)
    }
});

Mini.define('serviceLayer', [
    'layerTemplate'
], function(layerTemplate){
    return {
        ctn: function(e) {
            layer.open({
                title: '箱动态列表',
                type: 1,
                skin: 'layui-layer-rim my-layer-skin', //加上边框
                area: ['480px', 'auto'], //宽高
                content: layerTemplate.detail(e.data)
             })
        }
    }
})