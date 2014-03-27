//引用JQUERY
document.write("<script language=javascript src='jquery.js'></script>");
/*
+-------------------------------------------------------
+ Map类
+ 主类
+-------------------------------------------------------
*/
var Map = function(div) {
	var div = document.getElementById(div);
	this.width = 600;
	this.height = 400;
	this.zoom = 100; //缩放默认为100
	if(div){
		this.div = div;
		this.width = parseInt(div.style.width);
		this.height = parseInt(div.style.height);
		this.canvas = document.createElement("canvas"); //创建canvas标签
		this.div.appendChild(this.canvas); //添加canvas标签
		this.setCanvas(this.canvas); //设置canvas大小
		this.context = this.canvas.getContext("2d"); //获取绘图环境
		this.context.translate(this.width/2,this.height/2);//将中心放到画布中心
		this.canvas.style.backgroundColor = '#ACC5E9';
	}
	this.maxLng = 135.5; 
	this.minLng = 73;   
	this.maxLat = 55;
	this.minLat = 3;
};

Map.prototype.showMap = function(map){
	map.getPosition(function(data){
		document.getElementById('show_lnglat').innerHTML = '当前经纬度为:' + data.lng + ',' + data.lat;
	});

	//------------------------绘制每个省份的城市边界---------------------
	//四川
   	// var pointUrl='http://127.0.0.1:3000/sichuan/get';
   	// $.ajax({
	   //   url:pointUrl,
	   //   data:'',
	   //   dataType:'jsonp',
	   //   processData: false, 
	   //   type:'get',
	   //   success:function callback(data){
	   //   	var features = data.features;
	   //   	for(var i = 0; i <features.length; i++){
	   //   		var feature = features[i];
	   //   		if(feature.geometry.type == 'Polygon'){
	   //   			map.drawPolygon(feature);
	   //   		}
	   //   		if(feature.geometry.type == 'LineString'){
	   //   			map.drawLine(feature);
	   //   		}
	   //   		if(feature.geometry.type == 'Point'){
	   //   			map.drawPoint(feature);
	   //   		}
	   //   		if(feature.geometry.type == 'Point'){
	   //   			map.drawText(feature);
	   //   		}
	   //   	}
	   //   },
    //  	error:function(XMLHttpRequest, textStatus, errorThrown) {
    //    		console.log(XMLHttpRequest);
    //  }});
   	//------------------------绘制每个省份的城市边界---------------------
	//绘制省份
 //   	var pointUrl='http://127.0.0.1:3000/province';
 //   	$.ajax({
	//      url:pointUrl,
	//      data:'',
	//      dataType:'jsonp',
	//      processData: false, 
	//      type:'get',
	//      success:function callback(data){
	//      	var features = data.features;
	//      	for(var i = 0; i < features.length; i++){
	//      		map.drawPolygon(features[i]);
	//      	}
	//      },
 //     	error:function(XMLHttpRequest, textStatus, errorThrown) {
 //       		console.log(XMLHttpRequest);
 //     }});

	// //获取服务的数据
	// //绘制全国2019个县的数据
	// var pointUrl='http://127.0.0.1:3000/point';
 //   	$.ajax({
	//      url:pointUrl,
	//      data:'',
	//      dataType:'jsonp',
	//      processData: false, 
	//      type:'get',
	//      success:function callback(data){
	//      	var geoinfo = data.geoinfo;
	//      	for(var i = 0; i < geoinfo.length; i++){
	//      		map.drawPoint(geoinfo[i]);
	//      	}
	//      },
 //     	error:function(XMLHttpRequest, textStatus, errorThrown) {
 //       		console.log(XMLHttpRequest);
 //     }});


 //   	//绘制全国边界数据
 //   	var pointUrl='http://127.0.0.1:3000/line';
 //   	$.ajax({
	//      url:pointUrl,
	//      data:'',
	//      dataType:'jsonp',
	//      processData: false, 
	//      type:'get',
	//      success:function callback(data){
	//      	map.drawLine(data);
	//      },
 //     	error:function(XMLHttpRequest, textStatus, errorThrown) {
 //       		console.log(XMLHttpRequest);
 //     }});

 //    //绘制海南
 //   	var pointUrl='http://127.0.0.1:3000/hainan';
 //   	$.ajax({
	//      url:pointUrl,
	//      data:'',
	//      dataType:'jsonp',
	//      processData: false, 
	//      type:'get',
	//      success:function callback(data){
	//      	map.drawLine(data);
	//      },
 //     	error:function(XMLHttpRequest, textStatus, errorThrown) {
 //       		console.log(XMLHttpRequest);
 //     }});

 //   	 //绘制台湾
 //   	var pointUrl='http://127.0.0.1:3000/taiwan';
 //   	$.ajax({
	//      url:pointUrl,
	//      data:'',
	//      dataType:'jsonp',
	//      processData: false, 
	//      type:'get',
	//      success:function callback(data){
	//      	map.drawLine(data);
	//      },
 //     	error:function(XMLHttpRequest, textStatus, errorThrown) {
 //       		console.log(XMLHttpRequest);
 //     }});


 //   	var pointUrl='http://127.0.0.1:3000/point';
 //   	$.ajax({
	//      url:pointUrl,
	//      data:'',
	//      dataType:'jsonp',
	//      processData: false, 
	//      type:'get',
	//      success:function callback(data){
	//      	var geoinfo = data.geoinfo;
	//      	for(var i = 0; i < geoinfo.length; i++){
	//      		map.drawText(geoinfo[i]);
	//      	}
	//      },
 //     	error:function(XMLHttpRequest, textStatus, errorThrown) {
 //       		console.log(XMLHttpRequest);
 //     }});
	

//-------------------------------合成一个服务-------------------------------------------
	// 作为一个服务绘制
   	var pointUrl='http://127.0.0.1:3000/quanguodata/get';
   	$.ajax({
	     url:pointUrl,
	     data:'',
	     dataType:'jsonp',
	     processData: false, 
	     type:'get',
	     success:function callback(data){
	     	var features = data.features;
	     	for(var i = 0; i <features.length; i++){
	     		var feature = features[i];
	     		if(feature.geometry.type == 'Polygon'){
	     			map.drawPolygon(feature);
	     		}
	     		if(feature.geometry.type == 'LineString'){
	     			map.drawLine(feature);
	     		}
	     		//县级行政中心暂时不画
	     		if(feature.geometry.type == 'Point'){
	     			map.drawPoint(feature);
	     		}
	     		// if(feature.geometry.type == 'Point'){
	     		// 	map.drawText(feature);
	     		// }
	     	}
	     },
     	error:function(XMLHttpRequest, textStatus, errorThrown) {
       		console.log(XMLHttpRequest);
     }});
//---------------------------------------------------------------------------------------
   

   	map.zoomToEvent();
}
/*
+----------------------------
+ 设置地图边界
+----------------------------
*/
Map.prototype.bounds = function(maxLng, minLng, maxLat, minLat){
	this.maxLng = maxLng || 135.5;
	this.minLng = minLng || 73;
	this.maxLat = maxLat || 55;
	this.minLat = minLat || 3;
}
/*
+----------------------------
+ 设置canvas大小
+----------------------------
*/
Map.prototype.setCanvas = function(canvas){
	canvas.width = this.width;
	canvas.height = this.height;
}
/*
+----------------------------
+ 获取鼠标的位置(经纬度)
+----------------------------
*/
Map.prototype.getPosition = function(callback){
	var bounds = this.canvas.getBoundingClientRect();
	var width = this.width;
	var height = this.height;
	var maxLng = this.maxLng; 
	var minLng = this.minLng;   
	var maxLat = this.maxLat;
	var minLat = this.minLat;
	this.canvas.addEventListener('mousemove',getLngLat,false);
	//触发事件回调
	function getLngLat(e){
		var x = 0,y = 0;
		var e = e || window.event;
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - bounds.left + 0.5;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - bounds.top+ 1;
		var lnglat = Map.xy2LngLat(width, height, x, y, maxLng, minLng, maxLat, minLat);
		callback(lnglat);
	}
}

/*
+----------------------------
+ 经纬度转屏幕坐标(中心为原点) 静态方法
+----------------------------
*/
Map.lngLat2XY = function(width, height, lng, lat, maxLng, minLng, maxLat, minLat){
	var scaleX = ((maxLng - minLng)*3600) / width; 
	var scaleY = ((maxLat - minLat)*3600) / height; 
	var midLng = (maxLng + minLng) / 2;//中央经线 x轴中线
	var midLat = (maxLat + minLat) / 2;//中央纬线 y轴中线

	var x = (lng - midLng)*3600/scaleX;
	var y = (midLat - lat)*3600/scaleY;
	return {x: x, y: y};
}
/*
+----------------------------
+ 屏幕坐标转经纬度坐标 静态方法
+----------------------------
*/
Map.xy2LngLat = function(width, height, x, y, maxLng, minLng, maxLat, minLat){
 	var scaleX = ((maxLng - minLng)*3600) / width; 
 	var scaleY = ((maxLat - minLat)*3600) / height; 
 	var lng = x * scaleX/3600 + minLng;
 	var lat = maxLat - y*scaleY/3600; 
 	return {lng: lng, lat: lat};
}
/*
+-------------------------------------------------------
+ 点模型(x,y)
+ 分为两种情况绘制:Point结构和GeoJSON格式
+-------------------------------------------------------
*/
Map.prototype.Point = function(x, y){
	this.x = x;
	this.y = y;
	this.size = 1;
};
/*
+----------------------------
+ 添加点(按点的结构)
+----------------------------
*/
Map.prototype.addPoint = function(point){
	var xy = Map.lngLat2XY(this.width, this.height, point.x, point.y, 
		this.maxLng, this.minLng, this.maxLat, this.minLat);
	var x = xy.x;
	var y = xy.y;
	this.context.fillStyle = "#E10602";
	this.context.beginPath();
	//改变缩放位置
	var cxy = this.changePosition(x, y, this.zoom);
	this.context.arc(cxy.x, cxy.y, point.size, 0, Math.PI*2, true);
	this.context.closePath();
	this.context.fill();
}
/*
+-----------------------------
+ 绘制点(按GeoJSON格式)
	{
	  "type": "Feature",
	  "geometry": {
	    "type": "Point",
	    "coordinates": [135.5, 53]
	  },
	  "properties": {
	    "name": "XXX"
	  }
	}
+-----------------------------
*/
Map.prototype.drawPoint = function(geo_point){
	var lnglat = geo_point.geometry.coordinates;
	var point = new this.Point(lnglat[0], lnglat[1]);
	this.addPoint(point);
}
/*
+-------------------------------------------------------
+ 多点模型([[110,32],[118,40]])
+ 分为两种情况绘制:MultiPoint结构和GeoJSON格式
+-------------------------------------------------------
*/
Map.prototype.MultiPoint = function(pointArr){
	this.pointArr = pointArr;
}
/*
+----------------------------
+ 添加多点(按多点的结构)
+----------------------------
*/
Map.prototype.addMultiPoint = function(pointArr){
	for(var i = 0; i < pointArr.length; i++){
		var point = new this.Point(pointArr[i][0], pointArr[i][1]);
		this.addPoint(point);
	}
}
/*
+-----------------------------
+ 绘制多点(按GeoJSON格式)
	{
	  "type": "Feature",
	  "geometry": {
	    "type": "MultiPoint",
	    "coordinates": [[135.5, 53],[110,34]]
	  },
	  "properties": {
	    "name": "XXX"
	  }
	}
+-----------------------------
*/
Map.prototype.drawMultiPoint = function(geo_multiPoint){
	var pointArr = geo_multiPoint.geometry.coordinates;
	this.addMultiPoint(pointArr);
}
/*
+-------------------------------------------------------
+ 线模型(x,y)
+ 分为两种情况绘制:Line结构和GeoJSON格式
+-------------------------------------------------------
*/
Map.prototype.Line = function(point1, point2){
	this.point1 = point1;
	this.point2 = point2;
}
/*
+----------------------------
+ 添加线(按线的结构)
+----------------------------
*/
Map.prototype.addLine = function(line){
	//根据点的个数绘制
	if(line.length > 0){
		var startPoint = line[0];
		var xy1 = Map.lngLat2XY(this.width, this.height, startPoint[0], startPoint[1], 
				  this.maxLng, this.minLng, this.maxLat, this.minLat);
		this.context.strokeStyle ="#006FC4";
		this.context.beginPath();
		this.context.lineWidth = 1.3;
		var fxy = this.changePosition(xy1.x, xy1.y, this.zoom);
		this.context.moveTo(fxy.x, fxy.y);
		for(var i = 1; i < line.length; i++){
			var mxy = Map.lngLat2XY(this.width, this.height, line[i][0], line[i][1], 
					  this.maxLng, this.minLng, this.maxLat, this.minLat);
			var nxy = this.changePosition(mxy.x, mxy.y, this.zoom);
			this.context.lineTo(nxy.x, nxy.y);
		}
		//this.context.closePath();
		this.context.stroke();
	}
	// this.context.lineTo(xy2.x,xy2.y);
}
/*
+-----------------------------

+ 绘制多点(按GeoJSON格式	{
		"type": "Feature",
		"geometry": {
		    "type": "LineString",
		    "coordinates": [[135.5, 53],[110,34]]
		},
		  "properties": {
		    "name": "XXX"
		}
	}
+-----------------------------
*/
Map.prototype.drawLine = function(geo_line){
	var coordinates = geo_line.geometry.coordinates;
	this.addLine(coordinates);
}

/*
+----------------------------
+ 添加多边形(按多边形的结构)
+----------------------------
*/
Map.prototype.addPolygon = function(polygon){
	this.context.fillStyle = '#F5F3EF';
	this.context.strokeStyle = '#D8B1D2';
	this.context.beginPath();
	this.context.lineWidth = 0.5;
	if(polygon.length > 0){
		var xy1 = Map.lngLat2XY(this.width, this.height, polygon[0][0], polygon[0][1], 
				  this.maxLng, this.minLng, this.maxLat, this.minLat);
		var fxy = this.changePosition(xy1.x, xy1.y, this.zoom);
		this.context.moveTo(fxy.x, fxy.y);
	}
	for(var i = 1; i < polygon.length; i++){
		var mxy = Map.lngLat2XY(this.width, this.height, polygon[i][0], polygon[i][1], 
				  this.maxLng, this.minLng, this.maxLat, this.minLat);
		var nxy = this.changePosition(mxy.x, mxy.y, this.zoom);
		this.context.lineTo(nxy.x, nxy.y);
	}
	this.context.closePath();
	this.context.fill();//填充省份多边形
	this.context.stroke();//将边界线绘制出来
}

/*
+------------------------------------
+ 绘制多边形(按Geo_JSON格式)
	{ "type": "Polygon",
	    "coordinates": [
	    	[ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ],
	    	[ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
	    ]
    }
+------------------------------------
*/
Map.prototype.drawPolygon = function(geo_polygon){
	var coordinates = geo_polygon.geometry.coordinates;
	this.addPolygon(coordinates[0]);
}

/*
+----------------------------
+ 绘制文本
+----------------------------
*/
Map.prototype.addText = function(text){
	this.context.font='2px';
	this.context.fillStyle='#75746F';
	var xy = this.changePosition(text.x, text.y, this.zoom);
	this.context.fillText(text.text,xy.x,xy.y);
}
/*
+------------------------------------
+ 绘制文本(按Geo_JSON格式)
+------------------------------------
*/

Map.prototype.drawText = function(feature){
	var text = {};
    //转化坐标
    var coordinates = feature.geometry.coordinates;
	var xy = Map.lngLat2XY(this.width, this.height, coordinates[0], coordinates[1], 
				  this.maxLng, this.minLng, this.maxLat, this.minLat);
	text.text = feature.properties.name;
	text.x = xy.x;
	text.y = xy.y;
	this.addText(text);
}
/*
+------------------------------------
+ 改变地图要素的位置(基于屏幕坐标)
+------------------------------------
*/
Map.prototype.changePosition = function(x, y, zoom){
	return {
		x: x * (zoom / 100),
		y: y * (zoom / 100)
	};
}
/*
+------------------------------------
+ 基于要素的缩放
+------------------------------------
*/
Map.prototype.zoomTo = function(zoom){
	//重绘之前清除视野
	this.context.clearRect(-(this.width/2), -(this.height/2), this.width, this.height);
	this.zoom = zoom;
	this.showMap(map); //绘制地图
}
/*
+------------------------------------
+ 左移
+------------------------------------
*/
Map.prototype.moveToLeft = function(x, y, offsetLeft){
	return {
		x: x - offsetLeft,
		y: y
	}
}
/*
+------------------------------------
+ 右移
+------------------------------------
*/
Map.prototype.moveToRight = function(x, y, offsetRight){
	return {
		x: x + offsetRight,
		y: y
	}
}
/*
+------------------------------------
+ 平移(根据鼠标的按下事件移动)
+------------------------------------
*/
Map.prototype.panTo = function(e){
	//(1)获取鼠标按下的起点
	//(2)获取鼠标弹起的终点
	//(3)计算两个点间的偏移
	var startPoint = {};
	var endPoint = {};
	this.canvas.addEventListener('mousedown', function(e){
		var e = e || window.event;
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - bounds.left + 0.5;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - bounds.top+ 1;

	}, false);

	this.canvas.addEventListener('mouseup', function(e){
		var e = e || window.event;
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - bounds.left + 0.5;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - bounds.top+ 1;

	}, false);
}


/*
+------------------------------------
+ 基于鼠标滚轮、双击缩放
+------------------------------------
*/
Map.prototype.zoomToEvent = function(){
	var _this = this; //接收当前的this对象
	var currentZoom = this.zoom;
	var scorll = 0;
	//滚轮 
	this.canvas.addEventListener('mousewheel', getScorll, false);
	// 捕获鼠标动作
	function getScorll(e){
		scorll += e.wheelDelta;
		//除以120，计算缩放级数
		//每次缩放0.1
		var zoom = currentZoom + (scorll / 120) * 100 * 0.1;
		if(zoom < 0){
			zoom = 0;
		}
		_this.zoomTo(zoom); 
	}

	//双击
	this.canvas.addEventListener('dblclick', function(){
		scorll += 10;
		//除以120，计算缩放级数
		//每次缩放0.1
		var zoom = currentZoom + scorll;
		_this.zoomTo(zoom); 
	}, false);
}






