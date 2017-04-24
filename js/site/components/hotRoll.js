Mini.define('hotRoll', [], function(){
    var config = {
        dir: 'down',
        timeout: 1500
    };
    var roll = (function(opts){
        var $roll = $('#J_rollTable'),
            $rollMain = $roll.find('.roll-main'),
            $rollItem = $roll.find('.table-mod-viewport'),
            $first,
            length = $rollItem.length,
            min = 8,
            opts = $.extend({
                step: 1,
                dir: 'up', //up or down
                timeout: 1000,
                fx: 'fade'
            },opts),
            dir = opts.dir, step = opts.step, nextMargin, time = null;
        function start() {
            if(length<=min) return;
            initMargin();
            startAnimate();
            bindEvent();
        }
        function getSteps(start, end) {
            var $slice = $rollItem.slice;
            steps = dir=='up' ? $slice.call($rollItem, 0, step) : $slice.call($rollItem, length-step);
            return steps;
        }
        function initMargin() {
            var margin, steps;
            if(dir == 'up') {
                steps = $rollItem.slice(0, length-min);
                margin = -getTop(steps);
            } else {
                margin = 0;
            }

            $rollMain.css('margin-top', margin);

            return margin;
            
        }
        function getTop(steps) {
            var top = 0;
            steps.each(function(i, step) {
                top+= $(step).outerHeight();
            });
            return top;
        }
        function startAnimate() {
            var steps = getSteps(),
                nextMargin = getDir(getTop(steps)),
                initM = initMargin(),
                animate = {
                    'margin-top': initM+nextMargin
                };
            timer = setInterval(function(){
                setAnimate(animate);
            },opts.timeout)
        }
        function setAnimate(animate) {

            $rollMain.animate(
                animate, 
                opts.timeout, 
                refresh)
        }
        
        function getDir(top) {
            return dir == 'up' ? -top : top;
        }
        function refresh() {
            
            dir == 'down' ? dirDom(true) : dirDom();
        
            function dirDom(dir) {
                var $start = getDom(dir);
                dir ? $start.prependTo($rollMain) : $rollMain.append($start);
                var $now = getDom(!dir);
                $now.hide();
                $rollMain.css('margin-top', initMargin())
                opts.fx == 'fade' && $now.fadeIn();
            }

            function getDom(dir) {
                return  dir ? getPosEl('last') : getPosEl('first');
            }
        }
        function getPosEl(dir) {
            return dir == 'last' ?  
                   $rollMain.find('.table-mod-viewport:last') :
                   $rollMain.find('.table-mod-viewport:first')
        }
        function bindEvent() {
            $rollMain.hover(function(){
                if(timer) {
                    clearInterval(timer);
                }
            },function(){
                startAnimate();
            })
        }
        return {
            start: start
        };
    })(config);
    roll.start();
})