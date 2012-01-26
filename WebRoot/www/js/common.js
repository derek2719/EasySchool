/**--------------------------------->
 * 命名方式：驼峰式命名
 * 闭包内私有变量或需要混淆变量,该变量即可是普通类型,也可引用类型
 *【var _name】
 * 闭包内私有函数或需要混淆函数
 *【
 * 	function __name(){
 * 		my code
 *  }
 * 】
 <----------------------------------*/
(function(window){
var document = window.document,
	navigator = window.navigator,
	location = window.location,
	$ = window.jQuery = window.$;
	
var _class2type = {};
_class2type["[object Boolean]"] = "boolean";
_class2type["[object Number]"] = "number";
_class2type["[object String]"] = "string";
_class2type["[object Function]"] = "function";
_class2type["[object Array]"] = "array";
_class2type["[object Date]"] = "date";
_class2type["[object RegExp]"] = "regexp";
_class2type["[object Object]"] = "object";
var _toString = Object.prototype.toString;

var _dragon = _dragon || {};
/*
 * JS辅助类
 */
_dragon._lang = _dragon._lang || {};
/*
 * 返回参数类型
 */
_dragon._type = _dragon._lang._type = function(obj) {
	return obj == null ? String(obj) : _class2type[_toString.call(obj)] || "object";
};
/*
 * 判断对象是否是布尔类型,true:是,false:否
 */
_dragon._isBoolean = _dragon._lang._isBoolean = function(obj) {
	return _dragon._type(obj) === "boolean";
};
/*
 * 判断对象是否是字符串类型,true:是,false:否
 */
_dragon._isString = _dragon._lang._isString = function(obj) {
	return _dragon._type(obj) === "string";
};
/*
 * 判断对象是否是function类型,true:是,false:否
 */
_dragon._isFunction = _dragon._lang._isFunction = function(obj) {
	return _dragon._type(obj) === "function";
};
/*
 * 判断对象是否是数组类型,true:是,false:否
 */
_dragon._isArray = _dragon._lang._isArray = function(obj) {
	return _dragon._type(obj) === "array";
};
/*
 * 判断对象是否是数值类型,true:是,false:否
 */
_dragon._isNumber = _dragon._lang._isNumber = function(obj) {
	return _dragon._type(obj) === "number";
};
/*
 * 判断对象是否是object类型,true:是,false:否
 */
_dragon._isObject = _dragon._lang._isObject = function(obj) {
	return _dragon._type(obj) === "object";
};
/*
 * 判断是否是不包含任何属性的空对象
 */
_dragon._isEmptyObject = _dragon._lang._isEmptyObject = function(obj) {
	for (var name in obj) {
		return false;
	}
	return true;
};
/*
 * JS对象类
 */
_dragon._object = _dragon._object || {};
/*
 * 对象级拷贝、继承
 * target会拥有source中的所有属性
 * target如果有和source中相同的属性,source中的属性值会重写target中的属性值.
 */
_dragon._extend = _dragon._object._extend = function(target, source) {
	for (var prop in source) target[prop] = source[prop];
};
$(document).bind("mobileinit", function(){
	console.log("===mobile Init!===");
	$.extend($.mobile , {
		//touchOverflowEnabled : false
	});
});
/*
 * 公共库
 */
function _Common() {
	var com = this;
	//page模块
	com._pageModules = {};
	//iscrollPlugin
	com._iscrollPlugin = null;
};
/*
 * 公共库方法集合
 */
_dragon._extend(_Common.prototype, {
	imageLoad : function(url, success, error) {
		var image = new Image();
		image.onload = function(){ 
	        if(image.complete==true){ 
	        	image.onload = null;
	        } 
	    }  
	},
	//销毁iscoll插件
	_destoryIscrollPlugin : function() {
		var com = this;
		if(com._iscrollPlugin) {
			com._iscrollPlugin.destroy();
			com._iscrollPlugin = null;
		}
	},
	//返回当前iscoll插件对象
	getIscrollPlugin : function() {
		var com = this;
		return com._iscrollPlugin;
	},
	//进入page模块
	_pageIn : function(id) {
		var pageId = "#"+id;
		$(pageId).live('pageshow',function(event, ui){
		　	var com = window.Com;
			com._destoryIscrollPlugin();
			var mod = com.getPageModuleById(id);
			var isEnableIscrollPlugin = mod.isEnableIscrollPlugin;
			var isHandlePageEvent = mod.isHandlePageEvent;
			var iscrollId = mod.iscrollId;
			if (isEnableIscrollPlugin) {
				com._iscrollPlugin = new iScroll(iscrollId);
			}
			if (isHandlePageEvent) {
				mod.pageInHandle(event, ui);
			}
		});
	},
	//离开page模块
	_pageOut : function(id) {
		var pageId = "#"+id;
		$(pageId).live('pagehide',function(event, ui){
		　	var com = window.Com;
			com._destoryIscrollPlugin();
			var mod = com.getPageModuleById(id);
			var isHandlePageEvent = mod.isHandlePageEvent;
			if (isHandlePageEvent) {
				mod.pageOutHandle(event, ui);
			}
		});
	},
	//初始化page事件
	_initializePageEvent : function(id) {
		var com = this;
		com._pageIn(id);
		com._pageOut(id);
	},
	//注入page模块
	_injectPageModule : function(id, mod) {
		var com = this;
		var mods = com._pageModules;
		mods[id] = mod;
		com._initializePageEvent(id);
	},
	//返回所有注入成功的page模块
	getPageModules : function() {
		var com = this;
		return com._pageModules;
	},
	//根据模块ID返回page模块对象
	getPageModuleById : function(id) {
		var com = this;
		return com._pageModules[id];
	},
	extend : _dragon._extend,
	/*
	 * 注册Page模块
	 */
	register : function(page) {
		var com = this;
		$(function() {
			console.log("===文档加载完毕!===");
			if (!_dragon._isObject(page)) return;
			var pageId = page.id;
			if (!_dragon._isString(pageId)) return;
			com._injectPageModule(pageId, page);
		});
	}
});
function __register(key, val) {
	window[key] = val;
};
__register("Com", new _Common());
})(window);