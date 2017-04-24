Mini.require([
    'js/vendors/jquery/dist/jquery.min',
    'js/site/commons/siteNav',
    'js/vendors/My97DatePicker/WdatePicker'
    //'js/vendors/cycle/jquery.cycle.min'
], loadMember);

function loadMember() {
    Mini.use('siteNav');
    Mini.require([
        'js/vendors/raty/jquery.raty.min'
    ], function(){
        var opts = {
            starOff: 'images/off.gif',
            starOn : 'images/on.gif',
            size: 32
        }
        $('#service-raty1').raty($.extend(opts,{
            click: function(score) {
                alert(score);
            }
        }));
        $('#service-raty2').raty($.extend(opts,{
            click: function(score) {
                alert(score);
            }
        }));
        $('#service-raty3').raty($.extend(opts,{
            click: function(score) {
                alert(score);
            }
        }));
    })
}