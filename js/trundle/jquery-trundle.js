/**
 * jQuery trundle Plugin to trundle news/img
 * requires jQuery 1.4 or later
 *
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Created with JetBrains WebStorm.
 * User: wuqinglong
 * mail: hellowql@126.com
 * Date: 13-4-23
 * Time: 上午8:51
 * Version: 0.1
 */
if (!!window.jQuery) {
    (function ($, undefined) {
        var tool = {
            outline:function ($el, type) {
                var outline = 0, fn = this._getFn(type);
                $.each($el, function () {
                    outline += $(this)[fn]();
                })
                return outline;
            },
            min:function ($el, type) {
                var fn = this._getFn(type);
                return Math.min.apply(null, $.map($el, function (n) {
                    return $(n)[fn]();
                }));
            },
            getCloneEl:function (outline, $els, type, direct) {
                var len = 1, $slice;
                while (true) {
                    if (type == 'top') {
                        $slice = $els.slice(0, len);
                    } else {
                        $slice = $els.slice(-len);
                    }
                    if (tool.outline($slice, direct) / outline >= 1) {
                        break;
                    }
                    len++;
                }
                return $slice.clone().addClass('cloned');
            },
            _getFn:function (type) {
                return (type.toLowerCase() == 'up' || type.toLowerCase() == 'down')
                    ? 'outerHeight' : 'outerWidth';
            }
        };

        function TRUNDLE(el, param) {
            this.$el = el;
            this.param = param;
        }

        TRUNDLE.prototype.start = function () {
            return this.ready() && this.init() && this.scroll();
        };
        TRUNDLE.prototype.ready = function () {
            var scroll = this.param.scroll, distance = this.param.distance;
            var scrollOk = scroll && (this.$el.find(this.param.visibleEls).length > scroll);
            var distanceOk = distance &&
                (tool.outline(this.$el.find(this.param.visibleEls), this.param.direct) > distance);
            return scrollOk || distanceOk;
        };
        TRUNDLE.prototype.pause = function () {
            clearTimeout(this.timer);
            this.$el.stop(true);
            this.pausetime = new Date().getTime();
            return this;
        };
        TRUNDLE.prototype.pursue = function () {
            var _this = this, obj = {}, key, leavetime = this.pausetime - this.scrolltime;
            if (!isNaN(leavetime) && leavetime > 0) {
                switch (this.param.direct.toLowerCase()) {
                    default :
                    case 'up':
                    case 'down':
                        obj = { scrollTop:0 };
                        break;
                    case 'right':
                    case 'left':
                        obj = { scrollLeft:0 };
                        break;
                }
                for (key in obj);
                if (this.$el.prop(key) != this.scrollTo) {
                    obj[key] = _this.scrollTo;
                    this.$el.animate(obj, leavetime);
                }
                this.scroll();
            }
            return this;
        };
        TRUNDLE.prototype.scrollStep = function () {
            switch (this.param.direct.toLowerCase()) {
                default :
                case 'up':// up
                case 'left':// left
                    this.scrollTo += this.fixedDistance;
                    break;
                case 'down':// down
                case 'right':// right
                    this.scrollTo -= this.fixedDistance;
                    break;
            }
            return this.scrollTo;
        };
        TRUNDLE.prototype.scroll = function (directly) {
            var _this = this, obj = {}, needfix = false;
            switch (this.param.direct.toLowerCase()) {
                default :
                case 'up':// up
                    var pass = this.scrollTo + this.fixedDistance - this.gap[1];
                    if (pass > 0) {// 是否滚动完所有原始数据
                        needfix = true;
                        this.scrollTo = pass;
                        obj = {scrollTop:_this.scrollTo};
                    }
                    break;
                case 'right':// right
                    var pass = this.scrollTo - this.gap[0];
                    if (pass < 0) {// 是否滚动完所有原始数据
                        needfix = true;
                        this.scrollTo = pass + this.gap[1];
                        obj = {scrollLeft:_this.scrollTo};
                    }
                    break;
                case 'down':// down
                    var pass = this.scrollTo - this.gap[0];
                    if (pass < 0) {// 是否滚动完所有原始数据
                        needfix = true;
                        this.scrollTo = pass + this.gap[1];
                        obj = {scrollTop:_this.scrollTo};
                    }
                    break;
                case 'left':// left
                    var pass = this.scrollTo + this.fixedDistance - this.gap[1];
                    if (pass > 0) {// 是否滚动完所有原始数据
                        needfix = true;
                        this.scrollTo = pass;
                        obj = {scrollLeft:_this.scrollTo};
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
                        obj = {scrollTop:_this.scrollStep()};
                        break;
                    case 'right':
                    case 'left':
                        obj = {scrollLeft:_this.scrollStep()};
                        break;
                }
                this.$el.animate(obj, this.param.animatetime);
            }
            this.scrolltime = new Date().getTime();
            this.timer = setTimeout(function () {
                _this.scroll(true);
            }, this.param.time);
            return this;
        };
        TRUNDLE.prototype.init = function () {
            var _this = this;
            this.$children = this.$el.find(this.param.visibleEls);
            this.fixedScroll = this.param.scroll;
            this.fixedDistance = parseInt(this.param.distance);
            if (isNaN(this.fixedDistance) && this.fixedScroll > 0) {
                this.fixedDistance = tool.min(this.$children, this.param.direct) * this.fixedScroll;
            }
            if (this.fixedDistance > 0) {
                this.fixedScroll = Math.round(this.fixedDistance / tool.min(this.$children, this.param.direct));
            }
            this.scrollTo = this.fixedDistance;
            this.$el.find(this.param.visibleEls).eq(0).parent()
                .prepend(tool.getCloneEl(this.fixedDistance, this.$children, 'bottom', this.param.direct))
                .append(tool.getCloneEl(this.fixedDistance, this.$children, 'top', this.param.direct));
            switch (this.param.direct.toLowerCase()) {
                default :
                case 'up':
                case 'down':
                    this.$el.animate({scrollTop:_this.scrollTo}, 0);
                    break;
                case 'right':
                case 'left':
                    this.$el.animate({scrollLeft:_this.scrollTo}, 0);
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
            return this;
        };
        $.fn.trundle = function (obj) {
            var param = $.extend(true, {
                scroll:2,
                //distance:32,
                time:3000,
                animatetime:500,
                visibleEls:'li',
                direct:'up', // scroll direction enum: up,right,down,left
                hoverpause:true// over is need pause
                //                over:function(pause){
                //                    pause();
                //                },
                //                out:function(purse){
                //                    purse();
                //                }
            }, obj);
            return this.each(function () {
                new TRUNDLE($(this), param).start();
            });
        }
    }(window.jQuery))
}