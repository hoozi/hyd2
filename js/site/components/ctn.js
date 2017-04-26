Mini.define('source', function(){
    return {
        "20'": {
            stock: 5, //库存
            price: 1 //运价
        },
        "40'": {
            stock: 3, //库存
            price: 2 //运价
        },
        "20'GP": {
            stock: 2, //库存
            price: 3,
        },
        "40'GP": {
            stock: 3, //库存
            price: 4 //运价
        },
        '40H': {
            stock: 5, //库存
            price: 5 //运价
        },
        '20RF': {
            stock: 0, //库存
            price: 6 //运价
        },
        '40RF': {
            stock: 0, //库存
            price: 7 //运价
        },
        'ctnList': [
            {
                size: "20'",
                count: 0,
                price: 0 
            },
            {
                size: "40'",
                count: 0,
                price: 0
            },
            {
                size: "20'GP",
                count: 0,
                price: 0
            },
            {
                size: "40'GP",
                count: 0,
                price: 0
            },
            {
                size: '40H',
                count: 0,
                price: 0   
            },
            {
                size: '20RF',
                count: 0,
                price: 0
            },
            {
                size: '40RF',
                count: 0,
                price: 0
            }
        ],
        'totalPrice':0,
        'totalCount':0
    }
})
Mini.define('render', function(){
    return {
        renderStock: function(stock) {
            var $stock = $('#J_stock');
            $stock.html('（库存'+stock+'）')
        },
        renderTable: function(data) {
            var $addArea = $('#J_addCtnTable'),
                html = '', $table = $addArea.find('.table-mod-wrap');
            if(!$table.length) {
                replace('<table class="table-mod-wrap">\
                    <thead>\
                    <tr class="table-mod-hd">\
                        <th>箱型</th>\
                        <th>数量</th>\
                        <th>金额</th>\
                        <th>操作</th>\
                    </tr>\
                    <thead>\
                    <tbody class="J_addArea">\
                    </tbody>\
                </table>');
            }
            html = getHtml(data);
            append(html);
            function replace(html) {
                $addArea.html(html);
            } 
            function append(html) {
                 $table = $addArea.find('.J_addArea');
                 $table.html(html);
            }
            function getHtml(data) {
                var trList = [];
                for(var i=0;i<data.length;i++) {
                    var item = data[i];
                    trList.push('<tr><td>'+item['size']+'</td><td>'+item['count']+'</td><td>'+item['price']+'</td><td><a href="###" class="detele-ctn">删除</a></td></tr>')
                }
                return trList.join('');
            }
        },
        renderTotal: function(total) {
            var $total = $('#J_totalPrice');
            $total.html('¥'+total);
        },
        renderCount: function(count) {
            var $count = $('#J_count');
            $count.html(count);
        }
    }
});

Mini.define('ctn', ['source', 'render'], function(source, render){
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
        this.selected = '';
        this.stock = 0;
        this.list = [];
        this.val = 0;
        this.eventMaps = {
            'click .ctn-size-item': 'selectCtn',
            'click .count-cut': 'countCut',
            'click .count-add': 'countAdd',
            'click .J_ctnAdd': 'ctnAdd',
            'keyup .count-value': 'countKeyup',
            'click .detele-ctn': 'deteleCtn'
        }
        this.$el = {
            $ctnItem: '.ctn-size-item',
            $count: '.count-value'
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
            this.selected = size;
            this.stock = this.getStock(size);
            this.calculateStock(0);
            this.setValue(0);
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
                ctnItem = this.$ctnItem,
                $parent = $target.parents(ctnItem),
                size = $target.text();
            $(ctnItem).removeClass('ctn-size-selected');
            $parent.addClass('ctn-size-selected');
            this.setValue(0);
            this.selected = size;
            this.stock = this.getStock(size);
            this.calculateStock(0);
        },
        getStock: function(size) {
            var size = this.getSize(size);
            return size['stock'];
        },
        getSize: function(size) {
            return this.data[size];
        },
        calculateStock: function(stock) {
            var stock = this.stock-stock,
                selected = this.selected;
            this.data[selected]['stock'] = Number(stock);
            render.renderStock(stock);
        },
        updateStock: function(nowStock) {
            this.stock = nowStock;
        },
        calculateCount: function(count){
            var count = this.data['totalCount']+count
            this.data['totalCount'] = count;
            render.renderCount(count);
        },
        calculateTotal: function(total) {
            var total = this.data['totalPrice']+total;
            this.data['totalPrice'] = total; 
            render.renderTotal(total); 
        },
        countCut: function(e) {
            this.count('cut');
        },
        countAdd: function(e){
            this.count('add');    
        },
        getValue: function() {
            return $(this.$count).val();
        }, 
        setValue: function(val) {
            $(this.$count).val(val);
            this.value = Number(val);
        }, 
        count: function(type){
            var val = this.getValue(),
                stock = this.stock;
            type == 'cut' ? cut() : add();
            function cut() {
                if(val<=0) {
                    val = 0;
                    return alert('对不起，数量不能为负数')
                };
                --val;
            }
            function add() {
                if(stock<=val) {
                    val = stock;
                    return alert('对不起，库存不足了～');
                }
                ++val;
            }
            this.setValue(val);
            this.calculateStock(val);;
        },
        getCtn: function() {
            return _.find(this.data['ctnList'],{size:this.selected});
        },
        getValueByName: function(name) {
            var ctn = this.getCtn();
            return ctn[name];
        },
        setCtn: function(count,price) {
            var ctn = this.getCtn(),
                oldCount = this.getValueByName('count'),
                oldPrice = this.getValueByName('price');
            ctn['count'] = oldCount+count;
            ctn['price'] = oldPrice+price;
            return ctn;
        },
        ctnAdd: function() {
            if(this.value<=0) {
                return alert('请输入数量!');
            };
            var getCtn = this.getCtn(),
                selected = this.selected,
                size = this.getSize(selected),
                nowStock = this.stock-this.value,
                list = this.list,
                priceAll = Number(this.value) * size['price'],
                where = {size:selected},
                ctn = this.setCtn(this.value, priceAll);
            if(_.find(list,where)) {
                index = _.findIndex(list, where);
                list.splice(index,1,ctn);
            } else {
                list.push(ctn);
            }
            render.renderTable(list);
            this.calculateCount(this.value);
            this.calculateTotal(priceAll);
            this.calculateStock(this.value);
            this.setValue(0);
            this.updateStock(nowStock);
        },
        countKeyup: function(e) {
            var value = e.target.value;
            if(value<0) {
                value = 0;
                alert('请输入正确的数量！');
            }
            if(value>this.stock) {
                value = this.stock;
                alert('超出库存范围了');
            }
            this.setValue(value);
            this.calculateStock(value);
        },
        deteleCtn: function(e) {
            var $target = $(e.target),
                $parents = $target.parents('tr'),
                index = $parents.index(),
                ctn = this.list[index],
                size = ctn['size'],
                count = ctn['count'],
                price = ctn['price'],
                removeSize = this.getSize(size),
                totalCount = this.data['totalCount'],
                totalPrice = this.data['totalPrice'];
            this.list.splice(index,1);
            console.log(this.list)
            this.calculateCount(-count);
            this.calculateTotal(-price);
            if(size == this.selected) {
                this.calculateStock(-count);
                this.updateStock(this.stock+count);
            } else {
                removeSize['stock'] = removeSize['stock']+count;
            }
            $parents.remove();
        }
    }
    new Ctn(source);
})
