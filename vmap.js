/*
*+--------------------------------------------------------------
* author:vczero
* date:2014/3/10-2014/4/10
* decription:vector map base on canvas & GIS
* function: 基础地图的绘制、基本地图事件控件、基本地图工具
*+--------------------------------------------------------------
*/

var Vmap = new Object(); //命名空间
/*
+----------------------------------------
* author: wanglihua
* date: 2014/3/12
* description: 屏幕坐标&经纬度互相转化
+----------------------------------------
*/
Vmap.Position = function(){}; //Position类
/*
+---------------------------------------
* 屏幕坐标转经纬度坐标
* width:画布的宽度
* height:画布的高度
* x:屏幕的X坐标
* y:屏幕的Y坐标
* maxLng:绘制区域最大的经度
* minLng:绘制区域最小的经度
* maxLat:绘制区域最大的纬度
* minLat:绘制区域最小的纬度
+---------------------------------------
*/
Position.convert2LngLat = function(width, height, x, y, maxLng, minLng, maxLat, minLat){
	var scaleX = ((maxLng - minLng)*3600) / height; 
	var scaleY = ((maxLat - minLat)*3600) / width; 
	var lng = x * scaleX/3600 + minLng;
	var lat = maxLat - y*scaleY/3600; 
	return {lng: lng, lat: lat};
}
/*
+----------------------------------------                
* 经纬度坐标转屏幕坐标
* width:画布的宽度
* height:画布的高度
* lng:经度
* lat:纬度
* maxLng:绘制区域最大的经度
* minLng:绘制区域最小的经度
* maxLat:绘制区域最大的纬度
* minLat:绘制区域最小的纬度
+-----------------------------------------
*/
Position.convert2XY = function(width, height, lng, lat, maxLng, minLng, maxLat, minLat){
	var scaleX = ((maxLng - minLng)*3600) / height; 
	var scaleY = ((maxLat - minLat)*3600) / width; 
	var x = (lng - minLng)*3600/scaleX;
	var y = (maxLat - lat)*3600/scaleY;
	return {x: x, y: y};
}

/*
+----------------------------------------
* author: wanglihua
* date: 2014/3/13
* description: 图层
+----------------------------------------
*/
Vmap.Layer = function(div){
	this.div = document.getElementById(div);
	this.width = parseInt(div.style.width.replace(/px/,'')); //图层的宽度
	this.height = parseInt(div.style.height.replace(/px/,'')); //图层的高度
	this.geometrys = [];
}

//添加矢量图形
Layer.prototype.addGeometrys = function(geometrys){
	for(var i = 0; i < geometrys.length; i++){
		drawGeometry(geometrys[i]);
	}
}

//绘制矢量图形
Layer.prototype.drawGeometry = function(geometry){

}