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

	if(div){
		this.div = div;
		this.width = parseInt(div.style.width);
		this.height = parseInt(div.style.height);
		this.canvas = document.createElement("canvas"); //创建canvas标签
		this.div.appendChild(this.canvas); //添加canvas标签
		this.setCanvas(this.canvas); //设置canvas大小
		this.context = this.canvas.getContext("2d"); //获取绘图环境
		this.context.translate(this.width/2,this.height/2);//将中心放到画布中心
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

	//绘制省份
   	var pointUrl='http://127.0.0.1:3000/province';
   	$.ajax({
	     url:pointUrl,
	     data:'',
	     dataType:'jsonp',
	     processData: false, 
	     type:'get',
	     success:function callback(data){
	     	var features = data.features;
	     	for(var i = 0; i < features.length; i++){
	     		map.drawPolygon(features[i]);
	     	}
	     	
	     },
     	error:function(XMLHttpRequest, textStatus, errorThrown) {
       		console.log(XMLHttpRequest);
     }});

	//获取服务的数据
	//绘制全国2019个县的数据
	var pointUrl='http://127.0.0.1:3000/point';
   	$.ajax({
	     url:pointUrl,
	     data:'',
	     dataType:'jsonp',
	     processData: false, 
	     type:'get',
	     success:function callback(data){
	     	var geoinfo = data.geoinfo;
	     	for(var i = 0; i < geoinfo.length; i++){
	     		map.drawPoint(geoinfo[i]);
	     	}
	     },
     	error:function(XMLHttpRequest, textStatus, errorThrown) {
       		console.log(XMLHttpRequest);
     }});


   	//绘制全国边界数据
   	var pointUrl='http://127.0.0.1:3000/line';
   	$.ajax({
	     url:pointUrl,
	     data:'',
	     dataType:'jsonp',
	     processData: false, 
	     type:'get',
	     success:function callback(data){
	     	map.drawLine(data);
	     },
     	error:function(XMLHttpRequest, textStatus, errorThrown) {
       		console.log(XMLHttpRequest);
     }});

    //绘制海南
   	var pointUrl='http://127.0.0.1:3000/hainan';
   	$.ajax({
	     url:pointUrl,
	     data:'',
	     dataType:'jsonp',
	     processData: false, 
	     type:'get',
	     success:function callback(data){
	     	map.drawLine(data);
	     },
     	error:function(XMLHttpRequest, textStatus, errorThrown) {
       		console.log(XMLHttpRequest);
     }});

   	 //绘制台湾
   	var pointUrl='http://127.0.0.1:3000/taiwan';
   	$.ajax({
	     url:pointUrl,
	     data:'',
	     dataType:'jsonp',
	     processData: false, 
	     type:'get',
	     success:function callback(data){
	     	map.drawLine(data);
	     },
     	error:function(XMLHttpRequest, textStatus, errorThrown) {
       		console.log(XMLHttpRequest);
     }});
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
+ 经纬度转屏幕坐标(左上角为原点) 静态方法
+----------------------------
*/
// Map.lngLat2XY = function(width, height, lng, lat, maxLng, minLng, maxLat, minLat){
// 	var scaleX = ((maxLng - minLng)*3600) / width; 
// 	var scaleY = ((maxLat - minLat)*3600) / height; 
// 	var x = (lng - minLng)*3600/scaleX;
// 	var y = (maxLat - lat)*3600/scaleY;
// 	return {x: x, y: y};
// }

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
+----------------------------
+ 缩放
+----------------------------
*/
Map.prototype.zoomTo = function(zoom, map){
	//重绘之前清除矩形
	this.context.clearRect(-(this.width/2), -(this.height/2), this.width, this.height);
	this.context.scale(zoom, zoom); //控制缩放
	this.showMap(map); //绘制地图
	this.context.scale(1, 1);
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
	this.size = 2;
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
	this.context.fillStyle = "#E12D2D";
	this.context.beginPath();
	this.context.arc(x,y,point.size,0,Math.PI*2,true);
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
		this.context.beginPath();
		this.context.strokeStyle ="#3879D9";
		this.context.lineWidth = 0.5;
		this.context.moveTo(xy1.x, xy1.y);
		for(var i = 1; i < line.length; i++){
			var mxy = Map.lngLat2XY(this.width, this.height, line[i][0], line[i][1], 
					  this.maxLng, this.minLng, this.maxLat, this.minLat);
			this.context.lineTo(mxy.x, mxy.y);
		}
		this.context.closePath();
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
	this.context.beginPath();
	this.context.strokeStyle ="#C2DDB6";
	this.context.lineWidth = 1;
	if(polygon.length > 0){
		var xy1 = Map.lngLat2XY(this.width, this.height, polygon[0][0], polygon[0][1], 
				  this.maxLng, this.minLng, this.maxLat, this.minLat);
		this.context.moveTo(xy1.x, xy1.y);
	}
	for(var i = 1; i < polygon.length; i++){
		var mxy = Map.lngLat2XY(this.width, this.height, polygon[i][0], polygon[i][1], 
				  this.maxLng, this.minLng, this.maxLat, this.minLat);
		this.context.lineTo(mxy.x, mxy.y);
	}
	this.context.closePath();
	this.context.fill();
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

