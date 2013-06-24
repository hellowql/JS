var TAG = function(header, tagList, footer) {
	this.header = header;
	if (tagList instanceof Array) {
		this.tagList = tagList;
	} else if (tagList) {
		this.tagList = [ tagList ];
	}
	this.footer = footer;
};
TAG.prototype.header = function(val) {
	if (val != undefined) {
		return this.header;
	}
	this.header = val;
};
TAG.prototype.tags = function(tagList) {
	if (tagList == undefined) {
		return this.tagList;
	}
	if (this.tagList) {
		this.tagList.concat(tagList);
	} else if (tagList) {
		if (tagList instanceof Array) {
			this.tagList = tagList;
		} else {
			this.tagList = [ tagList ];
		}
	}
};
TAG.prototype.footer = function(val) {
	if (val == undefined) {
		return this.footer;
	}
	this.footer = val;
};
var HTML = function(tagList, name) {
	this.tagList = tagList;
	this.name = name;
};
HTML.prototype.tags = function(tagList) {
	if (tagList == undefined) {
		return this.tagList;
	}
	if (this.tagList) {
		this.tagList.concat(tagList);
	} else {
		if (tagList instanceof Array) {
			this.tagList = tagList;
		} else {
			this.tagList = [ tagList ];
		}
	}
};
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
	var html = ''/* 返回值 */, n = 'name'/* html DOCTYPE */, h = 'header'/*
																		 * tag
																		 * begin
																		 */, f = 'footer'/*
						 * tag end
						 */, t = 'tagList'/*
						 * tag children tag
						 */, tabspace = '    '/* 对齐 */, bsp = '\n'/* 换行 */, nc/*
															 * DOCTYPE 值
															 */, hc/*
			 * tag begin value
			 */, fc/*
			 * tag end value
			 */, tc/*
			 * tag children value
			 */;
	if (space == undefined) {
		space = '';
	}
	if ((nc = tag[n])) {
		html += nc;
	}
	if ((hc = tag[h])) {
		html += hc;
	}
	if ((tc = tag[t])) {
		for ( var i = 0, j = tc.length; i < j; i++) {
			html += bsp + space + Tool.html(tc[i], space + tabspace);
		}
	}
	if ((fc = tag[f])) {
		html += bsp + space.substring(tabspace.length) + fc;
	}
	return html;
};
var FORMAT = function(txt) {
	this.txt = txt;
};
FORMAT.prototype.run = function() {
	return this.toLine().toArr().toHtml();
};
FORMAT.prototype.reg = {
	pre : {
		bsp : /\r\n/g,
		space : />\s+</g
	},
	deal : [ /^<[a-z:@]+(?:\s+[^>]+|\/)?>/, /^<\/[^>]+>/,
			/^<!--[^>]*-->|<%--[^>]*--%>/, /^[^<]*/ ]
};
FORMAT.prototype.toLine = function() {
	if (this.txt != undefined) {
		this.line = this.txt.replace(this.reg.pre.bsp, '').replace(
				this.reg.pre.space, '><');
	}
	return this;
};
FORMAT.prototype.toArr = function() {
	if (this.line != undefined) {
		this.arr = [];
		var txt;
		while (this.line.length) {
			for ( var i = 0, j = this.reg.deal.length; i < j; i++) {
				if ((txt = this.line.match(this.reg.deal[i]))) {
					this.line = this.line.replace(txt[0], '');
					this.arr.push(txt[0]);
					break;
				}
			}
		}
	}
	return this;
};
FORMAT.prototype.toHtml = function() {
	if (this.arr) {
		if (this.arr[0].search(/DOCTYPE/i) > -1) {
			this.html = new HTML('', this.arr.shift());
		}else{
			this.html = new HTML();
		}
	}
};
// for test start
/*
 * var tags = []; for (var i = 0; i < 5; i++) { tags.push(new TAG('<div>', new
 * TAG('哈哈哈'), '</div>')); if (i == 3) { tags.push(new TAG('<div>', [new TAG('<strong>',
 * new TAG('gaga'), '</strong>'), new TAG('<a href="xxx.html">', new TAG('<button>',
 * new TAG('SUBMIT'), '</button>'), '</a>')], '</div>')); } } var html = new
 * HTML(tags); Tool.debug(Tool.html(html, ''));
 */
// for test end
// var html = Tool.text();
// Tool.debug(html);
// new FORMAT(html).run();
// Tool
// .debug('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
// html = html.replace(/\r\n/g, '').replace(/>\s+</g, '><');
// Tool
// .debug('----------------------------------------------------------------------------------------------------');
// Tool.debug(html);
// Tool
// .debug('----------------------------------------------------------------------------------------------------');
// Tool.debug(html.replace(/\s+/, ' '));
Tool.debug(Tool.html(new FORMAT(Tool.text()).run()));