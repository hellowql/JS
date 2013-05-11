/**
 * jQuery trundle Plugin to trundle news/img
 * requires jQuery 1.4 or later
 *
 * Released under the MIT license
 * http://jquery.org/license
 *
 * User: wuqinglong
 * mail: hellowql@126.com
 * Date: 13-4-23
 * Time: 上午8:51
 * Version: 0.1
 */
if (!!window.jQuery) {
    (function ($, undefined) {
        /**
         * a tool
         *
         * @type {{outline: Function, min: Function, getClonedEl: Function, _getFn: Function}}
         */
        var tool = {
            outline: function ($el, type) {// get all els width or height
                var outline = 0, fn = this._getFn(type);
                $.each($el, function () {
                    outline += $(this)[fn]();
                })
                return outline;
            },
            getElsByOutline: function ($el, outline, type) {
                var _this = this, els = [], distance = 0;
                $el.each(function () {
                    distance += _this.outline($(this), type);
                    if (distance > outline[0] && distance <= outline[1]) {
                        els.push(this);
                    }
                });
                return $(els);
            },
            min: function ($el, type) {// get min width or height from all els
                var fn = this._getFn(type);
                return Math.min.apply(null, $.map($el, function (n) {
                    return $(n)[fn]();
                }));
            },
            getClonedEl: function (outline, $els, type, direct) {// get cloned els for circle trundle
                var len = 1, $slice;
                while (true) {
                    $slice = (type == 'top') ? $els.slice(0, len) : $els.slice(-len);
                    if (tool.outline($slice, direct) / outline >= 1) {
                        break;
                    }
                    len++;
                }
                return $slice.clone().addClass('cloned');
            },
            _getFn: function (direct) {// get fn by direction
                return (direct.toLowerCase() == 'up' || direct.toLowerCase() == 'down')
                    ? 'outerHeight' : 'outerWidth';
            }
        };

        /**
         * TRUNDLE obj
         *
         * @param el
         * @param param
         * @constructor
         */
        function TRUNDLE($el, param) {
            this.$el = $el;
            this.param = param;
        }

        /**
         * start trundle
         *
         * @returns {TRUNDLE}
         */
        TRUNDLE.prototype.start = function () {
            return this.ready() && this.init() && this.scroll();
        };
        /**
         * if els can trundle
         * condition:
         *  1.els length gt param.scroll
         *  or
         *  2.all els width/height gt param.distance
         *
         *
         * @returns {boolean}
         */
        TRUNDLE.prototype.ready = function () {
            var scroll = this.param.scroll, distance = this.param.distance;
            var scrollOk = scroll && (this.$el.find(this.param.visibleEls).length > scroll);
            var distanceOk = distance &&
                (tool.outline(this.$el.find(this.param.visibleEls), this.param.direct) > distance);
            return scrollOk || distanceOk;
        };
        /**
         * pause trundle
         *
         * @returns {TRUNDLE}
         */
        TRUNDLE.prototype.pause = function () {
            clearTimeout(this.timer);
            this.$el.stop(true);
            this.pausetime = new Date().getTime();
            return this;
        };
        /**
         * continue trundle
         *
         * continue is keywords so use pursue
         *
         * @returns {TRUNDLE}
         */
        TRUNDLE.prototype.pursue = function () {
            var _this = this, obj = {}, key, leavetime = this.pausetime - this.scrolltime;
            if (!isNaN(leavetime) && leavetime > 0) {
                switch (this.param.direct.toLowerCase()) {
                    default :
                    case 'up':
                    case 'down':
                        obj = { scrollTop: 0 };
                        break;
                    case 'right':
                    case 'left':
                        obj = { scrollLeft: 0 };
                        break;
                }
                for (key in obj);
                if (this.$el.prop(key) != this.scrollTo) {
                    obj[key] = _this.scrollTo;
                    this.scrolltime = new Date().getTime();
                    this.$el.animate(obj, leavetime, function () {
                        _this.scroll();
                    });
                } else {
                    this.scroll();
                }
            }
            return this;
        };
        /**
         * get the scrollTop or scrollLeft value of every step
         *
         * @returns {Number}
         */
        TRUNDLE.prototype.scrollStep = function () {
            switch (this.param.direct.toLowerCase()) {
                default :
                case 'up':
                case 'left':
                    this.scrollTo += this.fixedDistance;
                    break;
                case 'down':
                case 'right':
                    this.scrollTo -= this.fixedDistance;
                    break;
            }
            return this.scrollTo;
        };
        /**
         * scroll fn
         *
         * it will change scrollTop or scrollLeft value by animate
         * and
         * it will fix scrollTop or scrollLeft when it scroll to the 'end'
         *
         * @param directly, if scroll at once
         * @returns {TRUNDLE}
         */
        TRUNDLE.prototype.scroll = function (directly) {
            var _this = this, obj = {}, needfix = false;
            // if displayed els contains cloned el, it will fix scrollTop/scrollLeft to top/left
            switch (this.param.direct.toLowerCase()) {
                default :
                case 'up':
                    var pass = this.scrollTo + this.fixedDistance - this.gap[1];
                    if (pass > 0) {
                        needfix = true;
                        this.scrollTo = pass;
                        obj = {scrollTop: _this.scrollTo};
                    }
                    break;
                case 'right':
                    var pass = this.scrollTo - this.gap[0];
                    if (pass < 0) {
                        needfix = true;
                        this.scrollTo = pass + this.gap[1];
                        obj = {scrollLeft: _this.scrollTo};
                    }
                    break;
                case 'down':
                    var pass = this.scrollTo - this.gap[0];
                    if (pass < 0) {
                        needfix = true;
                        this.scrollTo = pass + this.gap[1];
                        obj = {scrollTop: _this.scrollTo};
                    }
                    break;
                case 'left':
                    var pass = this.scrollTo + this.fixedDistance - this.gap[1];
                    if (pass > 0) {
                        needfix = true;
                        this.scrollTo = pass;
                        obj = {scrollLeft: _this.scrollTo};
                    }
                    break;
            }
            if (needfix) {
                this.$el.animate(obj, 0);
            }
            if (directly) {
                switch (this.param.direct.toLowerCase()) {
                    default :
                    case 'up':
                    case 'down':
                        obj = {scrollTop: _this.scrollStep()};
                        break;
                    case 'right':
                    case 'left':
                        obj = {scrollLeft: _this.scrollStep()};
                        break;
                }
                this.param.dynamicdata.ready && this.dynamicdata.length ?
                    this.$el.animate(obj, this.param.animatetime, function () {
                        _this.addData();
                    }) : this.$el.animate(obj, this.param.animatetime);
            }
            this.scrolltime = new Date().getTime();
            this.timer = setTimeout(function () {
                _this.scroll(true);
            }, this.param.time);
            return this;
        };
        /**
         * addData
         *
         * push data to li
         *
         */
        TRUNDLE.prototype.addData = function () {
            var _this = this, data, $el, outline = [], $parent, index;
            if (!this.dynamicdata.length) return this;
            outline[0] = this.scrollTo;
            outline[1] = outline[0] + this.fixedDistance;
            $el = tool.getElsByOutline(this.$el.find(this.param.visibleEls), outline, this.param.direct);
            this.$children.each(function (i, el) {
                var add = !!$(el).data('_added_data_');
                var show = !!$el.filter(el).length;
            });
            if (!$el.length) return this;
            if (this.$children.index($el.eq(0)) == -1) return this;
            if (!$.map(this.$children,function (el) {
                return !!$(el).data('_added_data_') ? null : true;
            }).length) {
                this.$children.each(function () {
                    $(this).removeData('_added_data_');
                })
            }
            data = this.dynamicdata.splice(0, Math.min(this.dynamicdata.length, $.map(this.$children,function (el) {
                var add = !!$(el).data('_added_data_');
                var show = !!$el.filter(el).length;
                return add || show ? null : true;
            }).length, this.$children.length - $el.length));
            this.$children.each(function () {
                var $e = $(this);
                if (!$el.filter($e).length && !$e.data('_added_data_') && data.length) {
                    _this.param.dynamicdata.analyze(this, data.shift());
                    $e.data('_added_data_', true);
                }
            });
            this.$el.find(this.param.visibleEls).filter('.cloned').remove();
            this.startIndex = this.$children.index($el);
            this.pause().start();
        }
        TRUNDLE.prototype.init = function () {
            /**
             * init fn
             *
             * @returns {TRUNDLE}
             */
            var _this = this;
            this.$children = this.$el.find(this.param.visibleEls).not('.cloned');
            this.fixedScroll = this.param.scroll;
            this.fixedDistance = parseInt(this.param.distance);
            if (isNaN(this.fixedDistance) && this.fixedScroll > 0) {
                this.fixedDistance = tool.min(this.$children, this.param.direct) * this.fixedScroll;
            }
            if (this.fixedDistance > 0) {
                this.fixedScroll = Math.round(this.fixedDistance / tool.min(this.$children, this.param.direct));
            }
            // clone some els for circle trundle
            this.$el.find(this.param.visibleEls).eq(0).parent()
                .prepend(tool.getClonedEl(this.fixedDistance, this.$children, 'bottom', this.param.direct))
                .append(tool.getClonedEl(this.fixedDistance, this.$children, 'top', this.param.direct));
            this.scrollTo = this.fixedDistance;
            if (this.startIndex) {
                this.scrollTo += tool.outline(this.$children.filter(function (i) {
                    return i < _this.startIndex;
                }), this.param.direct);
                this.startIndex = null;
            }
            switch (this.param.direct.toLowerCase()) {
                default :
                case 'up':
                case 'down':
                    this.$el.animate({scrollTop: _this.scrollTo}, 0);
                    break;
                case 'right':
                case 'left':
                    this.$el.animate({scrollLeft: _this.scrollTo}, 0);
                    break;
            }
            this.gap = [];// store three length,0:prepend els outline,1:prepend+origin els outline,2:all els outline
            this.gap[0] = this.fixedDistance;
            this.gap[1] = tool.outline(this.$children, this.param.direct) + this.gap[0];
            this.gap[2] = this.fixedDistance + this.gap[1];
            if (this.param.hoverpause) {
                this.$el.hover(function () {
                    if ($.isFunction(_this.param.over)) {
                        _this.param.over(function () {
                            _this.pause();
                        });
                    } else {
                        _this.pause();
                    }
                }, function () {
                    if ($.isFunction(_this.param.out)) {
                        _this.param.out(function () {
                            _this.pursue();
                        });
                    } else {
                        _this.pursue();
                    }
                })
            }
            if (this.param.dynamicdata && this.param.dynamicdata.url
                && this.param.dynamicdata.time && $.isFunction(this.param.dynamicdata.analyze)) {
                this.param.dynamicdata.ready = true;
            } else {
                this.param.dynamicdata.ready = false;
            }
            if (this.param.dynamicdata.ready) {
                if (!this.dynamicdata) {
                    this.dynamicdata = [];
                }
                function getData() {
//                    var dynamicdata = this.param.dynamicdata;
//                    $.getJSON(dynamicdata.url, function (datas) {
//                        $.merge(this.dynamicdata, datas);
//                    })
//                    if (_this.dynamicdata.length == 0) {
//                        _this.dynamicdata = ['aaaaaa', 'bbbbbb', 'cccccc', 'dddddd']
//                    }
                    if ($('body').data('_data_')) {
                        _this.dynamicdata = $('body').data('_data_');
                        $('body').removeData('_data_');
                    }
                    setTimeout(function () {
                        getData();
                    }, _this.param.dynamicdata.time);
                }

                setTimeout(function () {
                    getData();
                }, this.param.dynamicdata.time);
            }
            return this;
        };
        $.fn.trundle = function (obj) {
            var param = $.extend(true, {
                scroll: 2,
                //distance:32,
                time: 3000,
                animatetime: 500,
                visibleEls: 'li',
                direct: 'up', // scroll direction enum: up,right,down,left
                hoverpause: true,// over is need pause
                //                over:function(pause){
                //                    pause();
                //                },
                //                out:function(purse){
                //                    purse();
                //                }
                dynamicdata: {// dynamic data
                    url: 'xx',
                    data: [],
                    time: 5000,
                    analyze: function (el, data) {
                        //$el.text(data);
                        return $(el).text(data);
                    },
                    ready: false
                }
            }, obj);
            return this.each(function () {
                new TRUNDLE($(this), param).start();
            });
        }
    }(window.jQuery))
}