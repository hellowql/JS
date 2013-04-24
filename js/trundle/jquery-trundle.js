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
                            console.log(height, type, len)
                            break;
                        }
                        len++;
                    }
                } else {
                    while (true) {
                        $slice = $els.slice(-len);
                        if (tool.height($slice) / height >= 1) {
                            console.log(height, type, len)
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

        TRUNDLE.prototype.scroll = function (goAtOnce) {
            var _this = this;
            var pass = this.currenScrollTop + this.fixedHeight - this.heights[1];
            if (pass > 0) {// 是否滚动完所有原始数据
                this.currenScrollTop = pass;
                this.$el.animate({
                    scrollTop:_this.currenScrollTop
                }, 0);
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
        TRUNDLE.prototype.ready = function () {
            return this.$el.children().length > this.param.scroll || tool.height(this.$el.children()) > this.param.height;
        };
        TRUNDLE.prototype.init = function () {
            var _this = this;
            this.$children = this.$el.children();
            this.childlenth = this.$children.length;
            this.fixedScroll = this.param.scroll;
            this.fixedHeight = parseInt(this.param.height);
            if (isNaN(this.fixedHeight) && this.fixedScroll > 0) {
                this.fixedHeight = tool.min(this.$children) * this.fixedScroll;
            }
            if (this.fixedHeight > 0) {
                this.fixedScroll = Math.round(this.fixedHeight / tool.min(this.$children));
            }
            this.currenScrollTop = this.fixedHeight;
            this.$el
                .prepend(tool.getCloneEl(this.fixedHeight, this.$children, 1))
                .append(tool.getCloneEl(this.fixedHeight, this.$children, 0))
                .animate({scrollTop:_this.currenScrollTop}, 0);
            this.heights = [];
            this.heights[0] = this.fixedHeight;
            this.heights[1] = tool.height(this.$children) + this.heights[0];
            this.heights[2] = this.fixedHeight + this.heights[1];


            this.$el.hover(function () {
                _this.pause();
            }, function () {
                _this.continue();
            })
            return this;
        };
        TRUNDLE.prototype.start = function () {
            return this.ready() && this.init() && this.scroll();
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
                if (this.$el.prop('scrollTop') != this.currenScrollTop) {
                    this.$el.animate({
                        scrollTop:_this.currenScrollTop
                    }, time);
                }
                this.scroll();
            }
            return this;
        };
        TRUNDLE.prototype.scrollStep = function () {
            this.currenScrollTop += this.fixedHeight;
            return this.currenScrollTop;
        };
        $.fn.trundle = function (obj) {
            var param = $.extend(true, {
                scroll:3,
                height:44,
                time:3000
            }, obj);
            return this.each(function () {
                new TRUNDLE($(this), param).start();
            });
        }
    }(window.jQuery))
}