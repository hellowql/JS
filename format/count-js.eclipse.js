/*	
	var jsFiles = eclipse.resources.filesMatching('.*\.js', eclipse.resources.workspace.root); 
	eclipse.window.alert('Number of .js files in workspace: ' + jsFiles.length);
*/
/*
	if (eclipse.editors.selection == null) eclipse.runtime.die('No text selected!');
	eclipse.editors.replaceSelection(eclipse.editors.selection.text.toUpperCase());
*/
	eclipse.console.print("hello world!");
/*
	eclipse.console.print("hello world!");
	eclipse.console.println("hello world!");
	eclipse.console.println("hello world!");
*/
/*
	eclipse.console.println(eclipse.editors.clipboard);
*/
/*
eclipse.console.println(eclipse.editors.document.getLength());
*/
/*
	eclipse.editors.document.set("hello world!");
*/
/*
eclipse.console.println(eclipse.editors.file.getName());
eclipse.console.println(eclipse.editors.file.getFullPath().toPortableString());
eclipse.console.println(eclipse.editors.file.getFullPath().toString());
eclipse.console.println(eclipse.editors.file.getFullPath().getDevice());
eclipse.console.println(eclipse.editors.file.getFullPath().getFileExtension());
eclipse.console.println(eclipse.editors.file.getFullPath().toOSString());
eclipse.console.println(eclipse.editors.file.getFullPath().toFile().getAbsolutePath());
*/
/*
eclipse.editors.insert("xxx");
*/
/*
var a=eclipse.editors.document.get();
a=a.replace(/\{(\n|[^}]*)\}/g,function(a){
	return a.replace(/\s|\n/g,'');
}).replace(/\{/g,'\n\t{');
eclipse.console.println(a);
eclipse.editors.document.set(a);
*/
/*	
	var jsFiles = eclipse.resources.filesMatching('.*\.js', eclipse.resources.workspace.root); 
	eclipse.window.alert('Number of .js files in workspace: ' + jsFiles.length);
*/
/*
	if (eclipse.editors.selection == null) eclipse.runtime.die('No text selected!');
	eclipse.editors.replaceSelection(eclipse.editors.selection.text.toUpperCase());
*/
/*
	eclipse.console.print("hello world!");
	eclipse.console.print("hello world!");
	eclipse.console.println("hello world!");
	eclipse.console.println("hello world!");
*/
/*
	eclipse.console.println(eclipse.editors.clipboard);
*/
/*
eclipse.console.println(eclipse.editors.document.getLength());
*/
/*
	eclipse.editors.document.set("hello world!");
*/
/*
eclipse.console.println(eclipse.editors.file.getName());
eclipse.console.println(eclipse.editors.file.getFullPath().toPortableString());
eclipse.console.println(eclipse.editors.file.getFullPath().toString());
eclipse.console.println(eclipse.editors.file.getFullPath().getDevice());
eclipse.console.println(eclipse.editors.file.getFullPath().getFileExtension());
eclipse.console.println(eclipse.editors.file.getFullPath().toOSString());
eclipse.console.println(eclipse.editors.file.getFullPath().toFile().getAbsolutePath());
*/
/*
eclipse.editors.insert("xxx");
*/
/*
var a=eclipse.editors.document.get();
a=a.replace(/\{(\n|[^}]*)\}/g,function(a){
	return a.replace(/\s|\n/g,'');
}).replace(/\{/g,'\n\t{');
eclipse.console.println(a);
//eclipse.editors.document.set(a);
*/
function get(){
	return eclipse.editors.document.get();
}
function deal(str){
	/*
	return str.replace(/\{(\n|[^}]*)\}/g,function(a){
		return a.replace(/\s|\n/g,'');
	}).replace(/\{/g,'\n\t{');
	*/
	//return str.replace(/\s+|\n/g,'').replace(/{/g,'\n\t{').replace(']','\n]');
	return str.replace(/\s+|\n/g,'').replace(/(?={)/g,'\n\t').replace(/(?=])/,'\n');
}
//eclipse.console.println(deal(get()));
eclipse.editors.document.set(deal(get()));
