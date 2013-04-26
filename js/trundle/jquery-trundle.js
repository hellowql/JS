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
            height:function ($el, type) {
                var height = 0;
                if (type == 0 || type == 2) {
                    $.each($el, function () {
                        height += $(this).outerHeight();
                    })
                } else {
                    $.each($el, function () {
                        height += $(this).outerWidth();
                    })
                }
                return height;
            },
            min:function ($el, type) {
                return Math.min.apply(null, $.map($el, function (n) {
                    return (type == 0 || type == 2) ? $(n).outerHeight() : $(n).outerWidth();
                }));
            },
            getCloneEl:function (height, $els, type, direct) {
                var len = 1, $slice;
                if (type == 0) {
                    while (true) {
                        $slice = $els.slice(0, len);
                        if (tool.height($slice, direct) / height >= 1) {
                            break;
                        }
                        len++;
                    }
                } else {
                    while (true) {
                        $slice = $els.slice(-len);
                        if (tool.height($slice, direct) / height >= 1) {
                            break;
                        }
                        len++;
                    }
                }
                return $slice.clone().addClass('cloned');
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
            return (this.param.scroll && (this.$el.find(this.param.visibleEls).length > this.param.scroll) || (this.param.distance && (tool.height(this.$el.find(this.param.visibleEls), this.param.direct) > this.param.distance)));
        };
        TRUNDLE.prototype.pause = function () {
            clearTimeout(this.timer);
            this.$el.stop(true);
            this.pausetime = new Date().getTime();
            return this;
        };
        TRUNDLE.prototype.continue = function () {
            var _this = this;
            var time = this.pausetime - this.lasttime;
            if (!isNaN(time) && time > 0) {
                switch (this.param.direct) {
                    case 0:
                    case 2:
                        if (this.$el.prop('scrollTop') != this.scrollTo) {
                            this.$el.animate({
                                scrollTop:_this.scrollTo
                            }, time);
                        }
                        break;
                    case 1:
                    case 3:
                        if (this.$el.prop('scrollLeft') != this.scrollTo) {
                            this.$el.animate({
                                scrollLeft:_this.scrollTo
                            }, time);
                        }
                        break;
                }
                this.scroll();
            }
            return this;
        };
        TRUNDLE.prototype.scrollStep = function () {
            switch (this.param.direct) {
                case 0:// up
                case 3:// left
                    this.scrollTo += this.fixedDistance;
                    break;
                case 2:// down
                case 1:// right
                    this.scrollTo -= this.fixedDistance;
                    break;
            }
            return this.scrollTo;
        };
        TRUNDLE.prototype.scroll = function (goAtOnce) {
            var _this = this;
            switch (this.param.direct) {
                case 0:// up
                    var pass = this.scrollTo + this.fixedDistance - this.gap[1];
                    if (pass > 0) {// 是否滚动完所有原始数据
                        this.scrollTo = pass;
                        this.$el.animate({
                            scrollTop:_this.scrollTo
                        }, 0);
                    }
                    break;
                case 1:// right
                    var pass = this.scrollTo - this.gap[0];
                    if (pass < 0) {// 是否滚动完所有原始数据
                        this.scrollTo = pass + this.gap[1];
                        this.$el.animate({
                            scrollLeft:_this.scrollTo
                        }, 0);
                    }
                    break;
                case 2:// down
                    var pass = this.scrollTo - this.gap[0];
                    if (pass < 0) {// 是否滚动完所有原始数据
                        this.scrollTo = pass + this.gap[1];
                        this.$el.animate({
                            scrollTop:_this.scrollTo
                        }, 0);
                    }
                    break;
                case 3:// left
                    var pass = this.scrollTo + this.fixedDistance - this.gap[1];
                    if (pass > 0) {// 是否滚动完所有原始数据
                        this.scrollTo = pass;
                        this.$el.animate({
                            scrollLeft:_this.scrollTo
                        }, 0);
                    }
                    break;
            }
            if (goAtOnce) {
                switch (this.param.direct) {
                    case 0:
                    case 2:
                        this.$el.animate({
                            scrollTop:_this.scrollStep()
                        }, 500);
                        break;
                    case 1:
                    case 3:
                        this.$el.animate({
                            scrollLeft:_this.scrollStep()
                        }, 500);
                        break;
                }
            }
            this.lasttime = new Date().getTime();
            this.timer = setTimeout(function () {
                _this.scroll(true);
            }, this.param.time);
            return this;
        };
        TRUNDLE.prototype.init = function () {
            var _this = this;
            this.$children = this.$el.find(this.param.visibleEls);
            this.childlenth = this.$children.length;
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
                .prepend(tool.getCloneEl(this.fixedDistance, this.$children, 1, this.param.direct))
                .append(tool.getCloneEl(this.fixedDistance, this.$children, 0, this.param.direct));
            switch (this.param.direct) {
                case 0:
                case 2:
                    this.$el.animate({scrollTop:_this.scrollTo}, 0);
                    break;
                case 1:
                case 3:
                    this.$el.animate({scrollLeft:_this.scrollTo}, 0);
                    break;
            }
            this.gap = [];
            this.gap[0] = this.fixedDistance;
            this.gap[1] = tool.height(this.$children, this.param.direct) + this.gap[0];
            this.gap[2] = this.fixedDistance + this.gap[1];
            this.$el.hover(function () {
                _this.pause();
            }, function () {
                _this.continue();
            })
            return this;
        };
        $.fn.trundle = function (obj) {
            var param = $.extend(true, {
                scroll:2,
                //distance:32,
                time:3000,
                visibleEls:'li',
                direct:0// scroll direction，up:0,right:1,down:2,left:3
            }, obj);
            return this.each(function () {
                new TRUNDLE($(this), param).start();
            });
        }
    }(window.jQuery))
}