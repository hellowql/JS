var isConsoleDebug=true;
var TAG = function(header, tagList, footer) {
	this.header = header;
	if (tagList instanceof Array) {
		this.tagList = tagList;
	} else if (tagList) {
		this.tagList = [ tagList ];
	}
	this.footer = footer;
};
TAG.prototype.setHeader = function(val) {
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
TAG.prototype.setFooter = function(val) {
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
		if(isConsoleDebug){
			return '<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><div class="wp998"></div><div id="OSC_Userbar">当前访客身份：游客</div><div id="OSC_Channels"><ul class="cs_content"><li><a href="">支付宝专区</a></li><li><a href="">开源硬件专区</a></li></ul></div>';
		}
		return eclipse.editors.document.get();
	}
};
Tool.debug = function(txt) {
	if(isConsoleDebug){
		console.log(txt);
	}else{
		eclipse.console.println(txt);
	}
};
Tool.html = function(tag, space) {
	var html = ''/* 返回值 */, n = 'name'/* html DOCTYPE */, h = 'header'/*
																		 * tag
																		 * begin
																		 */, f = 'footer'/*
																							 * tag
																							 * end
																							 */, t = 'tagList'/*
																												 * tag
																												 * children
																												 * tag
																												 */, tabspace = '    '/* 对齐 */, bsp = '\n'/* 换行 */, nc/*
																																										 * DOCTYPE
																																										 * 值
																																										 */, hc/*
																											 * tag
																											 * begin
																											 * value
																											 */, fc/*
																								 * tag
																								 * end
																								 * value
																								 */, tc/*
																					 * tag
																					 * children
																					 * value
																					 */;
	if(!tag){
		return html;
	}
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
	bsp : /\r\n/g,
	space : />\s+</g,
	lineTag:/\/>$|^[^<>]+$/,
	closeTag:/<\/[^>]+>$/,
	deal : [ /<!DOCTYPE[^>]*>/i,/^<[a-z:@]+(?:\s+[^>]+|\/)?>/i, /^<\/[^>]+>/,
			/^<!--[^>]*-->|<%--[^>]*--%>/, /^[^<]*/ ]
};
FORMAT.prototype.toLine = function() {
	if (this.txt != undefined) {
		this.line = this.txt.replace(this.reg.bsp, '').replace(this.reg.space,
				'><');
	}
	return this;
};
FORMAT.prototype.toArr = function() {
	if (this.line != undefined) {
		this.arr = [];
		var txt;
		while (this.line.length) {
			for ( var i = 0, j = this.reg.deal.length; i < j; i++) {
				if ((txt = this.line.match(this.reg.deal[i]))&&txt[0]) {
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
	var tags=[];
	if (this.arr) {
		if (this.arr[0].search(this.reg.deal[0]) > -1) {
			this.html = new HTML('', this.arr.shift());
		} else {
			this.html = new HTML();
		}
		this.html.tags(this.toTags(null));
	}
};
FORMAT.prototype.isEndTag = function(tag) {
	var flag = {flag:false,type:''};
	if(this.reg.lineTag.test(tag)){
		flag.flag=true;
		flag.type='line';
	}else if(this.reg.closeTag.test(tag)){
		flag.flag=true;
		flag.type='mline';
	}
	return flag;
};
FORMAT.prototype.toTags=function(tag){
	var tags=[],tagStr,flag,ended=false;
	while(this.arr.length){
		tagStr=this.arr.shift();
		flag=this.isEndTag(tagStr)
		if(flag.flag){						
			if(tag){
				if(flag.type=='line'){
					tag.tags(new TAG(tagStr));
				}else if(flag.type=='mline'){
					tag.setFooter(tagStr);
					tags.push(tag);
					tag=null;
				}
			}else{
				tags.push(new TAG(tagStr));
			}
			if(ended){				
				break;
			}
			ended=true;
		}else{
			ended=false;
			if(tag){
				tag.tags(this.toTags(tag));
			}else{
				tag=new TAG(tagStr)
				tag.tags(this.toTags(tag));
				tags.push(tag);
				tag=null;
			}
		}
	}
	return tags;	
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