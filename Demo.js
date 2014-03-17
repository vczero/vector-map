window.onload = function() {
	var map = new Map('map');
	map.getPosition(function(data){
		document.getElementById('show_lnglat').innerHTML = '当前经纬度为:' + data.lng + ',' + data.lat;
	});

	var point = {
	  "type": "Feature",
	  "geometry": {
	    "type": "Point",
	    "coordinates": [135.5, 53]
	  },
	  "properties": {
	    "name": "XXX"
	  }
	};

	map.drawPoint(point);
	
	var mpoint = {
	  "type": "Feature",
	  "geometry": {
	    "type": "MultiPoint",
	    "coordinates": [[125.5, 13],[110,34]]
	  },
	  "properties": {
	    "name": "XXX"
	  }
	};
	map.drawMultiPoint(mpoint);

	var line = {
	  "type": "Feature",
	  "geometry": {
	    "type": "MultiPoint",
	    "coordinates": [[135.5, 53],[110,34]]
	  },
	  "properties": {
	    "name": "XXX"
	  }
	};
	map.drawLine(line);
}

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
	}
	this.maxLng = 135.5; 
	this.minLng = 73;   
	this.maxLat = 53;
	this.minLat = 3;
};
/*
+----------------------------
+ 设置地图边界
+----------------------------
*/
Map.prototype.bounds = function(maxLng, minLng, maxLat, minLat){
	this.maxLng = maxLng || 135.5;
	this.minLng = minLng || 73;
	this.maxLat = maxLat || 53;
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
+ 经纬度转屏幕坐标 静态方法
+----------------------------
*/
Map.lngLat2XY = function(width, height, lng, lat, maxLng, minLng, maxLat, minLat){
	var scaleX = ((maxLng - minLng)*3600) / width; 
	var scaleY = ((maxLat - minLat)*3600) / height; 
	var x = (lng - minLng)*3600/scaleX;
	var y = (maxLat - lat)*3600/scaleY;
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
	this.size = 10;
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

	this.context.fillStyle = "#FF0000";
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
	var point1 = line.point1;
	var point2 = line.point2;
	var xy1 = Map.lngLat2XY(this.width, this.height, point1.x, point1.y, 
		this.maxLng, this.minLng, this.maxLat, this.minLat);
	var xy2 = Map.lngLat2XY(this.width, this.height, point2.x, point2.y, 
		this.maxLng, this.minLng, this.maxLat, this.minLat);
	this.context.beginPath();
	this.context.strokeStyle ="#FFC56B";
	this.context.lineWidth=3;
	this.context.moveTo(xy1.x,xy1.y);
	this.context.lineTo(xy2.x,xy2.y);
	this.context.stroke();
}
/*
+-----------------------------
+ 绘制多点(按GeoJSON格式)
	{
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
	var point1 = new this.Point(coordinates[0][0],coordinates[0][1]);
	var point2 = new this.Point(coordinates[1][0],coordinates[1][1]);
	var line = new this.Line(point1,point2);
	this.addLine(new this.Line(point1,point2));
}

 