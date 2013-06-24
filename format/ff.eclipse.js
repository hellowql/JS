/**
 * jQuery Plugin
 * requires jQuery 1.4 or later
 *
 * Released under the MIT license
 * http://jquery.org/license
 *
 * User: wuqinglong
 * mail: hellowql@126.com
 * Date: 13-6-24
 * Time: 下午1:24
 * Version: 0.1
 */
var Tool = function () {
};
Tool.prototype.text = function (txt) {
    if (txt != undefined) {
        eclipse.editors.document.set(txt);
    } else {
        return eclipse.editors.document.get();
    }
};
var Attr = function (name, value, type) {
    this.name = name;
    this.value = value;
    this.type = type;
};
Prop.prototype.value = function (val) {
    if (val != undefined) {
        this.value = val;
    } else {
        return this.value;
    }
};
var Node = function (name, attrs, childs, type) {
    this.name = name;
    this.attrs = attrs;
    this.childs = childs;
    this.type = type;
};
var Page = function (name, nodes) {
    this.name = name;
    this.nodes = nodes;
    this.type = type;
};


 