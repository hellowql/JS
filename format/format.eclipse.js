var isConsoleDebug;
try {
	isConsoleDebug = window && window['console'];
} catch (e) {
	isConsoleDebug = false;
}
/**
 * 标签
 * 
 * @param {}
 *            header
 * @param {}
 *            tagList
 * @param {}
 *            footer
 * @returns {}
 */
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
/**
 * 填充子标签
 * 
 * @param {}
 *            tagList
 * @returns {}
 */
TAG.prototype.tags = function(tagList) {
	if (tagList == undefined) {
		return this.tagList;
	}
	if (!this.tagList) {
		this.tagList = [];
	}
	this.tagList = this.tagList.concat(tagList);
};
TAG.prototype.setFooter = function(val) {
	if (val == undefined) {
		return this.footer;
	}
	this.footer = val;
};
/**
 * HTML页面
 * 
 * @param {}
 *            tagList
 * @param {}
 *            name
 * @returns {}
 */
var HTML = function(tagList, name) {
	this.tagList = tagList;
	this.name = name;
};
HTML.prototype.tags = function(tagList) {
	if (tagList == undefined) {
		return this.tagList;
	}
	if (!this.tagList) {
		this.tagList = [];
	}
	this.tagList = this.tagList.concat(tagList);
};
/**
 * 工具类
 * 
 * @returns {}
 */
var Tool = function() {
};
/**
 * 获取或者回写文本
 * 
 * @param {}
 *            txt
 * @returns {}
 */
Tool.text = function(txt) {
	if (txt != undefined) {
		eclipse.editors.document.set(txt);
	} else {
		if (isConsoleDebug) {
			return '<div class="l-left-col"><div class="hotnews"><ul><li><strong><a href="http://news.baidu.com/z/ljjh/zhuanti.html"target="_blank"class="a3">斯诺登抵达莫斯科向厄瓜多尔申请避难</a></strong></li><li><strong><a href="http://native.cnr.cn/news/201306/t20130624_512875920.shtml"target="_blank"class="a3">中国登山者巴基斯坦遇袭身亡巴塔认领</a></strong></li><li><a href="http://news.china.com.cn/2013-06/24/content_29205717.htm"target="_blank">[被叫醒后遭枪杀]</a>&nbsp;<a href="http://news.china.com.cn/2013-06/24/content_29205698.htm"target="_blank">[唯一幸存中国人通过卫星电话向国内求助]</a></li></ul></div><ul class="ulist "><li class="bold-item"><a href="http://news.baidu.com/z/szsh/zhuanti.html"target="_blank">习近平与神十航天员通话询问3人身体状况</a></li><li><a href="http://news.china.com.cn/live/2013-06/24/content_20714601_4.htm"target="_blank">李克强上任百日：打破惯性未救银行钱荒</a></li><li><a href="http://world.huanqiu.com/regions/2013-06/4055463.html"target="_blank">南非总统府宣布曼德拉病情危急正尽力救治</a></li></ul></div><div class="l-right-col"><div class="toparea-aside-top"><div class="imgplayer clearfix"id="imgplayer"><div id="imgplayer-control"><a href="javascript:void(0);"id="imgplayer-prev"></a><a href="javascript:void(0);"id="imgplayer-next"></a></div><div class="imgview"id="imgView"><a href=""target="_blank"><img src="http://news.baidu.com/iphone/img/loading_3.gif"class="firstimg"alt=""></a></div></div></div></div>';
		} else {
			var name = "";
			try {
				name = eclipse.editors.file.getName();
			} catch (e) {
			}
			if (/eclipse\.js$/.test(name)) {
				return '<div class="l-left-col"><div class="hotnews"><ul><li><strong><a href="http://news.baidu.com/z/ljjh/zhuanti.html"target="_blank"class="a3">斯诺登抵达莫斯科向厄瓜多尔申请避难</a></strong></li><li><strong><a href="http://native.cnr.cn/news/201306/t20130624_512875920.shtml"target="_blank"class="a3">中国登山者巴基斯坦遇袭身亡巴塔认领</a></strong></li><li><a href="http://news.china.com.cn/2013-06/24/content_29205717.htm"target="_blank">[被叫醒后遭枪杀]</a>&nbsp;<a href="http://news.china.com.cn/2013-06/24/content_29205698.htm"target="_blank">[唯一幸存中国人通过卫星电话向国内求助]</a></li></ul></div><ul class="ulist "><li class="bold-item"><a href="http://news.baidu.com/z/szsh/zhuanti.html"target="_blank">习近平与神十航天员通话询问3人身体状况</a></li><li><a href="http://news.china.com.cn/live/2013-06/24/content_20714601_4.htm"target="_blank">李克强上任百日：打破惯性未救银行钱荒</a></li><li><a href="http://world.huanqiu.com/regions/2013-06/4055463.html"target="_blank">南非总统府宣布曼德拉病情危急正尽力救治</a></li></ul></div><div class="l-right-col"><div class="toparea-aside-top"><div class="imgplayer clearfix"id="imgplayer"><div id="imgplayer-control"><a href="javascript:void(0);"id="imgplayer-prev"></a><a href="javascript:void(0);"id="imgplayer-next"></a></div><div class="imgview"id="imgView"><a href=""target="_blank"><img src="http://news.baidu.com/iphone/img/loading_3.gif"class="firstimg"alt=""></a></div></div></div></div>';
			}
		}
		return eclipse.editors.document.get();
	}
};
/**
 * 调试输出文本
 * 
 * @param {}
 *            txt
 * @returns {}
 */
Tool.debug = function(txt) {
	if (isConsoleDebug) {
		console.log(txt);
	} else {
		eclipse.console.println(txt);
	}
};
/**
 * 格式化对象
 * 
 * @param {}
 *            txt
 * @returns {}
 */
var FORMAT = function(txt) {
	this.txt = txt;
};
/**
 * 主方法
 * 
 * @returns {}
 */
FORMAT.prototype.run = function() {
	return this.toLine().toArr().toHtml().toString();
};
/**
 * 相关正则
 */
FORMAT.prototype.reg = {
	bsp : /\r\n/g,
	space : />\s+</g,
	lineTag : /^<br\s*\/>|^<input|^<link|^<meta|^<!doctype|^<basefont|^<base|^<area|^<hr|^<wbr|^<param|^<img|^<isindex|^<?xml|^<embed|\/>$|^[^<>]+$/,
	closeTag : /<\/[^>]+>$/,
	deal : [ /<!DOCTYPE[^>]*>/i, /^<[a-z:@]+(?:\s+[^>]+|\/)?>/i, /^<\/[^>]+>/,
			/^<!--[^>]*-->|<%--[^>]*--%>/, /^[^<]*/ ]
};
/**
 * 多行转成一行
 * 
 * @returns {}
 */
FORMAT.prototype.toLine = function() {
	if (this.txt != undefined) {
		this.line = this.txt.replace(this.reg.bsp, '').replace(this.reg.space,
				'><');
	}
	return this;
};
/**
 * 一行字符串转成标签数组
 * 
 * @returns {}
 */
FORMAT.prototype.toArr = function() {
	if (this.line != undefined) {
		this.arr = [];
		var txt;
		while (this.line.length) {
			for ( var i = 0, j = this.reg.deal.length; i < j; i++) {
				if ((txt = this.line.match(this.reg.deal[i])) && txt[0]) {
					this.line = this.line.replace(txt[0], '');
					this.arr.push(txt[0]);
					break;
				}
			}
		}
	}
	return this;
};
/**
 * 标签数组转成HTML对象
 * 
 * @returns {}
 */
FORMAT.prototype.toHtml = function() {
	var tags = [];
	if (this.arr) {
		if (this.arr[0].search(this.reg.deal[0]) > -1) {
			this.html = new HTML('', this.arr.shift());
		} else {
			this.html = new HTML();
		}
		this._toTags(this.html);
	}
	return this;
};
/**
 * 是否是结束标签
 * 
 * @param {}
 *            tagStr
 * @returns {}
 */
FORMAT.prototype._endTag = function(tagStr) {
	var flag = {
		flag : false,
		type : ''
	};
	if (this.reg.lineTag.test(tagStr)) {
		flag.flag = true;
		flag.type = 'line';
	} else if (this.reg.closeTag.test(tagStr)) {
		flag.flag = true;
		flag.type = 'mline';
	}
	return flag;
};
/**
 * 转换成标签树结构
 * 
 * @param {}
 *            parent
 * @returns {}
 */
FORMAT.prototype._toTags = function(parent) {
	var tagStr, flag, ended = false;
	while (parent && this.arr.length) {
		tagStr = this.arr.shift();
		flag = this._endTag(tagStr)
		if (flag.flag) {
			if (flag.type == 'line') {
				parent.tags(new TAG(tagStr));
			} else if (flag.type == 'mline') {
				parent.setFooter(tagStr);
				return parent;
			}
		} else {
			var n = new TAG(tagStr);
			parent.tags(this._toTags(n));
		}
	}
	return parent;
};
/**
 * 格式化HTML对象
 * 
 * @param {}
 *            tag
 * @param {}
 *            space
 * @returns {}
 */
FORMAT.prototype.toString = function(tag, space) {
	var html = '', // 返回值
	n = 'name', // html DOCTYPE
	h = 'header', // tag begin
	f = 'footer', // tag end
	t = 'tagList', // tag children tag
	tabspace = '    ', // 对齐
	bsp = '\n', // 换行
	nc, // DOCTYPE 值
	hc, // tag begin value
	fc, // tag end value
	tc;// tag children value
	if (!tag) {
		tag = this.html;
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
			html += bsp + space + this.toString(tc[i], space + tabspace);
		}
	}
	if ((fc = tag[f])) {
		html += (tc ? bsp + space.substring(tabspace.length) : '') + fc;
	}
	return html;
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
Tool.debug(new FORMAT(Tool.text()).run());