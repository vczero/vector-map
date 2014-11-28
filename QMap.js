
(function(global){
	/*
	 + @class obj: 处理ajax请求
	 + @method: getJSON从服务器拉取数据
	 + @params： uri请求资源的路径;callback获取服务器数据的回调函数
	 */
	var ajax = {
		getJSON: function(uri, callback){
			var httpRequest = null;
			if(window.XMLHttpRequest){
				httpRequest = new XMLHttpRequest();	
			}
			if(window.ActiveXObject){
				httpRequest = new ActiveXObject('"Microsoft.XMLHTTP"');
			}
			httpRequest.onreadystatechange = function(){
				if(httpRequest.readyState === 4){
					if(httpRequest.status === 200){
						var str = httpRequest.responseText;
						if(JSON && JSON.parse){
							return callback(JSON.parse(str));
						}else{
							return callback( (new Function("return " + str))() );	
						}
					}
					return callback(null);
				}
				return callback(null);
			};
			httpRequest.open('GET', uri, true);
			httpRequest.send();
		}
	};
	/*
	 + @class obj: 构建矢量图形的类
	 + 
	 + 
	 */
	var vmap = {
		ajax: ajax,
		polygon: function(){
			
		}
	};

})(window);