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
        function TRUNDLE($el, param) {
            this.$el = $el;
            this.length = $el.children().length;
            this.index = 0;
            this.param = param;
        }

        TRUNDLE.prototype.scroll = function () {
            var _this = this;
            var scrollTop = this.scrollTop();
            this.$el.animate({
                scrollTop:scrollTop
            }, 500);
            this.timer = setTimeout(function () {
                _this.scroll();
            }, this.param.time);
            return this;
        }
        TRUNDLE.prototype.ready = function () {
            return true;
        }
        TRUNDLE.prototype.start = function () {
            return this.ready() && this.scroll();
        }
        TRUNDLE.prototype.pause = function () {
            return this;
        }
        TRUNDLE.prototype.continue = function () {
            return this;
        }
        TRUNDLE.prototype.scrollTop = function () {
            this.index += this.param.scroll;
            this.index %= this.length;
            return (this.index / this.param.scroll) * parseInt(this.param.height)
        }
        $.fn.trundle = function (obj) {
            var param = $.extend(true, {
                scroll:1,
                time:3000,
                height:'22px'
            }, obj);
            return this.each(function () {
                new TRUNDLE($(this), param).start();
            });
        }
    }(window.jQuery))
}