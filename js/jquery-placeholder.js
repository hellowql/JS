/**
 * Created with JetBrains WebStorm.
 * User: wuqinglong
 * Date: 13-4-16
 * Time: 下午12:42
 * To change this template use File | Settings | File Templates.
 */
if (!!window.jQuery) {
    (function ($) {
        $.fn.placeholder = function (obj) {
            var
                pStr = 'placeholder1',
                supported = 'placeholder' in document.createElement('input')
                , html, placeholder, param = $.extend({
                    placeholder:''
                }, obj);
            this.each(function (param) {
                var $this = $(this);
                if (!supported) {
                    return this;
                }
                html = $('<label></label>');
                placeholder = $this.attr(pStr) || param.placeholder;
                if (placeholder != undefined) {
                    html.text(placeholder);
                }
                html.css({
                    position:'absolute',
                    //top: '0px',
                    //'verticalAlign':'center',
                    left:'5px',
                    color:'#999',
                    cursor:'text'
                });
                $this.parent().css('position', 'relative');
                $this.before(html);
                html.bind('click.placeholder', function () {
                    $(this).next().focus();
                });
                $this.bind('keyup.placeholder blur.placeholder',function () {
                    if (this.value.length > 0) {
                        $(this).prev().css('display', 'none');
                    } else {
                        $(this).prev().css('display', 'inline');
                    }
                }).triggerHandler('blur.placeholder');
            });
            pStr = supported = html = placeholder = null;
            return this;
        }
    }(window.jQuery))
}