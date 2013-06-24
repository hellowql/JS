var html='<div class="dev_div">ggg<div>hhh</div></div><div>safsd<span id="dev_span">sdfdsfds</span><!--comment--><ol><li>1</li><li>2</li><li>3</li></ol></div>';
var reg=[
/<[a-z:@]+(?:\s+[^>]+|\/)?>/,
/<\/[^>]+>/,
/<!--[^>]*-->|<%--[^>]*--%>/,
/[^<]*/
];
var txt;
debugger;
while(html.length){
	for(var i=0,j=reg.length;i<j;i++){
		if((txt=html.match(reg[i]))&&html.indexOf(txt[0])==0){
			console.log(txt[0]);
			html=html.replace(txt[0],'');
			break;
		}
	}
}