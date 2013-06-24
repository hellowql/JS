var Tool = function() {
};
Tool.text = function(txt) {
    if (txt != undefined) {
        eclipse.editors.document.set(txt);
    } else {
        return eclipse.editors.document.get();
    }
};
Tool.debug = function(txt) {
    eclipse.console.println(txt);
};
Tool.html = function(tag, space) {
    var html = ''/* 返回值 */, n = 'name'/* html DOCTYPE */, h = 'header'/* tag begin */, f = 'footer'/* tag end */, t = 'tagList'/* tag children tag */, tabspace = '    '/* 对齐 */, bsp = '\n'/* 换行 */, nc/* DOCTYPE 值 */, hc/* tag begin value */, fc/* tag end value */, tc/* tag children value */;
    if (space == undefined) {
        space = '';
    }
    if (( nc = tag[n])) {
        html += nc;
    }
    if (( hc = tag[h])) {
        html += hc;
    }
    if (( tc = tag[t])) {
        for (var i = 0, j = tc.length; i < j; i++) {
            html += bsp + space + Tool.html(tc[i], space + tabspace);
        }
    }
    if (( fc = tag[f])) {
        html += bsp + space.substring(tabspace.length) + fc;
    }
    return html;
};
var TAG = function(header, tagList, footer) {
    this.header = header;
    if ( tagList instanceof Array) {
        this.tagList = tagList;
    } else if (tagList) {
        this.tagList = [tagList];
    }
    this.footer = footer;
};
TAG.prototype.header = function(val) {
    if (val != undefined) {
        return this.header;
    }
    this.header = val;
};
TAG.prototype.tags = function(tags) {
    if (tags == undefined) {
        return this.tagList;
    }
    if (this.tagList) {
        this.tagList.concat(tags);
    } else {
        if ( tags instanceof Array) {
            this.tagList = tags;
        } else {
            this.tagList = [tags];
        }
    }
};
TAG.prototype.footer = function(val) {
    if (val == undefined) {
        return this.footer;
    }
    this.footer = val;
};
var HTML = function(tages, name) {
    this.tagList = tags;
    this.name = name;
};
var FORMAT=function(txt){
    this.txt=txt;
};
FORMAT.prototype.toLine=function(){
    if(this.txt!=undefined){
        this.line=this.txt.replace(/\r\n/g,'').replace(/>[\s\t\f]+</g,'><').replace(/\s+/g,' ');
    }
};
FORMAT.prototype.toHtml=function(){
    this.html=new HTML();
};
//for test start
/*
var tags = [];
for (var i = 0; i < 5; i++) {
    tags.push(new TAG('<div>', new TAG('哈哈哈'), '</div>'));
    if (i == 3) {
        tags.push(new TAG('<div>', [new TAG('<strong>', new TAG('gaga'), '</strong>'), new TAG('<a href="xxx.html">', new TAG('<button>', new TAG('SUBMIT'), '</button>'), '</a>')], '</div>'));
    }
}
var html = new HTML(tags);
Tool.debug(Tool.html(html, ''));
*/
//for test end

var html=Tool.text();
Tool.debug(html);
html=html.replace(/\r\n/g,'').replace(/>[\s\t\f]+</g,'><').replace(/\s+/g,' ');
Tool.debug('----------------------------------------------------------------------------------------------------');
Tool.debug(html);
Tool.debug('----------------------------------------------------------------------------------------------------');
Tool.debug(html.replace(/\s+/,' '));