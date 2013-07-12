/**
 * jQuery Plugin
 * requires jQuery 1.4 or later
 *
 * Released under the MIT license
 * http://jquery.org/license
 *
 * User: wuqinglong
 * mail: hellowql@126.com
 * Date: 13-7-12
 * Time: 下午2:14
 * Version: 0.1
 */
(function () {
    var obj = {
        prodId: '',
        name: '',
        imgSrc: '',
        price: '',
        dataId: ''
    }
    var tool = {
        indexOf: function (obj, objs) {
            var i, o, p, index = -1;
            if (obj && objs && objs.length) {
                for (i = objs.length - 1; i > -1; i--) {
                    o = objs[i];
                    index = i;
                    for (p in o) {
                        if (o.hasOwnProperty(p)) {
                            if (o[p] !== obj[p]) {
                                index = -1;
                                break;
                            }
                        }
                    }
                    if (index > -1) {
                        return index;
                    }
                }
            }
            return index;
        },
        indexOfProp: function (obj, objs) {
            var i, o, p, index = -1;
            if (obj && objs && objs.length) {
                for (i = objs.length - 1; i > -1; i--) {
                    o = objs[i];
                    index = i;
                    for (p in obj) {
                        if (obj.hasOwnProperty(p)) {
                            if (obj[p] !== o[p]) {
                                index = -1;
                                break;
                            }
                        }
                    }
                    if (index > -1) {
                        return index;
                    }
                }
            }
            return index;
        }
    }

    function DATAUTILS(key) {
        this.Store = $.jStorage;
        this.$ = jQuery;
        this.key = key;
        //this.page=page;
    }

    DATAUTILS.prototype.ready = function () {
        var ready = this.Store && this.Store.storageAvailable();
        if (!ready) {
            throw new ReferenceError('not support html5 localstorage!');
        }
        return ready;
    }
    DATAUTILS.prototype.setPage = function (page) {
        this.page = page;
    }
    DATAUTILS.prototype.add = function (data) {
        var exists = this.get(), i, j;
        if (!exists) {
            exists = [];
        }
        if (tool.indexOf(data, exists) > -1) {
            return;
        }
        exists.push(data);
        this._set(exists);
    }
    DATAUTILS.prototype._set = function (datas) {
        this.Store.set(this.key, exists, {TTL: 24 * 60 * 60 * 1000});
        //TODO page need fresh
    }
    DATAUTILS.prototype.remove = function (data) {
        var exists = this.get(), index = tool.indexOf(data, exists);
        if (index > -1) {
            exists.splice(index, 1);
            this._set(exists);
        }
    }
    DATAUTILS.prototype.get = function () {
        return this.Store.get(this.key, []);
    }
    DATAUTILS.prototype.exists = function (data) {
        return tool.indexOf(data, this.get()) > -1;
    }
    function PAGE() {
    }

    PAGE.prototype.setDatautils = function (datautils) {
        this.datautils = datautils;
    }
    function XYZ_COMPARE(options) {
        this._options = options;
    }

}());
 