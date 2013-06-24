var Tool = function () {
};
Tool.text = function (txt) {
    if (txt != undefined) {
        eclipse.editors.document.set(txt);
    } else {
        return eclipse.editors.document.get();
    }
};
Tool.debug = function (txt) {
    console.log(txt);
};
var Attr = function (name, value, type) {
    this.name = name;
    this.value = value;
    this.type = type;
};
Attr.prototype.value = function (val) {
    if (val != undefined) {
        this.value = val;
    } else {
        return this.value;
    }
};
Attr.prototype.show = function () {
    return (this.name && this.value) ? (this.name + "=" + this.value) : '';
};
var Node = function (name, attrs, childs, type) {
    this.name = name;
    this.attrs = attrs;
    this.childs = childs;
    this.type = type;
};
Node.prototype.show = function () {
    var html = '';
    if (this.name) {
        html = '<' + this.name + '';
    }
    if (this.attrs) {
        for (var i = 0, j = this.attrs.length; i < j; i++) {
            html += ' ' + this.attrs[i].show();
        }
    }
    if (this.childs) {
        html += '>';
        for (var i = 0, j = this.childs.length; i < j; i++) {
            html += this.childs[i].show();
        }
    } else {
        html += '>';
    }
    if (this.name) {
        html += '</' + this.name + '>';
    }
    return html;
};
Node.prototype.setChilds = function (childs) {
    this.childs = childs;
};
Node.prototype.push = function (child) {
    if (this.childs) {
        this.childs.push(child);
    } else {
        this.childs = [child];
    }
};
var Page = function (name, nodes, type) {
    this.name = name;
    this.nodes = nodes;
    this.type = type;
};
Page.prototype.setNodes = function (nodes) {
    this.nodes = nodes;
};
Page.prototype.pushNode = function (node) {
    if (this.nodes) {
        this.nodes.push(node);
    } else {
        this.nodes = [node];
    }
};
Page.prototype.show = function () {
    var html = '';
    if (this.nodes) {
        for (var i = 0, j = this.nodes.length; i < j; i++) {
            html += this.nodes[i].show();
        }
    }
    return html;
};
// for test--start

var page = new Page('html');
var nodes = [];
for (var j = 0; j < 4; j++) {
    var attrs = [];
    for (var i = 0; i < 3; i++) {
        attrs.push(new Attr('id' + i, '"dev_' + i + '"'));
    }
    var node = new Node('div' + j, attrs, null, null);
    page.pushNode(node);
}
Tool.debug(page.show());
// for test--end
