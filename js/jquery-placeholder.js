/**
 * Created with JetBrains WebStorm.
 * User: wuqinglong
 * Date: 13-4-16
 * Time: 下午12:42
 * Version: 0.1
 * To change this template use File | Settings | File Templates.
 */
if (!!window.jQuery) {
    (function ($) {
        $.fn.placeholder = function (obj) {
            var
                pStr = 'placeholder',
                supported = pStr in document.createElement('input')
                , html, placeholder, param;
            if (!supported) {
                param = $.extend({
                    placeholder:'',
                    css:{
                        position:'absolute',
                        top:'5px',
                        color:'#bbb',
                        cursor:'text',
                        fontSize:'14px'
                    }
                }, obj);
                this.each(function () {
                    var $this = $(this);
                    html = $('<label></label>');
                    placeholder = $this.attr(pStr) || param.placeholder;
                    if (placeholder != undefined) {
                        html.text(placeholder);
                    }
                    html.css(param.css);
                    if ($this.parent().is('td')) {
                        $this.wrap('<div></div>')
                    }
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

                /*
                 $this.bind('blur.placeholder',function () {
                 if (this.value.length > 0) {
                 $(this).prev().css('display', 'none');
                 } else {
                 $(this).prev().css('display', 'inline');
                 }
                 }).bind('keyup.placeholder focus.placeholder',function(){
                 $(this).prev().css('display', 'none');
                 }).triggerHandler('blur.placeholder');
                 */
            }
            pStr = supported = html = placeholder = param = null;
            return this;
        }
    }(window.jQuery))
}