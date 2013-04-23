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
        $.fn.trundle = function (obj) {
            var param;
            param = $.extend(true, {

            }, obj);


            return this;
        }
    }(window.jQuery))
}