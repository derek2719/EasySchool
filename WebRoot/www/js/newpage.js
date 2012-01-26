/**--------------------------------->
 * 命名方式：驼峰式命名
 * 闭包内私有变量或需要混淆变量,该变量即可是普通类型,也可引用类型,也可谓函数类型
 *【var _name】
 <----------------------------------*/
/*
 * 注意：写一个获取最新文章信息(5-10记录)的ajax服务
 * 返回数据为json类型：
 * {id:{id,文章ID
 * 	title,文章标题
 * 	content,文章内容
 * 	imageUrl,用户头像URL
 * }}
 * eg:{"id01":{id:"id01",title:"文章标题01",content:"文章内容01",imageUrl:"www.qq.com"},
 * 		"id02":{id:"id02",title:"文章标题02",content:"文章内容02",imageUrl:"www.qq.com"}}
 */
(function(window){
var document = window.document,
	navigator = window.navigator,
	location = window.location,
	$ = window.jQuery = window.$,
	com = window.Com;
var _newPageMod = function() {
	var mod = this;
	//id：该page页面元素ID
	mod.id = "newPage";
	/* iscrollId：在某元素上启用滚动条插件的元素ID
	 * 该变量仅在isEnableIscrollPlugin为true时有效
	 */
	mod.iscrollId = "newPage_wrapper";
	/* 是否监听并处理页面转场进入和离开的事件
	 * 如果为true，则pageInHandle函数和pageOutHandle函数即为进入和离开事件的处理器
	 * 如果为false，则会忽略对应的处理器
	 */
	mod.isHandlePageEvent = true;
	/*
	 * 是否在某元素上启用滚动条插件
	 */
	mod.isEnableIscrollPlugin = true;
	/*
	 * 点击加载更多按钮对象 
	 */
	mod.checkMoreObj = null;
	/*
	 * 记录列表对象
	 */
	mod.newListObj = null;
};
com.extend(_newPageMod.prototype, {
	pageInHandle : function(event, ui) {
		console.log('转场之后最新页面是显示状态: ');
		var mod = this;
		//mod._infoTileAjax();
		mod.checkMoreObj = $("#checkMore");
		mod.newListObj = $("#newList");
		mod.checkMoreObj.text("正在努力加载中...");
		window.setTimeout(mod.test, 5000);
	},
	pageOutHandle : function(event, ui) {
		console.log('转场之后最新页面是隐藏状态: ');
	},
	_infoTileAjax : function() {
		var mod = this;
		$.ajax({
			type:"POST",
			url:"",
			data:"",
			dataType:"jsonp",
			cache:false,
			success:mod._infoTileAjaxSuccess,
			error:mod._infoTileAjaxError
		});
	},
	_createInfo : function(data) {
		var imageUrl = data.imageUrl;
		var title = data.title;
		var content = data.content;
		var time = data.time;
		var html = [];
		html.push("<li data-theme='c' class='ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c'>");
		html.push("<div class='ui-btn-inner ui-li' aria-hidden='true'><div class='ui-btn-text'>");
		html.push("<a href='#infoPage' data-transition='slide' class='ui-link-inherit'>");
		html.push("<p class='ui-li-aside ui-li-desc'><strong>");
		html.push(data.time);
		html.push("</strong></p>");
		html.push("<img src='");
		html.push(imageUrl);
		html.push("' class='ui-li-thumb'/><h3 class='ui-li-heading'>");
		html.push(data.title);
		html.push("</h3><p class='ui-li-desc'>");
		html.push(data.content);
		html.push("</p></a>");
		html.push("</div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow'></span></div>");
		return html.join("");
	},
	_infoTileAjaxSuccess : function(data, textStatus) {
		var mod = this;
		var list = mod.newListObj;
		var data = data;
		for (var id in data) {
			var info = mod._createInfo(data[id]);
			list.append(info);
		}
		mod.checkMoreObj.text("点击加载更多");
	},
	_infoTileAjaxError : function(data, textStatus) {
	},
	_changeAjaxStauts : function() {
	
	},
	test : function() {
		var mod = com.getPageModuleById("newPage");;
		var data = {"id01":{
			"id":"id01",
			"title":"测试标题测试标题测试标题测试标题测试标题",
			"content":"测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容",
			"time":"12-01-22 9:18",
			"imageUrl":"images/album-bb.jpg"
		},"id02":{
			"id":"id02",
			"title":"测试标题测试标题测试标题测试标题测试标题",
			"content":"测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容",
			"time":"12-01-22 9:18",
			"imageUrl":"images/album-hc.jpg"
		},"id03":{
			"id":"id03",
			"title":"测试标题测试标题测试标题测试标题测试标题",
			"content":"测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容",
			"time":"12-01-22 9:18",
			"imageUrl":"images/album-p.jpg"
		},"id04":{
			"id":"id04",
			"title":"测试标题测试标题测试标题测试标题测试标题",
			"content":"测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容",
			"time":"12-01-22 9:18",
			"imageUrl":"images/album-bb.jpg"
		},"id05":{
			"id":"id05",
			"title":"测试标题测试标题测试标题测试标题测试标题",
			"content":"测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容",
			"time":"12-01-22 9:18",
			"imageUrl":"images/album-hc.jpg"
		},"id06":{
			"id":"id06",
			"title":"测试标题测试标题测试标题测试标题测试标题",
			"content":"测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容",
			"time":"12-01-22 9:18",
			"imageUrl":"images/album-p.jpg"
		},"id07":{
			"id":"id07",
			"title":"测试标题测试标题测试标题测试标题测试标题",
			"content":"测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容",
			"time":"12-01-22 9:18",
			"imageUrl":"images/album-bb.jpg"
		},"id08":{
			"id":"id08",
			"title":"测试标题测试标题测试标题测试标题测试标题",
			"content":"测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容",
			"time":"12-01-22 9:18",
			"imageUrl":"images/album-p.jpg"
		}};
		mod._infoTileAjaxSuccess(data, "");
	}
});
com.register(new _newPageMod());
})(window);

