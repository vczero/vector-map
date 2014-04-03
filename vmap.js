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
		this.canvas.style.backgroundColor = '#F5F3EF';
	}
	this.maxLng = 116.495032; 
	this.minLng = 116.46203;   
	this.maxLat = 40.005856;
	this.minLat = 39.988136;
};

Map.prototype.showMap = function(map){
	map.getPosition(function(data){
		document.getElementById('show_lnglat').innerHTML = '当前经纬度为:' + data.lng + ',' + data.lat;
	});

//-------------------------------合成一个服务--------------------------------------
	// 作为一个服务绘制
   	var pointUrl='http://localhost:3000/wangjing/get';
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
	     			if(feature.properties.name == 'lvdi')
	     				map.drawPolygon(feature,'#C2E0B9','#C2E0B9');
	     			if(feature.properties.name == 'gonglu')
	     				map.drawPolygon(feature,'#FFC65C','#FFC65C');
	     		}

	     		if(feature.geometry.type == 'LineString'){
	     			if(feature.properties.name == 'ditie')
	     				map.drawLine(feature, '#F95A7A');
	     		}
	     		
	     		if(feature.geometry.type == 'Point'){
	     			map.drawPoint(feature);
	     		}

	     		if(feature.geometry.type == 'Point'){
	     			map.drawText(feature);
	     		}
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
	this.maxLng = maxLng || 116.495032;
	this.minLng = minLng || 116.46203;
	this.maxLat = maxLat || 40.005856;
	this.minLat = minLat || 39.988136;
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
Map.prototype.addPoint = function(point,style){
	var xy = Map.lngLat2XY(this.width, this.height, point.x, point.y, 
		this.maxLng, this.minLng, this.maxLat, this.minLat);
	var x = xy.x;
	var y = xy.y;
	this.context.fillStyle = style || "#E10602";
	this.context.beginPath();
	//改变缩放位置
	var cxy = this.changePosition(x, y, this.zoom);
	//画的是红点
	this.context.arc(cxy.x, cxy.y, point.size, 0, Math.PI*2, true);
	this.context.closePath();
	this.context.fill();
	var image = new Image();
	image.src = 'images/335.png';
	_context = this.context;
	image.onload = function(){
		_context.drawImage(image,cxy.x, cxy.y,15,15);
	}
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
Map.prototype.drawPoint = function(geo_point, style){
	var lnglat = geo_point.geometry.coordinates;
	var point = new this.Point(lnglat[0], lnglat[1]);
	this.addPoint(point, style);
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
Map.prototype.addLine = function(line, style){
	//根据点的个数绘制
	if(line.length > 0){
		var startPoint = line[0];
		var xy1 = Map.lngLat2XY(this.width, this.height, startPoint[0], startPoint[1], 
				  this.maxLng, this.minLng, this.maxLat, this.minLat);
		this.context.strokeStyle = style || "#006FC4";
		this.context.beginPath();
		this.context.lineWidth = 2.5;
		var fxy = this.changePosition(xy1.x, xy1.y, this.zoom);
		this.context.moveTo(fxy.x, fxy.y);
		for(var i = 1; i < line.length; i++){
			var mxy = Map.lngLat2XY(this.width, this.height, line[i][0], line[i][1], 
					  this.maxLng, this.minLng, this.maxLat, this.minLat);
			var nxy = this.changePosition(mxy.x, mxy.y, this.zoom);
			this.context.lineTo(nxy.x, nxy.y);
		}
		this.context.stroke();
	}
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
Map.prototype.drawLine = function(geo_line, style){
	var coordinates = geo_line.geometry.coordinates;
	this.addLine(coordinates, style);
}

/*
+----------------------------
+ 添加多边形(按多边形的结构)
+----------------------------
*/
Map.prototype.addPolygon = function(polygon, fillStyle, strokeStyle){
	this.context.fillStyle = fillStyle || '#EEB14A';
	this.context.strokeStyle = strokeStyle || '#D8B1D2';
	this.context.beginPath();
	// this.context.lineWidth = 0.5;
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
Map.prototype.drawPolygon = function(geo_polygon, fillStyle, strokeStyle){
	var coordinates = geo_polygon.geometry.coordinates;
	this.addPolygon(coordinates, fillStyle, strokeStyle);
}

/*
+----------------------------
+ 绘制文本
+----------------------------
*/
Map.prototype.addText = function(text, style){
	this.context.font='12px Arial';
	this.context.fillStyle= style ||'#151515';
	var xy = this.changePosition(text.x, text.y, this.zoom);
	this.context.fillText(text.text,xy.x,xy.y);
}
/*
+------------------------------------
+ 绘制文本(按Geo_JSON格式)
+------------------------------------
*/

Map.prototype.drawText = function(feature, style){
	var text = {};
    //转化坐标
    var coordinates = feature.geometry.coordinates;
	var xy = Map.lngLat2XY(this.width, this.height, coordinates[0], coordinates[1], 
				  this.maxLng, this.minLng, this.maxLat, this.minLat);
	text.text = feature.properties.name;
	text.x = xy.x;
	text.y = xy.y;
	this.addText(text, style);
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

/*
+------------------------------------
+ 要素渲染样式
+------------------------------------
*/
Map.prototype.getStyle = function(type){
	switch(type){
		case'lvdi':
			return {
				fillStyle: '#C2E0B9',
				strokeStyle: '#C2E0B9'
			};
			break;
		case 'shuiyu':
			return {
				fillStyle: '#ACC5E9',
				strokeStyle: '#ACC5E9'
			};
			break;
		case 'gandao': 
			return {
				fillStyle: '#FFC65C',
				strokeStyle: '#EEA62B'
			};
			break;
		case 'zhilu': 
			return {
				fillStyle: '#FFFDB5',
				strokeStyle: '#E8DDC2'
			};
			break;
		case 'ditie': 
		    return {
		    	stroke: '#16A9DC'
		    };
			break;
		case 'beijing': 
		    return {
		    	fillStyle: '#F5F3EF'
		    };
			break;
		case 'diming': 
		    return {
		    	fillStyle: '#568FE3',
		    	font_color: '#FAFAFA'
		    };
		    break;
		case 'xiaolu':
			return {
				fillStyle: '#FFFFFF',
				strokeStyle: '#EFEDE7'
			};
			break;
		case 'jianzhu':
			return {
				fillStyle: '#F8F7F3',
				strokeStyle: '#E6E5E2'
			};
			break;
		default:
			return {
				fillStyle: 'NULL',
				strokeStyle: 'NULL'
			};
			break;
	}
}






