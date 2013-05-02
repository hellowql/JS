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
    (function ($, plugin, undefined) {
        if ($.fn[plugin]) {
            return;
        }
        var id = 0;

        function uuid() {
            return id++;
        }

        $.fn[plugin] = function (obj) {
            var html, placeholder, param, supported;
            param = $.extend(true, {
                placeholder: 'placeholder', //placeholder attribute,default will use explorer original function
                css: {// placeholder text dom css
                    cursor: 'text'
                },
                hideStyle: 'value', //enum:value,focus;hide placeholder when focus or value exists,focus is of no effect when placeholder is 'placeholder'
                className: ''//placeholder text dom className
            }, obj);
            supported = param.placeholder in document.createElement('input');
            if (!supported) {
                this.each(function () {
                    var $this = $(this), repeat;
                    placeholder = $this.attr(param.placeholder);
                    if ($.trim(placeholder) == '') {
                        return;
                    }
                    repeat = $this.prev().hasClass(plugin);
                    if (!repeat) {
                        html = $('<label/>');
                        html.addClass(param.className ? (plugin + ' ' + param.className) : plugin);
                        html.text(placeholder);
                    } else {
                        html = $this.prev();
                    }
                    html.css($.extend({
                        position: 'absolute',
                        color: '#bbb',
                        display: 'inline',
                        overflow: 'hidden',
                        top: $this.offset().top,
                        left: $this.offset().left,
                        width: $this.width(),
                        height: $this.height(),
                        textIndent: $this.css('textIndent'),
                        paddingLeft: $this.css('borderLeftWidth'),
                        paddingTop: $this.css('borderTopWidth'),
                        paddingRight: $this.css('borderRightWidth'),
                        paddingBottom: $this.css('borderBottomWidth'),
                        fontSize: $this.css('fontSize'),
                        fontFamily: $this.css('fontFamily'),
                        fontWeight: $this.css('fontWeight')
                    }, param.css));
                    //buttons or other input element, line-height has no effect,so use height replaced
                    if ($this.is('input') || $this.is('button')) {
                        html.css('lineHeight', $this.css('height'));
                    } else {
                        html.css('lineHeight', $this.css('lineHeight'));
                    }
                    if (!repeat) {
                        if (!this.id) {
                            this.id = plugin + '_' + uuid();
                        }
                        html.attr('for', this.id);
                        $this.before(html);
                    }
                    switch (param.hideStyle) {
                        case 'focus':
                            $this.unbind('focus.placeholder keyup.placeholder blur.placeholder')
                                .bind('focus.placeholder keyup.placeholder',function () {
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
                            $this.unbind('keyup.placeholder blur.placeholder')
                                .bind('keyup.placeholder blur.placeholder',function () {
                                    if (this.value.length > 0) {
                                        $(this).prev().css('display', 'none');
                                    } else {
                                        $(this).prev().css('display', 'inline');
                                    }
                                }).triggerHandler('blur.placeholder');
                    }
                });
            }
            supported = html = placeholder = param = undefined;
            return this;
        }
    }(window.jQuery, 'placeholder'));
}