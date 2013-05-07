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
            getValue: function ($el, direct) {
                var border, padding, margin, value = null;
                switch (direct) {
                    case 'top':
                        border = $el.css('borderTopWidth');
                        padding = $el.css('paddingTop');
                        //margin = $el.css('marginTop');
                        break;
                    case 'right':
                        border = $el.css('borderRightWidth');
                        padding = $el.css('paddingRight');
                        //margin = $el.css('marginRight');
                        break;
                    case 'down':
                        border = $el.css('borderBottomWidth');
                        padding = $el.css('paddingBottom');
                        //margin = $el.css('marginBottom');
                        break;
                    case 'left':
                        border = $el.css('borderLeftWidth');
                        padding = $el.css('paddingLeft');
                        //margin = $el.css('marginLeft');
                        break;
                }
                return this._getValue(border, padding, margin);
            },
            getPaddingAndBorder: function ($el) {
                var padding = [$el.css('paddingTop'), $el.css('paddingRight'), $el.css('paddingBottom'), $el.css('paddingLeft')];
                var border = [$el.css('borderTopWidth'), $el.css('borderRightWidth'), $el.css('borderBottomWidth'), $el.css('borderLeftWidth')];
                if (padding.join('').replace(/\d/g, '') == border.join('').replace(/\d/g, '')) {
                    for (var i = 0, j = padding.length; i < j; i++) {
                        padding[i] = parseInt(padding[i], 10) + parseInt(border[i], 10) + padding[i].replace(/\d/g, '');
                    }
                }
                return padding.join(' ');
            },
            _getValue: function (border, padding, margin) {
                var value = null;
                if (border && padding && border.replace(/\d/g, '') == padding.replace(/\d/g, '')) {
                    value = parseInt(border, 10) + parseInt(padding, 10) + padding.replace(/\d/g, '');
                } else {
                    value = border || padding;
                }
                return value;
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
                        top: $this.parent().is('body') ? $this.offset().top : $this.position().top,
                        left: $this.parent().is('body') ? $this.offset().left : $this.position().left,
                        width: $this.width(),
                        height: $this.height(),
                        textIndent: $this.css('textIndent'),
                        //                        marginTop: $this.css('marginTop'),
                        //                        marginRight: $this.css('marginRight'),
                        //                        marginBottom: $this.css('marginBottom'),
                        //                        marginLeft: $this.css('marginLeft'),
                        margin: $this.css('margin'),
                        //                        paddingTop: tool.getValue($this, 'top'),//$this.css('borderTopWidth'),
                        //                        paddingRight: tool.getValue($this, 'right'),//$this.css('borderRightWidth'),
                        //                        paddingBottom: tool.getValue($this, 'bottom'),//$this.css('borderBottomWidth'),
                        //                        paddingLeft: tool.getValue($this, 'left'),// $this.css('borderLeftWidth'),
                        padding: tool.getPaddingAndBorder($this),
                        //                        padding:$this.css('padding'),
                        //                        border:$this.css('border'),
                        fontSize: $this.css('fontSize')
                        //                        fontFamily: $this.css('fontFamily'),
                        //                        fontWeight: $this.css('fontWeight')
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