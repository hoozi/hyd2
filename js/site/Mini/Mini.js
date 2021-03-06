/**
 * 不考虑加载的module，只包括define，use;
 * exp:
 * define(moduleName, [], fn);
 * define(moduleName, fn);
 * use(moduleName)
 */
(function(root, doc){
    var _array = [],
        _noop = function(){},
        _push = _array.push;
    root.Mini = {
        moduleMap: {},
        fileMap: {},
        define: function(name, deps, factory) {
            var args = arguments;
            if(args.length == 2) {
                factory = deps;
                deps = [];
            }
            if(!this.moduleMap[name]) {
                var module = {
                    name: name,
                    deps: deps,
                    factory: factory
                }
                this.moduleMap[name] = module;
            }
            return this.moduleMap[name];
        },
        use: function(name) {
            var module = this.moduleMap[name];
            if(!module.entity) {
                var args = [],
                    deps = module.deps,
                    _this = this;
                for(var i=0; i<deps.length; i++) {
                    var dep = deps[i],
                        depEnity = _this.moduleMap[dep].entity;
                    if(depEnity) {
                        _push.call(args, depEnity);
                    } else {
                        _push.call(args, _this.use(dep));
                    }
                }
                module.entity = module.factory.apply(_noop, args)
            }
            return module.entity;
        },
        require: function(paths, callback) {
            var _this = this;
            for(var i=0; i<paths.length; i++) {
                var path = paths[i],
                    head = doc.getElementsByTagName('head')[0];
                if(!this['fileMap'][path]) {
                    var node = doc.createElement('script');
                    node.type = 'text/javascript';
                    addOnload(node, callback, path);
                    node.async = true;
                    node.src = path+'.js';
                    head.appendChild(node);
                }
            }
            function addOnload(node, callback, url) {
                var supportOnload = 'onload' in node;

                if(supportOnload) {
                    node.onload = onload;
                } else {
                    node.onreadystatechange = function() {
                        if(/loaded|complete/.test(node.readyState)) {
                            onload();
                        }
                    }
                }

                function onload() {
                    _this['fileMap'][url] = true;
                    node.onload = node.onreadystatechange = null;
                    head.removeChild(node);
                    checkAllLoaded();
                    node = null;
                }

                function checkAllLoaded() {
                    var allLoaded = true;
                    for(var i=0; i<paths.length; i++) {
                        var path = paths[i];
                        if(!_this['fileMap'][path]) {
                            allLoaded = false;
                            break;
                        }
                    }
                    if(allLoaded) {
                        callback && callback();
                    }
                }

            }
        }
    }
})(typeof window !== 'undefined' ? window : this, document);


