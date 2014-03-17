window.onload = function() {
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
	var map = new Map('map');
	map.drawPoint(point);
	map.getPosition(function(data){
		document.getElementById('show_lnglat').innerHTML = '当前经纬度为:' + data.lng + ',' + data.lat;
	});
}

//--------------------------map---------------------------------
//Map类
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

//设置地图边界
Map.prototype.bounds = function(maxLng, minLng, maxLat, minLat){
	this.maxLng = maxLng || 135.5;
	this.minLng = minLng || 73;
	this.maxLat = maxLat || 53;
	this.minLat = minLat || 3;
}

//设置canvas大小
Map.prototype.setCanvas = function(canvas){
	canvas.width = this.width;
	canvas.height = this.height;
}

//给canvas 添加事件
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

//经纬度转屏幕坐标
//静态方法
Map.lngLat2XY = function(width, height, lng, lat, maxLng, minLng, maxLat, minLat){
	var scaleX = ((maxLng - minLng)*3600) / width; 
	var scaleY = ((maxLat - minLat)*3600) / height; 
	var x = (lng - minLng)*3600/scaleX;
	var y = (maxLat - lat)*3600/scaleY;
	return {x: x, y: y};
}

//屏幕坐标转经纬度坐标
//静态方法
Map.xy2LngLat = function(width, height, x, y, maxLng, minLng, maxLat, minLat){
 	var scaleX = ((maxLng - minLng)*3600) / width; 
 	var scaleY = ((maxLat - minLat)*3600) / height; 
 	var lng = x * scaleX/3600 + minLng;
 	var lat = maxLat - y*scaleY/3600; 
 	return {lng: lng, lat: lat};
}
//------------------------绘制点图层--------------------------------
//点模型
Map.prototype.Point = function(x, y){
	this.x = x;
	this.y = y;
};
//添加点
Map.prototype.addPoint = function(point){
	var xy = Map.lngLat2XY(this.width, this.height, point.x, point.y, 
		this.maxLng, this.minLng, this.maxLat, this.minLat);
	var x = xy.x;
	var y = xy.y;
	this.context.fillStyle = "#FF0000";
	this.context.beginPath();
	this.context.arc(x,y,5,0,Math.PI*2,true);
	this.context.closePath();
	this.context.fill();
}
//geojson格式绘点
Map.prototype.drawPoint = function(geo_point){
	var lnglat = geo_point.geometry.coordinates;
	var point = new this.Point(lnglat[0], lnglat[1]);
	this.addPoint(point);
}



var drawPointBatch = function(multiPoint){
	var lnglats = multiPoint.geometry.coordinates;
	if(lnglats){
		for(var i = 0; i < lnglats.length; i++){
			this.drawPoint();
		}
	}
}


