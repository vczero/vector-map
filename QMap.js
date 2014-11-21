
/*
+ 全国地级市的多边形数据
+ 
+
+
*/

(function(global){

	var ajax = function(path, callback){
		var http = new XMLHttpRequest();
		http.open('GET', path, true);
		http.send(null);
		http.onreadystatechange = function(){
			if(http.readyState === 4){
				
			}else{

			}
		};
	}


})(window);