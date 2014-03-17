window.onload = function() {

	
}

var width = 600;
var height = 400;
var maxLng = 135.5;
var minLng = 73;
var maxLat = 53;
var minLat = 3;
//--------------------------UI--------------------------------
//鼠标移动显示经纬度
var showLngLat = function(e){
	var canvas = document.getElementById("mymap");
	var bounds =  canvas.getBoundingClientRect();
	var x = 0,y = 0;
	var e = e || window.event;
	x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - bounds.left + 0.5;
	y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - bounds.top+ 1;
	var lnglat = xy2LngLat(600, 400, x, y, 135.5, 73, 53, 3);
	document.getElementById('show_lnglat').innerHTML = '当前经纬度为:' + lnglat.lng + ',' + lnglat.lat;
	//document.getElementById('show_lnglat').innerHTML = '当前经纬度为:' + x+ ',' + y; 屏幕坐标
}


//-------------------------lib-----------------------------------
//经纬度转屏幕坐标
var lngLat2XY = function(width, height, lng, lat, maxLng, minLng, maxLat, minLat){
	var scaleX = ((maxLng - minLng)*3600) / width; 
	var scaleY = ((maxLat - minLat)*3600) / height; 
	var y = (lng - minLng)*3600/scaleX;
	var x = (maxLat - lat)*3600/scaleY;
	return {x: x, y: y};
}

//屏幕坐标转经纬度坐标
var xy2LngLat = function(width, height, x, y, maxLng, minLng, maxLat, minLat){
 	var scaleX = ((maxLng - minLng)*3600) / width; 
 	var scaleY = ((maxLat - minLat)*3600) / height; 
 	var lng = x * scaleX/3600 + minLng;
 	var lat = maxLat - y*scaleY/3600; 
 	return {lng: lng, lat: lat};
}
//------------------------绘制点图层--------------------------------

/*{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}*/
var drawPoint = function(geoPoint){
	var lnglat = geoPoint.geometry.coordinates;
	var xy = lngLat2XY(600, 400, lnglat[0], lnglat[1], 135.5, 73, 53, 3);
	var x = xy.x;
	var y = xy.y;

}

var drawPointBatch = function(geoPoints){

}


