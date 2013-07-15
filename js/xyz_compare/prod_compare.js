var prod_compare = function (option) {
    var opt = {el: ".dev_prod_detail_compare", showAtOnce: true, bind: function (CPT) {
        $(this.el).unbind("change.compare").bind("change.compare", function () {
            var $el = $(this);
            if ($el.is(":checked")) {
                CPT.add($el)
            } else {
                CPT.remove($el)
            }
        })
    }, checked: function ($el) {
        if ($el) {
            $el.attr("checked", true)
        }
    }, cancel: function ($el) {
        if ($el) {
            $el.removeAttr("checked")
        } else {
            $(this.el).removeAttr("checked")
        }
    }, value: function ($el) {
        return{key: $el.parent().find(".compareId").val(), value: $el.parent().find(".compareName").val()}
    }, setHeight: ""};
    $.extend(opt, option);
    var COOKIE_NAME = "compare_cookie";
    var tool = {toStr: function (arr) {
        return arr.join("-")
    }, toArr: function (str) {
        return str.split("-")
    }, trimEnd: function (str) {
        return str.substring(0, str.length - 1)
    }};
    var CT = {getAll: function () {
        var str = $.cookie(COOKIE_NAME), arr = [];
        if (str) {
            arr = tool.toArr(str)
        }
        return arr
    }, add: function (id) {
        if (this.exist(id)) {
            return
        }
        var cookieValue = this.getAll();
        cookieValue.push(id);
        this.set(tool.toStr(cookieValue))
    }, exist: function (id) {
        var arr = this.getAll();
        for (var i = 0, j = arr.length; i < j; i++) {
            if (arr[i] == id) {
                return true
            }
        }
        return false
    }, get: function (id) {
        var arr = this.getAll();
        for (var i = 0, j = arr.length; i < j; i++) {
            if (arr[i] == id) {
                return arr[i]
            }
        }
        return
    }, kill: function (id) {
        if (!this.exist(id)) {
            return
        }
        var cookieValue = this.getAll();
        for (var i = 0, j = cookieValue.length; i < j; i++) {
            if (cookieValue[i] == id) {
                cookieValue.splice(i, 1);
                break
            }
        }
        this.set(tool.toStr(cookieValue))
    }, clear: function () {
        this.set(null)
    }, set: function (v) {
        $.cookie(COOKIE_NAME, v, {path: "/"})
    }};
    var PT = {cache: {}, templete: (function (template) {
        if (template) {
            template.openTag = "<!--[";
            template.closeTag = "]-->";
            var compile = template.compile(document.getElementById("dev_template").innerHTML);
            var entity = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&#034;", "'": "&#039"};

            function HTMLEntity(str) {
                var out = "", en = "", at = "";
                if (str) {
                    for (var i = 0, j = str.length; i < j; i++) {
                        at = str.charAt(i);
                        en = entity[at];
                        out += en ? en : at
                    }
                }
                return out
            }

            function t(obj) {
                var out = {};
                for (var i in obj) {
                    if (i != undefined) {
                        out[i] = HTMLEntity(obj[i])
                    }
                }
                return compile(out)
            }

            return t
        }
        return function () {
            return""
        }
    }(window.template)), get: function (id) {
        var html = "", single = "", needGet = "", idArr;
        var _this = this;
        if (id != undefined) {
            idArr = id.split("-");
            for (var i = 0, j = idArr.length; i < j; i++) {
                if (idArr[i] != "") {
                    single = this.cache[idArr[i]];
                    if (!single) {
                        needGet += idArr[i] + "-"
                    } else {
                        html += _this.templete(single)
                    }
                }
            }
            if (needGet) {
                needGet = tool.trimEnd(needGet);
                $.ajax({url: "/insproductlist.do?xcase=getComparedProd&prodIdS=" + needGet, async: false, dataType: "json", success: function (result) {
                    for (var key in result) {
                        _this.set(key, result[key]);
                        html += _this.templete(result[key])
                    }
                }, error: function (xhr) {
                }})
            }
        }
        return html
    }, set: function (id, str) {
        if (id != undefined && str != undefined) {
            this.cache[id] = str
        }
    }};
    var CPT = {add: function ($el) {
        var arr = CT.getAll();
        if (arr) {
            if (arr.length > 3) {
                opt.cancel($el);
                var obj = opt.value($el);
                if (!CT.get(obj.key)) {
                    alert("最多可选择4款产品")
                }
            } else {
                var obj = opt.value($el);
                if (obj) {
                    CT.add(obj.key)
                }
            }
        }
        this._refresh();
        return this
    }, remove: function ($el) {
        var obj = opt.value($el);
        if (obj) {
            CT.kill(obj.key)
        }
        this._refresh();
        return this
    }, _refresh: function () {
        this._freshEl()._freshPop();
        return this
    }, _freshEl: function () {
        var arr = CT.getAll(), $list = $(opt.el);
        opt.cancel();
        if (arr && arr.length > 0 && $list.length > 0) {
            $.each(arr, function () {
                opt.checked($list.filter("#" + this))
            })
        }
        return this
    }, _freshPop: function () {
        var arr = CT.getAll(), $num, $body, $pop, $open;
        if (!arr) {
            return
        }
        $num = $("#dev_compare_nums");
        $body = $("#dev_compare_body");
        $pop = $("#dev_compare_pop");
        $open = $("#dev_compare_open");
        if (arr.length == 0) {
            $pop.hide();
            $body.html("");
            this._freshNum()
        } else {
            $body.html('<div class="lay-prod-list"><img src="/images/ajax/wait.gif"/></div>');
            $pop.show();
            if ($.isFunction(opt.setHeight)) {
                opt.setHeight($pop, arr)
            } else {
                if (arr.length < 2) {
                    $pop.css({top: 0, bottom: null})
                } else {
                    $pop.css({top: null, bottom: 0})
                }
            }
            $body.html(PT.get(tool.toStr(arr)));
            this._freshNum()._setPosition()
        }
        return this
    }, _freshNum: function () {
        var arr = CT.getAll(), $num, $open;
        if (!arr) {
            return
        }
        $open = $("#dev_compare_open");
        if (!arr.length) {
            $open.hide()
        } else {
            $("#dev_compare_nums").text(arr.length);
            $open.css("display", "block")
        }
        return this
    }, _event: function () {
        var _this = this;
        var $pop = $("#dev_compare_pop");
        $pop.unbind("click.compare").bind("click.compare", function (event) {
            var $this = $(event.target);
            if ($this.hasClass("dev_compare_delete")) {
                CT.kill($this.attr("prodId"));
                _this._refresh();
                return false
            } else {
                if ($this.hasClass("dev_compare_clearall")) {
                    CT.clear();
                    _this._refresh();
                    return false
                }
            }
        });
        $pop.find("#dev_compare_close").unbind("click.compare").bind("click.compare", function () {
            $pop.hide();
            return false
        });
        $("#dev_compare_open").unbind("click.compare").bind("click.compare", function () {
            _this._refresh()
        });
        $pop.find(".dev_compare_compare").unbind("click.compare").bind("click.compare", function () {
            var href = "/insproductlist.do?xcase=comparativeProductOfComm&prodIdS=";
            var param = "", $prodIdS = $("#dev_compare_body .dev_compare_delete");
            if ($prodIdS.length > 1 && $prodIdS.length <= 4) {
                $prodIdS.each(function () {
                    var pa = $(this).attr("prodId");
                    if (pa) {
                        param += pa + "-"
                    }
                });
                href += tool.trimEnd(param);
                $(this).attr("href", href)
            } else {
                alert("请选择2至4个产品进行比较");
                return false
            }
        });
        return this
    }, _setPosition: function () {
        return this
    }};
    opt.bind(CPT);
    if (opt.showAtOnce) {
        CPT._refresh()
    } else {
        CPT._freshEl();
        CPT._freshNum()
    }
    CPT._event()
};