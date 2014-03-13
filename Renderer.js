Vmap.Renderer = function(layer) {
	this.canvas = document.createElement("canvas"); //创建canvas标签
	layer.div.appendChild(this.canvas); //添加canvas标签
	this.context = this.canvas.getContext("2d"); //获取绘图环境
	this.setCanvas(layer); //设置画布大小
	this.height = layer.height;
	this.width = layer.width;
	this.maxLng = layer.maxLng;
	this.minLng = layer.minLng;
	this.maxLat = layer.maxLat;
	this.minLat = layer.minLat;
}

Vmap.Renderer.prototype.setCanvas = function(layer){
	this.canvas.width = layer.width;
	this.canvas.height = layer.height;
};

Vmap.Renderer.prototype.convert2XY = function(lng, lat){
	var scaleX = ((this.maxLng - this.minLng)*3600) / this.height; 
	var scaleY = ((this.maxLat - this.minLat)*3600) / this.width; 
	var y = (lng - this.minLng)*3600/scaleX;
	var x = (this.maxLat - lat)*3600/scaleY;
	return {x: x, y: y};
}

Vmap.Renderer.prototype.drawPoint = function(point, style){
	var _point = this.convert2XY(point.x, point.y);

};

Vmap.Renderer.prototype.drawLine = function(point1, point2, style){
	var _point1 = this.convert2XY(point1.x, point1.y);
	var _point2 = this.convert2XY(point2.x, point2.y);
	this.context.moveTo(_point1.x, _point1.y);
	this.context.lineTo(_point2.x, _point2.y);
	this.context.stroke();
};