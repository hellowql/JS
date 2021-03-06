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
        var uuid, tool;
        if ($.fn[plugin]) {
            return;
        }
        uuid = (function () {
            var id = 0;
            return function () {
                return id++;
            };
        }());

        tool = {
            getPaddingAndBorder: function ($el) {
                var padding = [$el.css('paddingTop'), $el.css('paddingRight'), $el.css('paddingBottom'), $el.css('paddingLeft')];
                var border = [$el.css('borderTopWidth'), $el.css('borderRightWidth'), $el.css('borderBottomWidth'), $el.css('borderLeftWidth')];
                if (padding.join('').replace(/\d/g, '') == border.join('').replace(/\d/g, '')) {
                    for (var i = 0, j = padding.length; i < j; i++) {
                        padding[i] = parseInt(padding[i], 10) + parseInt(border[i], 10) + padding[i].replace(/\d/g, '');
                    }
                    return padding.join(' ');
                }
                return null;
            },
            getMargin: function ($el) {
                return [$el.css('marginTop'), $el.css('marginRight'), $el.css('marginBottom'), $el.css('marginLeft')].join(' ');
            }
        }
        $.fn[plugin] = function (obj) {
            var html, placeholder, param, supported;
            param = $.extend(true, {
                placeholder: 'placeholder', // placeholder attribute,default will use explorer original function
                css: {// placeholder text dom css
                    cursor: 'text'
                },
                hideStyle: 'value', // enum:value,focus;hide placeholder when focus or value exists,focus is of no effect when placeholder is 'placeholder'
                className: ''// placeholder text dom className
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
                        width: $this.width(),
                        height: $this.height(),
                        textIndent: $this.css('textIndent'),
                        margin: tool.getMargin($this),
                        padding: tool.getPaddingAndBorder($this),
                        fontSize: $this.css('fontSize')
                    }, param.css));
                    // buttons or other input element, line-height has no effect,so use height replaced
                    if ($this.is('input') || $this.is('button')) {
                        html.css('lineHeight', $this.css('height') == 'auto' ? null : $this.css('height'));
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
                            $this.unbind('.placeholder')
                                .bind('focus.placeholder',function () {
                                    $(this).prev().css('display', 'none').end().triggerHandler('clear.placeholder');
                                }).bind('blur.placeholder',function () {
                                    var $el = $(this), $focus = $(':focus');
                                    if ($focus.length > 0 && $focus.get(0) === this) {
                                        $el.triggerHandler('focus.placeholder');
                                        return;
                                    }
                                    if (this.value.length > 0) {
                                        $el.prev().css('display', 'none').end().triggerHandler('clear.placeholder');
                                    } else {
                                        $el.prev().css('display', 'inline');
                                    }
                                }).triggerHandler('blur.placeholder');
                            break;
                        default :
                            $this.unbind('.placeholder')
                                .bind('keyup.placeholder blur.placeholder',function () {
                                    var $el = $(this);
                                    if (this.value.length > 0) {
                                        $el.prev().css('display', 'none').end().triggerHandler('clear.placeholder');
                                    } else {
                                        $el.prev().css('display', 'inline');
                                    }
                                }).bind('keypress.placeholder',function (e) {
                                    if (e.keyCode >= 32 && e.keyCode <= 126) {
                                        $(this).prev().css('display', 'none').end().triggerHandler('clear.placeholder');
                                    }
                                }).triggerHandler('blur.placeholder');
                    }
                    // fix explorer stored value;
                    (function ($el) {
                        setTimeout(function () {
                            $el.triggerHandler('blur.placeholder');
                        }, 80);
                        $el.bind('mouseleave.placeholder',function () {
                            var $focus = $(':focus'), $el = $(this);
                            if ($focus.length > 0 && $focus.get(0) === this && $el.data('_check_') === undefined) {
                                $el.data('_check_', setInterval(function () {
                                    $el.triggerHandler('blur.placeholder');
                                }, 50));
                            }
                        }).bind('mouseenter.placeholder',function () {
                                $(this).triggerHandler('clear.placeholder');
                            }).bind('clear.placeholder', function () {
                                var $el = $(this);
                                if ($el.data('_check_') !== undefined) {
                                    clearInterval($el.data('_check_'));
                                    $el.removeData('_check_')
                                }
                            });
                    }($this));
                });
            }
            supported = html = placeholder = param = undefined;
            return this;
        }
    }(window.jQuery, 'placeholder'));
}