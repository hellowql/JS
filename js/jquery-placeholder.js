/**
 * Created with JetBrains WebStorm.
 * User: wuqinglong
 * Date: 13-4-16
 * Time: 下午12:42
 * Version: 0.1
 *
 *  just be good for not support placeholder
 */
if (!!window.jQuery) {
    (function ($) {
        $.fn.placeholder = function (obj) {
            var
                html, placeholder, param = $.extend({
                    placeholder:'placeholder', //placeholder attribute
                    css:{// placeholder text css
                        position:'absolute',
                        top:'5px',
                        left:'3px',
                        color:'#bbb',
                        cursor:'text',
                        fontSize:'14px'
                    },
                    hideCss:false, //className and css how to take effect,true just className take effect
                    hideStyle:'value', //enum:value,focus;hide placeholder when focus or value exists
                    className:''//placeholder text className

                }, obj),
                supported = param.placeholder in document.createElement('input');
            if (!supported) {
                this.each(function () {
                    var $this = $(this);
                    html = $('<label></label>');
                    placeholder = $this.attr(param.placeholder);
                    if (placeholder != undefined) {
                        html.text(placeholder);
                    }
                    if (!param.hideCss) {
                        html.css(param.css);
                    }
                    if (param.className) {
                        html.addClass(param.className);
                    }
                    if ($this.parent().is('td')) {
                        $this.wrap('<div></div>')
                    }
                    $this.parent().css('position', 'relative');
                    $this.before(html);
                    html.bind('click.placeholder', function () {
                        $(this).next().focus();
                    });
                    switch (param.hideStyle) {
                        case 'focus':
                            $this.bind('focus.placeholder keyup.placeholder',function () {
                                $(this).prev().css('display', 'none');
                            }).bind('blur.placeholder',function () {
                                    if (this.value.length > 0) {
                                        $(this).prev().css('display', 'none');
                                    } else {
                                        $(this).prev().css('display', 'inline');
                                    }
                                }).triggerHandler('blur.placeholder');
                            break
                        default :
                            $this.bind('keyup.placeholder blur.placeholder',function () {
                                if (this.value.length > 0) {
                                    $(this).prev().css('display', 'none');
                                } else {
                                    $(this).prev().css('display', 'inline');
                                }
                            }).triggerHandler('blur.placeholder');
                    }
                });
            }
            supported = html = placeholder = param = null;
            return this;
        }
    }(window.jQuery))
}