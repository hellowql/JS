/**
 * jQuery placeholder Plugin Just be good for not support placeholder
 * requires jQuery 1.4 or later
 *
 * Released under the MIT license
 * http://jquery.org/license
 *
 * User: wuqinglong
 * mail: hellowql@126.com
 * Date: 13-4-16
 * Time: 下午12:42
 * Version: 0.1
 */
if (!!window.jQuery) {
    (function ($, undefined) {
        if ($.fn.placeholder) {
            return;
        }
        $.fn.placeholder = function (obj) {
            var html, placeholder, param, supported;
            param = $.extend(true, {
                placeholder: 'placeholder', //placeholder attribute,default will use explorer original function
                css: {// placeholder text dom css
                    position: 'absolute',
                    top: '5px',
                    left: '4px',
                    color: '#bbb',
                    cursor: 'text',
                    fontSize: '12px'
                },
                hideCss: false, //className and css how to take effect,true just className take effect
                hideStyle: 'value', //enum:value,focus;hide placeholder when focus or value exists,focus is of no effect when placeholder is 'placeholder'
                className: ''//placeholder text dom className
            }, obj);
            supported = param.placeholder in document.createElement('input');
            if (!supported) {
                this.each(function () {
                    var $this = $(this);
                    placeholder = $this.attr(param.placeholder);
                    if ($this.data('__placeholder__') === true || placeholder == undefined) {// placeholder-ed el never do again
                        return;
                    }
                    html = $('<label></label>');
                    html.text(placeholder);
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
                            break;
                        default :
                            $this.bind('keyup.placeholder blur.placeholder',function () {
                                if (this.value.length > 0) {
                                    $(this).prev().css('display', 'none');
                                } else {
                                    $(this).prev().css('display', 'inline');
                                }
                            }).triggerHandler('blur.placeholder');
                    }
                    $this.data('__placeholder__', true);// mark this el placeholder
                });
            }
            supported = html = placeholder = param = undefined;
            return this;
        }
    }(window.jQuery))
}