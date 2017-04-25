Mini.define('source', function(){
    return {
        "20'": {
            stock: 5 //库存
        },
        "40'": {
            stock: 3 //库存
        },
        "20'GP": {
            stock: 2 //库存
        },
        "40'GP": {
            stock: 3 //库存
        },
        '40H': {
            stock: 5 //库存
        },
        '20RF': {
            stock: 0 //库存
        },
        '40RF': {
            stock: 0 //库存
        },
        'ctnList': [
            {
                "20'": {
                    count: 0,
                    price: 0
                }
            },
            {
                "40'": {
                    count: 0,
                    price: 0
                }
            },
            {
                "20'GP": {
                    count: 0,
                    price: 0
                }
            },
            {
                "40'GP": {
                    count: 0,
                    price: 0
                }
            },
            {
                '40H': {
                    count: 0,
                    price: 0
                }
            },
            {
                '20RF': {
                    count: 0,
                    price: 0
                }
            },
            {
                '40RF': {
                    count: 0,
                    price: 0
                }
            }
        ],
        'totalPrice':0
    }
})

Mini.define('render', function(){
    return {
        renderStock: function(stock) {
            var $stock = $('#J_stock');
            $stock.html('（库存'+stock+'）')
        }
    }
});
Mini.define('vaildate', function(){
    return {
        vailCount: function(stock, count) {
            var count = Number(count);
            return !(count<0) && (stock>=count);
        }
    }
});

Mini.define('ctn', ['source', 'render', 'vaildate'], function(source, render, vaildate){
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
            if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }

            var aArgs   = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP    = function() {},
                fBound  = function() {
                return fToBind.apply(this instanceof fNOP
                        ? this
                        : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            if (this.prototype) {
            // Function.prototype doesn't have a prototype property
            fNOP.prototype = this.prototype; 
            }
            fBound.prototype = new fNOP();

            return fBound;
        };
    }
    var doc = document;
    function Ctn(source) {
        this.data = source;
        this.selected = null;
        this.stock = 0;
        this.eventMaps = {
            'click .ctn-size-item': 'selectCtn',
            'click .count-cut': 'countCut',
            'click .count-add': 'countAdd',
            'click .J_ctnAdd': 'ctnAdd'
        }
        this.$el = {
            ctnItem: '.ctn-size-item',
            count: '.count-value'
        }
        this.init();
    }
    Ctn.prototype = {
        init: function() {
            this.initElements();
            this.initCtn();
            this.initEvents();
        },
        initCtn: function(){
            var size = $('.ctn-size-selected').find('b').text();
            this.selected = this.getCtnSize(size);
            this.stock = this.getStock(size);
            render.renderStock(this.stock);
        },
        scanEvents: function(evMaps, isOn) {
            var eventReg = /^(\S+)\s*(.*)$/;
            var bind = isOn ? this._on : this._off;
            for(var k in evMaps) {
                var matchs = k.match(eventReg);
                bind(matchs[1], matchs[2], this[evMaps[k]].bind(this));
            }
        },
        initElements: function(){
            for(var k in this.$el) {
                this[k] = this.$el[k];
            }
        },
        initEvents: function() {
            this.scanEvents(this.eventMaps, true);
        },
        _on: function(name, el, fn) {
            $(doc).on(name, el, fn);
        },
        _off: function(name, el, fn) {
            $(doc).on(name, el, fn);
        },
        initEvents: function() {
            this.scanEvents(this.eventMaps);
        },

        selectCtn: function(e){
            var $target = $(e.target),
                ctnItem = this.ctnItem,
                $parent = $target.parents(ctnItem),
                size = $target.text();
            $(ctnItem).removeClass('ctn-size-selected');
            $parent.addClass('ctn-size-selected');
            this.selected = this.getCtnSize(size);
            this.stock = this.getStock(size);
            this.calculateStock(0);
        },
        getCtnSize: function(size){
            return this.data[size];
        },
        getStock: function(size) {
            return this.getCtnSize(size)['stock'];
        },
        calculateStock: function(stock) {
            var stock = this.stock-stock;
            this.stock = stock;
            render.renderStock(stock);
        },
        countCut: function(e) {
            var $count = $(this.count),
                val = Number($count.val()),
                stock = this.stock;
                success = vaildate.vailCount(stock, val);
        },
        countAdd: function(e){
            var $count = $(this.count),
                val = Number($count.val()),
                stock = this.stock;
                success = vaildate.vailCount(stock, val);
            //if(val>stock) return ;
            
        },
        count: function(type){
            var $count = $(this.count),
                val = Number($count.val()),
                stock = this.stock;
                success = vaildate.vailCount(stock, val);
            type == 'cut' ? cut() : add();
            function cut() {

            }
            function add() {

            }
        },
        ctnAdd: function() {

        }
    }
    new Ctn(source);
})
