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
            height:function ($el) {
                var height = 0;
                $.each($el, function () {
                    height += $(this).outerHeight();
                })
                return height;
            },
            min:function ($el) {
                return Math.min.apply(null, $.map($el, function (n) {
                    return $(n).outerHeight();
                }));
            },
            getCloneEl:function (height, $els, type) {
                var len = 1, $slice;
                if (type == 0) {
                    while (true) {
                        $slice = $els.slice(0, len);
                        if (tool.height($slice) / height >= 1) {
                            break;
                        }
                        len++;
                    }
                } else {
                    while (true) {
                        $slice = $els.slice(-len);
                        if (tool.height($slice) / height >= 1) {
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
            return this.$el.children().length > this.param.scroll || tool.height(this.$el.children()) > this.param.distance;
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
                if (this.$el.prop('scrollTop') != this.scrollTo) {
                    switch (this.param.direct) {
                        case 0:
                        case 2:
                            this.$el.animate({
                                scrollTop:_this.scrollTo
                            }, time);
                            break;
                        case 1:
                        case 4:
                            this.$el.animate({
                                scrollLeft:_this.scrollTo
                            }, time);
                            break;
                    }
                }
                this.scroll();
            }
            return this;
        };
        TRUNDLE.prototype.scrollStep = function () {
            switch (this.param.direct) {
                case 0:// up
                    this.scrollTo += this.fixedDistance;
                    break;
                case 1:// right
                    break;
                case 2:// down
                    this.scrollTo -= this.fixedDistance;
                    break;
                case 3:// left
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
                    break;
            }
            if (goAtOnce) {
                this.$el.animate({
                    scrollTop:_this.scrollStep()
                }, 500);
            }
            this.lasttime = new Date().getTime();
            this.timer = setTimeout(function () {
                _this.scroll(true);
            }, this.param.time);
            return this;
        };
        TRUNDLE.prototype.init = function () {
            var _this = this;
            this.$children = this.$el.children();
            this.childlenth = this.$children.length;
            this.fixedScroll = this.param.scroll;
            this.fixedDistance = parseInt(this.param.distance);
            if (isNaN(this.fixedDistance) && this.fixedScroll > 0) {
                this.fixedDistance = tool.min(this.$children) * this.fixedScroll;
            }
            if (this.fixedDistance > 0) {
                this.fixedScroll = Math.round(this.fixedDistance / tool.min(this.$children));
            }
            this.scrollTo = this.fixedDistance;
            this.$el
                .prepend(tool.getCloneEl(this.fixedDistance, this.$children, 1))
                .append(tool.getCloneEl(this.fixedDistance, this.$children, 0))
                .animate({scrollTop:_this.scrollTo}, 0);
            this.gap = [];
            this.gap[0] = this.fixedDistance;
            this.gap[1] = tool.height(this.$children) + this.gap[0];
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
                direct:0// 方向，上:0,右:1,下:2,左:3
            }, obj);
            return this.each(function () {
                new TRUNDLE($(this), param).start();
            });
        }
    }(window.jQuery))
}